import { type Command, Option } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import {
  findTemplateForSystem,
  getOAuthTokenExchangeConfig,
  hasCredentialKeyValue,
  isMaskedSecretValue,
  resolveOAuthConfigFromAuthentication,
  stringValue,
} from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { error, isTableMode, success, spinner, colors as c } from "../../output.js";
import { getOwnedCredentialSet } from "./credentials-api.js";
import { openBrowser } from "../../browser.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

type TokenBaseline = { hasToken: boolean; updatedAt?: string };

async function readTokenBaseline({
  client,
  systemId,
}: {
  client: SuperglueClient;
  systemId: string;
}): Promise<TokenBaseline> {
  try {
    const set = await getOwnedCredentialSet(client, systemId);
    const hasToken = hasCredentialKeyValue(set?.credentialKeys, "access_token");
    return { hasToken, updatedAt: set?.updatedAt?.toString() };
  } catch {
    return { hasToken: false };
  }
}

async function pollForTokens({
  client,
  systemId,
  baseline,
  timeoutMs = 300_000,
  intervalMs = 2000,
}: {
  client: SuperglueClient;
  systemId: string;
  baseline: TokenBaseline;
  timeoutMs?: number;
  intervalMs?: number;
}): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, intervalMs));
    try {
      const set = await getOwnedCredentialSet(client, systemId);
      const hasToken = hasCredentialKeyValue(set?.credentialKeys, "access_token");
      if (!hasToken) continue;
      if (!baseline.hasToken) return true;
      const updatedAt = set?.updatedAt?.toString();
      if (updatedAt !== baseline.updatedAt) return true;
    } catch {}
  }
  return false;
}

function parseEnvironment(opts: { env?: string }): { environment?: "dev" | "prod" } {
  return opts.env === "dev" || opts.env === "prod" ? { environment: opts.env } : {};
}

function resolveCliOAuthConfig(system: any, opts: any) {
  const templateMatch = findTemplateForSystem(system);
  const templateOAuth = templateMatch?.template?.oauth;
  const resolved = resolveOAuthConfigFromAuthentication({
    input: { ...(system.credentials || {}), ...opts },
    authentication: system.authentication,
    templateOAuth,
  });
  const resolvedClientSecret = stringValue(resolved.client_secret);

  return {
    templateMatch,
    clientId: stringValue(resolved.client_id),
    clientSecret: isMaskedSecretValue(resolvedClientSecret) ? undefined : resolvedClientSecret,
    authUrl: stringValue(resolved.auth_url),
    tokenUrl: stringValue(resolved.token_url),
    grantType: stringValue(resolved.grant_type) || "authorization_code",
    scopes: stringValue(resolved.scopes),
    tokenConfig: getOAuthTokenExchangeConfig(system),
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
        client,
        systemId: opts.systemId,
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

      const authenticated = await pollForTokens({ client, systemId: opts.systemId, baseline });
      spin.stop();
      if (authenticated) {
        success(`OAuth authentication successful for ${c.bold}${opts.systemId}${c.reset}`);
      } else {
        error("Authentication timed out (5 minutes)");
        process.exit(1);
      }
    });
}
