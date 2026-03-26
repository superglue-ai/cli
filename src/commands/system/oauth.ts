import { spawn } from "node:child_process";
import crypto from "node:crypto";
import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import { findTemplateForSystem, encryptCliApiKey } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, success, spinner, colors as c } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function openBrowser(url: string): void {
  const platform = process.platform;
  const cmd = platform === "darwin" ? "open" : platform === "win32" ? "cmd" : "xdg-open";
  const args = platform === "win32" ? ["/c", "start", "", url] : [url];
  spawn(cmd, args, { detached: true, stdio: "ignore" }).unref();
}

async function pollForTokens(
  client: SuperglueClient,
  systemId: string,
  originalToken: string | undefined,
  timeoutMs: number = 300_000,
  intervalMs: number = 2000,
): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, intervalMs));
    try {
      const system = await client.getSystem(systemId);
      const currentToken = system?.credentials?.access_token;
      if (currentToken && currentToken !== originalToken) {
        return true;
      }
    } catch {}
  }
  return false;
}

export function registerOAuthCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("oauth")
    .description("Authenticate a system via OAuth")
    .requiredOption("--system-id <id>", "System ID")
    .requiredOption("--scopes <scopes>", "Space-separated OAuth scopes")
    .option("--auth-url <url>", "OAuth authorization URL")
    .option("--token-url <url>", "OAuth token URL")
    .option("--grant-type <type>", "Grant type", "authorization_code")
    .action(async (opts) => {
      const { config, client } = getContext();

      let system: any;
      try {
        system = await client.getSystem(opts.systemId);
        if (!system) {
          error(`System not found: ${opts.systemId}`);
          process.exit(1);
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }

      const templateMatch = findTemplateForSystem(system);
      const templateOAuth = templateMatch?.template?.oauth;

      const clientId = system.credentials?.client_id ?? templateOAuth?.client_id;
      const authUrl = opts.authUrl ?? system.credentials?.auth_url ?? templateOAuth?.authUrl;
      const tokenUrl = opts.tokenUrl ?? system.credentials?.token_url ?? templateOAuth?.tokenUrl;
      const grantType = opts.grantType ?? system.credentials?.grant_type ?? "authorization_code";

      if (!clientId) {
        error("Missing client_id. Add it to the system credentials first.");
        process.exit(1);
      }
      if (!tokenUrl) {
        error("Missing token_url. Provide --token-url or add it to credentials.");
        process.exit(1);
      }

      if (grantType === "client_credentials") {
        const spin = spinner("Exchanging client credentials...");

        try {
          const step = {
            id: `oauth_cc_${Date.now()}`,
            failureBehavior: "continue" as const,
            config: {
              url: tokenUrl,
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: clientId,
                ...(system.credentials?.client_secret
                  ? { client_secret: system.credentials.client_secret }
                  : {}),
                ...(opts.scopes ? { scope: opts.scopes } : {}),
              }).toString(),
            },
          };
          const result = await client.executeStep({ step, payload: {} });
          if (result.success && result.data) {
            const tokens = result.data.data || result.data;
            if (tokens.access_token) {
              await client.updateSystem(opts.systemId, {
                credentials: {
                  ...system.credentials,
                  access_token: tokens.access_token,
                  refresh_token: tokens.refresh_token,
                  token_type: tokens.token_type || "Bearer",
                  ...(tokens.expires_in
                    ? {
                        expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
                      }
                    : {}),
                },
              });
              spin.stop();
              success(
                `OAuth client_credentials flow completed for ${c.bold}${opts.systemId}${c.reset}`,
              );
              return;
            }
          }
          spin.stop();
          error("Token exchange failed");
          process.exit(1);
        } catch (err: any) {
          spin.stop();
          error(err.message);
          process.exit(1);
        }
      }

      if (!authUrl) {
        error("Missing auth_url for authorization_code flow. Provide --auth-url.");
        process.exit(1);
      }

      // Authorization code flow: embed encrypted API key in state, open browser, poll for token change
      const originalToken = system.credentials?.access_token;

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
      if (system.credentials?.client_secret && clientId) {
        clientCredentialsUid = crypto.randomUUID();
        try {
          await client.cacheOauthClientCredentials({
            clientCredentialsUid,
            clientId,
            clientSecret: system.credentials.client_secret,
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
        scopes: opts.scopes,
        cliApiKey: encryptedApiKey,
      };

      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        state: Buffer.from(JSON.stringify(state)).toString("base64"),
        scope: opts.scopes,
      });

      if (authUrl.includes("google.com")) {
        params.append("access_type", "offline");
        params.append("prompt", "consent");
      }

      const fullAuthUrl = `${authUrl}?${params.toString()}`;

      const spin = spinner("Waiting for browser authentication...");
      openBrowser(fullAuthUrl);

      const authenticated = await pollForTokens(client, opts.systemId, originalToken);
      spin.stop();
      if (authenticated) {
        success(`OAuth authentication successful for ${c.bold}${opts.systemId}${c.reset}`);
      } else {
        error("Authentication timed out (5 minutes)");
        process.exit(1);
      }
    });
}
