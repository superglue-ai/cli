import { type Command, Option } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import {
  findTemplateForSystem,
  getOAuthTokenExchangeConfig,
  isMaskedSecretValue,
  parseJsonRecord,
  resolveOAuthConfigFromAuthentication,
} from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { error, isTableMode, success, spinner, colors as c } from "../../output.js";
import { getMySystemCredentials } from "./user-credentials-api.js";
import { openBrowser } from "../../browser.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

type TokenBaseline = { hasToken: boolean; updatedAt?: string; tokenValue?: string };

async function readTokenBaseline({
  config,
  systemId,
  options,
}: {
  config: CLIConfig;
  systemId: string;
  options: { environment?: "dev" | "prod" };
}): Promise<TokenBaseline> {
  try {
    const data = await getMySystemCredentials(config, systemId, options);
    const tokenValue = stringValue(data.credentials?.access_token);
    return { hasToken: Boolean(tokenValue), updatedAt: data.updatedAt, tokenValue };
  } catch {
    return { hasToken: false };
  }
}

async function pollForTokens(
  config: CLIConfig,
  _client: SuperglueClient,
  systemId: string,
  options: { environment?: "dev" | "prod" },
  baseline: TokenBaseline,
  timeoutMs: number = 300_000,
  intervalMs: number = 2000,
): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, intervalMs));
    try {
      const data = await getMySystemCredentials(config, systemId, options);
      const tokenValue = stringValue(data.credentials?.access_token);
      if (!tokenValue) continue;
      if (!baseline.hasToken) return true;
      // Token values come back masked on current servers, so completion is
      // detected via updatedAt; the value compare covers servers that predate
      // the updatedAt field and still return raw tokens.
      if (data.updatedAt !== undefined || baseline.updatedAt !== undefined) {
        if (data.updatedAt !== baseline.updatedAt) return true;
      } else if (tokenValue !== baseline.tokenValue) {
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

  const resolvedClientSecret =
    stringValue(credentials.client_secret) ?? stringValue(authConfig.client_secret);

  return {
    templateMatch,
    clientId: stringValue(credentials.client_id) ?? stringValue(authConfig.client_id),
    clientSecret: isMaskedSecretValue(resolvedClientSecret) ? undefined : resolvedClientSecret,
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
          const exchange = await client.createOAuthExchange({
            systemId: opts.systemId,
            environment: envOption.environment,
            grantType: "client_credentials",
            redirectUri: `${config.webEndpoint.replace(/\/$/, "")}/api/auth/callback`,
            tokenUrl,
            clientId,
            clientSecret,
            templateId: clientSecret ? undefined : templateMatch?.key,
            scopes,
            tokenAuthMethod: tokenConfig.tokenAuthMethod,
            tokenContentType: tokenConfig.tokenContentType,
            extraHeaders: tokenConfig.extraHeaders,
            extraBodyParams: tokenConfig.extraBodyParams,
            tokenDestination: "user_credentials",
            returnTokens: false,
          });
          const result = await client.completeOAuthExchange(exchange.oauthExchangeId, {
            state: exchange.state,
          });
          if (result.type === "oauth-success" && result.saved) {
            spin.stop();
            success(
              `OAuth client_credentials flow completed for ${c.bold}${opts.systemId}${c.reset}`,
            );
            return;
          }
          spin.stop();
          error(result.message || "Token exchange failed");
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

      // Authorization code flow: create backend exchange, open browser, poll for token change.
      // Tokens live in the executing user's credentials.
      const baseline = await readTokenBaseline({
        config,
        systemId: opts.systemId,
        options: envOption,
      });

      const redirectUri = `${config.webEndpoint.replace(/\/$/, "")}/api/auth/callback`;
      let exchange: Awaited<ReturnType<SuperglueClient["createOAuthExchange"]>>;
      try {
        exchange = await client.createOAuthExchange({
          systemId: opts.systemId,
          environment: envOption.environment,
          grantType: "authorization_code",
          redirectUri,
          authUrl,
          tokenUrl,
          clientId,
          clientSecret,
          templateId: clientSecret ? undefined : templateMatch?.key,
          scopes,
          tokenAuthMethod: tokenConfig.tokenAuthMethod,
          tokenContentType: tokenConfig.tokenContentType,
          extraHeaders: tokenConfig.extraHeaders,
          extraBodyParams: tokenConfig.extraBodyParams,
          tokenDestination: "user_credentials",
          returnTokens: false,
        });
      } catch (err: any) {
        error(`Failed to initialize OAuth exchange: ${err.message}`);
        process.exit(1);
      }

      if (!exchange.authorizationUrl) {
        error("OAuth exchange did not return an authorization URL");
        process.exit(1);
      }

      openBrowser(exchange.authorizationUrl);
      if (isTableMode()) {
        console.log("");
        console.log(`  ${c.dim}Authorization URL:${c.reset} ${exchange.authorizationUrl}`);
        console.log("");
      }

      const spin = spinner("Waiting for browser authentication...");

      const authenticated = await pollForTokens(config, client, opts.systemId, envOption, baseline);
      spin.stop();
      if (authenticated) {
        success(`OAuth authentication successful for ${c.bold}${opts.systemId}${c.reset}`);
      } else {
        error("Authentication timed out (5 minutes)");
        process.exit(1);
      }
    });
}
