import { spawn } from "node:child_process";
import crypto from "node:crypto";
import { type Command, Option } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import {
  findTemplateForSystem,
  encryptCliApiKey,
  buildClientCredentialsExchangeRequest,
  getOAuthTokenExchangeConfig,
  parseJsonRecord,
  resolveOAuthConfigFromAuthentication,
} from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, success, spinner, colors as c } from "../../output.js";
import { getMySystemCredentials, setMySystemCredentials } from "./user-credentials-api.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function openBrowser(url: string): void {
  const platform = process.platform;
  const cmd = platform === "darwin" ? "open" : platform === "win32" ? "cmd" : "xdg-open";
  const args = platform === "win32" ? ["/c", "start", "", url] : [url];
  spawn(cmd, args, { detached: true, stdio: "ignore" }).unref();
}

async function pollForTokens(
  config: CLIConfig,
  client: SuperglueClient,
  systemId: string,
  options: { environment?: "dev" | "prod"; userOwned?: boolean },
  originalToken: string | undefined,
  timeoutMs: number = 300_000,
  intervalMs: number = 2000,
): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, intervalMs));
    try {
      const currentToken = options.userOwned
        ? (await getMySystemCredentials(config, systemId, options)).credentials?.access_token
        : (await client.getSystem(systemId, options)).credentials?.access_token;
      if (currentToken && currentToken !== originalToken) {
        return true;
      }
    } catch {}
  }
  return false;
}

function parseEnvironment(opts: { env?: string }): { environment?: "dev" | "prod" } {
  return opts.env === "dev" || opts.env === "prod" ? { environment: opts.env } : {};
}

function stringValue(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  const str = String(value).trim();
  return str ? str : undefined;
}

function normalizeTokenConfig(system: any) {
  const credentials = system.credentials || {};
  const base = getOAuthTokenExchangeConfig(system);
  const legacyHeaders = parseJsonRecord(credentials.extraHeaders);
  const legacyBodyParams = parseJsonRecord(credentials.extraBodyParams);
  return {
    tokenAuthMethod:
      credentials.tokenAuthMethod === "body" || credentials.tokenAuthMethod === "basic_auth"
        ? credentials.tokenAuthMethod
        : base.tokenAuthMethod,
    tokenContentType:
      credentials.tokenContentType === "form" || credentials.tokenContentType === "json"
        ? credentials.tokenContentType
        : base.tokenContentType,
    extraHeaders: legacyHeaders ?? base.extraHeaders,
    extraBodyParams: legacyBodyParams ?? base.extraBodyParams,
  };
}

function resolveCliOAuthConfig(system: any, opts: any) {
  const templateMatch = findTemplateForSystem(system);
  const templateOAuth = templateMatch?.template?.oauth;
  const authConfig = resolveOAuthConfigFromAuthentication({
    authentication: system.authentication,
    templateOAuth,
  });
  const credentials = system.credentials || {};

  return {
    templateMatch,
    clientId: stringValue(credentials.client_id) ?? stringValue(authConfig.client_id),
    clientSecret: stringValue(credentials.client_secret) ?? stringValue(authConfig.client_secret),
    authUrl:
      stringValue(opts.authUrl) ??
      stringValue(credentials.auth_url) ??
      stringValue(authConfig.auth_url),
    tokenUrl:
      stringValue(opts.tokenUrl) ??
      stringValue(credentials.token_url) ??
      stringValue(authConfig.token_url),
    grantType:
      stringValue(opts.grantType) ??
      stringValue(credentials.grant_type) ??
      stringValue(authConfig.grant_type) ??
      "authorization_code",
    scopes:
      stringValue(opts.scopes) ?? stringValue(credentials.scopes) ?? stringValue(authConfig.scopes),
    tokenConfig: normalizeTokenConfig(system),
  };
}

async function resolveClientSecret(params: {
  client: SuperglueClient;
  clientId?: string;
  clientSecret?: string;
  templateMatch?: ReturnType<typeof findTemplateForSystem>;
}): Promise<{ clientSecret?: string; source?: "system" | "template" }> {
  if (params.clientSecret) return { clientSecret: params.clientSecret, source: "system" };
  if (!params.templateMatch || !params.clientId) return {};

  const templateCreds = await params.client
    .getTemplateOAuthCredentials(params.templateMatch.key)
    .catch(() => null);
  if (!templateCreds || templateCreds.client_id !== params.clientId) return {};
  return { clientSecret: templateCreds.client_secret, source: "template" };
}

function normalizeOAuthTokens(tokens: Record<string, any>): Record<string, unknown> {
  return {
    access_token: tokens.access_token,
    ...(tokens.refresh_token ? { refresh_token: tokens.refresh_token } : {}),
    token_type: tokens.token_type || "Bearer",
    ...(tokens.expires_at ? { expires_at: tokens.expires_at } : {}),
    ...(tokens.expires_in
      ? { expires_at: new Date(Date.now() + Number(tokens.expires_in) * 1000).toISOString() }
      : {}),
    ...(tokens.expires_in ? { expires_in: tokens.expires_in } : {}),
  };
}

async function saveOAuthTokens(params: {
  config: CLIConfig;
  client: SuperglueClient;
  system: any;
  systemId: string;
  envOption: { environment?: "dev" | "prod" };
  tokens: Record<string, unknown>;
}) {
  if (params.system.credentialOwnership === "user") {
    const existing = await getMySystemCredentials(params.config, params.systemId, params.envOption);
    await setMySystemCredentials(
      params.config,
      params.systemId,
      { ...(existing.credentials || {}), ...params.tokens },
      params.envOption,
    );
    return;
  }

  await params.client.updateSystem(
    params.systemId,
    {
      credentials: {
        ...(params.system.credentials || {}),
        ...params.tokens,
      },
    },
    params.envOption,
  );
}

export function registerOAuthCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("oauth")
    .description("Authenticate a system via OAuth")
    .requiredOption("--system-id <id>", "System ID")
    .option("--scopes <scopes>", "Space-separated OAuth scopes")
    .option("--auth-url <url>", "OAuth authorization URL")
    .option("--token-url <url>", "OAuth token URL")
    .option("--grant-type <type>", "Grant type")
    .addOption(
      new Option("--env <environment>", "Environment: dev or prod").choices(["dev", "prod"]),
    )
    .action(async (opts) => {
      const { config, client } = getContext();
      const envOption = parseEnvironment(opts);

      let system: any;
      try {
        system = await client.getSystem(opts.systemId, envOption);
        if (!system) {
          error(`System not found: ${opts.systemId}`);
          process.exit(1);
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }

      const {
        templateMatch,
        clientId,
        clientSecret,
        authUrl,
        tokenUrl,
        grantType,
        scopes,
        tokenConfig,
      } = resolveCliOAuthConfig(system, opts);

      if (!clientId) {
        error(
          `Missing OAuth clientId. Add it to system authentication:\n\n  sg system edit --id ${opts.systemId} --authentication '{"type":"oauth2","clientId":"YOUR_CLIENT_ID","clientSecret":"YOUR_CLIENT_SECRET"}'`,
        );
        process.exit(1);
      }
      if (!tokenUrl) {
        error(
          `Missing tokenUrl. Provide --token-url or add it to authentication:\n\n  sg system edit --id ${opts.systemId} --authentication '{"type":"oauth2","tokenUrl":"https://..."}'`,
        );
        process.exit(1);
      }

      if (grantType === "client_credentials") {
        const spin = spinner("Exchanging client credentials...");

        try {
          const resolvedSecret = await resolveClientSecret({
            client,
            clientId,
            clientSecret,
            templateMatch,
          });
          const req = buildClientCredentialsExchangeRequest({
            tokenUrl,
            clientId,
            clientSecret: resolvedSecret.clientSecret,
            scopes,
            config: tokenConfig,
          });
          const step = {
            id: `oauth_cc_${Date.now()}`,
            failureBehavior: "fail" as const,
            config: {
              url: req.url,
              method: "POST",
              headers: req.headers,
              body: req.body,
            },
          };
          const result = await client.executeStep({ step, payload: {} });
          if (result.success && result.data) {
            const tokens = result.data.data || result.data;
            if (tokens.access_token) {
              await saveOAuthTokens({
                client,
                config,
                system,
                systemId: opts.systemId,
                envOption,
                tokens: normalizeOAuthTokens(tokens),
              });
              spin.stop();
              success(
                `OAuth client_credentials flow completed for ${c.bold}${opts.systemId}${c.reset}`,
              );
              return;
            }
          }
          spin.stop();
          error(result.error || "Token exchange failed");
          process.exit(1);
        } catch (err: any) {
          spin.stop();
          error(err.message);
          process.exit(1);
        }
      }

      if (!authUrl) {
        error(
          `Missing authUrl for authorization_code flow. Provide --auth-url or add it to authentication:\n\n  sg system edit --id ${opts.systemId} --authentication '{"type":"oauth2","authUrl":"https://..."}'`,
        );
        process.exit(1);
      }

      // Authorization code flow: embed encrypted API key in state, open browser, poll for token change
      const userOwned = system.credentialOwnership === "user";
      const originalToken = userOwned
        ? await getMySystemCredentials(config, opts.systemId, envOption)
            .then((data) => stringValue(data.credentials?.access_token))
            .catch(() => undefined)
        : stringValue(system.credentials?.access_token);

      // Fetch the encryption secret and orgId from the server
      let encryptionSecret: string;
      let orgId: string;
      try {
        const secretData = await client.getCliOAuthSecret();
        encryptionSecret = secretData.secret;
        orgId = secretData.orgId;
      } catch (err: any) {
        error(`Failed to get OAuth encryption secret: ${err.message}`);
        process.exit(1);
      }

      const encryptedApiKey = encryptCliApiKey(config.apiKey, opts.systemId, encryptionSecret);

      // Cache client credentials on the backend (same as UI flow) so the callback
      // can retrieve client_secret without it being in the URL state.
      // Always cache when the system has its own client_secret — even if a template
      // matched by URL, the template may not have preconfigured server-side credentials.
      let clientCredentialsUid: string | undefined;
      const resolvedSecret = await resolveClientSecret({
        client,
        clientId,
        clientSecret,
        templateMatch,
      });
      if (resolvedSecret.clientSecret && resolvedSecret.source !== "template" && clientId) {
        clientCredentialsUid = crypto.randomUUID();
        try {
          await client.cacheOauthClientCredentials({
            clientCredentialsUid,
            clientId,
            clientSecret: resolvedSecret.clientSecret,
          });
        } catch (err: any) {
          error(`Failed to cache OAuth credentials: ${err.message}`);
          process.exit(1);
        }
      }

      const redirectUri = `${config.webEndpoint.replace(/\/$/, "")}/api/auth/callback`;

      const state = {
        systemId: opts.systemId,
        orgId,
        timestamp: Date.now(),
        redirectUri,
        token_url: tokenUrl,
        clientId,
        ...(templateMatch ? { templateId: templateMatch.key } : {}),
        ...(clientCredentialsUid ? { client_credentials_uid: clientCredentialsUid } : {}),
        ...(envOption.environment ? { environment: envOption.environment } : {}),
        scopes,
        cliApiKey: encryptedApiKey,
        persistenceMode: userOwned ? "save_user_credentials" : "save_system",
        ...(tokenConfig.tokenAuthMethod && { tokenAuthMethod: tokenConfig.tokenAuthMethod }),
        ...(tokenConfig.tokenContentType && { tokenContentType: tokenConfig.tokenContentType }),
        ...(tokenConfig.extraHeaders && { extraHeaders: tokenConfig.extraHeaders }),
        ...(tokenConfig.extraBodyParams && { extraBodyParams: tokenConfig.extraBodyParams }),
      };

      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        state: Buffer.from(JSON.stringify(state)).toString("base64"),
        scope: scopes || "",
      });

      if (authUrl.includes("google.com")) {
        params.append("access_type", "offline");
        params.append("prompt", "consent");
      }

      const fullAuthUrl = `${authUrl}?${params.toString()}`;

      const spin = spinner("Waiting for browser authentication...");
      openBrowser(fullAuthUrl);

      const authenticated = await pollForTokens(
        config,
        client,
        opts.systemId,
        { ...envOption, userOwned },
        originalToken,
      );
      spin.stop();
      if (authenticated) {
        success(`OAuth authentication successful for ${c.bold}${opts.systemId}${c.reset}`);
      } else {
        error("Authentication timed out (5 minutes)");
        process.exit(1);
      }
    });
}
