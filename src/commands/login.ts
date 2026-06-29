import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as http from "node:http";
import type { AddressInfo } from "node:net";
import type { Command } from "commander";
import { SuperglueClient } from "@superglue/shared";
import {
  buildAuthFromTokenResponse,
  buildOAuthTokenRequest,
  clearAuth,
  getAuthPath,
  loadAuth,
  writeAuth,
} from "../auth.js";
import type { CLIOAuthClient } from "../auth.js";
import { openBrowser } from "../browser.js";
import {
  ensureConfigDirs,
  getConfigPath,
  resolveConfig,
  type CLIConfig,
  writeConfig,
} from "../config.js";
import { createClient } from "../client.js";
import { CLI_VERSION } from "../version.js";
import { colors as c, error, info, output, spinner, success } from "../output.js";

const OAUTH_SCOPE = "openid profile email offline_access";
const LOOPBACK_HOST = "127.0.0.1";
const PREFERRED_LOOPBACK_PORT = 45454;
const LOGIN_TIMEOUT_MS = 5 * 60 * 1000;

interface OAuthMetadata {
  authorization_endpoint: string;
  token_endpoint: string;
  registration_endpoint: string;
}

interface OAuthClientRegistrationResponse {
  client_id?: string;
  client_secret?: string;
  token_endpoint_auth_method?: "none" | "client_secret_basic" | "client_secret_post";
  redirect_uris?: string[];
  error?: string;
  error_description?: string;
}

interface OAuthTokenResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
}

type CallbackResult = {
  code: string;
  state: string;
};

type CallbackServer = {
  redirectUri: string;
  waitForCallback: () => Promise<CallbackResult>;
  close: () => Promise<void>;
};

type LoginOptions = {
  browser?: boolean;
  global?: boolean;
  saveConfig?: boolean;
  webEndpoint?: string;
};

function normalizeEndpoint(endpoint: string): string {
  return endpoint.replace(/\/+$/, "");
}

function base64Url(buffer: Buffer): string {
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function createPkce(): { verifier: string; challenge: string } {
  const verifier = base64Url(crypto.randomBytes(32));
  const challenge = base64Url(crypto.createHash("sha256").update(verifier).digest());
  return { verifier, challenge };
}

async function listen(server: http.Server, port: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const onError = (err: NodeJS.ErrnoException) => {
      server.off("listening", onListening);
      reject(err);
    };
    const onListening = () => {
      server.off("error", onError);
      const address = server.address() as AddressInfo;
      resolve(address.port);
    };
    server.once("error", onError);
    server.once("listening", onListening);
    server.listen(port, LOOPBACK_HOST);
  });
}

async function startCallbackServer(expectedState: string): Promise<CallbackServer> {
  let timeout: NodeJS.Timeout | null = null;
  let resolveCallback: (result: CallbackResult) => void;
  let rejectCallback: (error: Error) => void;

  const callbackPromise = new Promise<CallbackResult>((resolve, reject) => {
    resolveCallback = resolve;
    rejectCallback = reject;
  });

  const server = http.createServer((request, response) => {
    const url = new URL(request.url || "/", `http://${request.headers.host || LOOPBACK_HOST}`);
    if (url.pathname !== "/callback") {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Not found");
      return;
    }

    const providerError = url.searchParams.get("error");
    const providerErrorDescription = url.searchParams.get("error_description");
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (providerError) {
      response.writeHead(400, { "Content-Type": "text/html" });
      response.end("<h2>superglue CLI login failed</h2><p>You can close this window.</p>");
      rejectCallback(new Error(providerErrorDescription || providerError));
      return;
    }

    if (!code || !state || state !== expectedState) {
      response.writeHead(400, { "Content-Type": "text/html" });
      response.end("<h2>superglue CLI login failed</h2><p>You can close this window.</p>");
      rejectCallback(new Error("OAuth callback was missing a valid code or state."));
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("<h2>superglue CLI login complete</h2><p>You can close this window.</p>");
    resolveCallback({ code, state });
  });

  let port: number;
  try {
    port = await listen(server, PREFERRED_LOOPBACK_PORT);
  } catch (err: any) {
    if (err?.code !== "EADDRINUSE") throw err;
    port = await listen(server, 0);
  }

  timeout = setTimeout(() => {
    rejectCallback(new Error("Login timed out waiting for the browser callback."));
  }, LOGIN_TIMEOUT_MS);
  timeout.unref();

  return {
    redirectUri: `http://${LOOPBACK_HOST}:${port}/callback`,
    waitForCallback: async () => {
      try {
        return await callbackPromise;
      } finally {
        if (timeout) clearTimeout(timeout);
      }
    },
    close: () =>
      new Promise((resolve) => {
        if (timeout) clearTimeout(timeout);
        server.close(() => resolve());
      }),
  };
}

async function parseJsonResponse<T extends { error?: string; error_description?: string }>(
  response: Response,
): Promise<T> {
  const data = (await response.json().catch(() => ({}))) as T;
  if (!response.ok) {
    const message = data.error_description || data.error;
    throw new Error(message || `HTTP ${response.status}`);
  }
  return data;
}

async function discoverOAuthMetadata(
  config: CLIConfig,
  options?: { useConfiguredAuthorizationEndpoint?: boolean },
): Promise<OAuthMetadata> {
  const fallback = {
    authorization_endpoint: `${normalizeEndpoint(config.webEndpoint)}/api/auth/oauth2/authorize`,
    token_endpoint: `${normalizeEndpoint(config.endpoint)}/oauth2/token`,
    registration_endpoint: `${normalizeEndpoint(config.endpoint)}/oauth2/register`,
  };

  try {
    const response = await fetch(
      `${normalizeEndpoint(config.endpoint)}/.well-known/openid-configuration`,
    );
    if (!response.ok) return fallback;
    const data = (await response.json()) as Partial<OAuthMetadata>;
    return {
      authorization_endpoint: options?.useConfiguredAuthorizationEndpoint
        ? fallback.authorization_endpoint
        : data.authorization_endpoint || fallback.authorization_endpoint,
      token_endpoint: data.token_endpoint || fallback.token_endpoint,
      registration_endpoint: data.registration_endpoint || fallback.registration_endpoint,
    };
  } catch {
    return fallback;
  }
}

async function registerOAuthClient(
  metadata: OAuthMetadata,
  redirectUri: string,
): Promise<CLIOAuthClient> {
  const response = await fetch(metadata.registration_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      redirect_uris: [redirectUri],
      token_endpoint_auth_method: "none",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      client_name: "superglue CLI",
      client_uri: "https://docs.superglue.cloud/getting-started/cli-skills",
      scope: OAUTH_SCOPE,
      software_id: "superglue-cli",
      software_version: CLI_VERSION,
    }),
  });

  const data = await parseJsonResponse<OAuthClientRegistrationResponse>(response);
  if (!data.client_id) {
    throw new Error("OAuth registration did not return a client_id.");
  }

  return {
    clientId: data.client_id,
    clientSecret: data.client_secret,
    tokenEndpointAuthMethod: data.token_endpoint_auth_method || "none",
    redirectUris: data.redirect_uris?.length ? data.redirect_uris : [redirectUri],
  };
}

function buildAuthorizationUrl(params: {
  metadata: OAuthMetadata;
  clientId: string;
  redirectUri: string;
  state: string;
  codeChallenge: string;
}): string {
  const url = new URL(params.metadata.authorization_endpoint);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", params.clientId);
  url.searchParams.set("redirect_uri", params.redirectUri);
  url.searchParams.set("scope", OAUTH_SCOPE);
  url.searchParams.set("state", params.state);
  url.searchParams.set("code_challenge", params.codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("prompt", "consent");
  return url.toString();
}

async function exchangeAuthorizationCode(params: {
  metadata: OAuthMetadata;
  client: CLIOAuthClient;
  redirectUri: string;
  code: string;
  codeVerifier: string;
}): Promise<OAuthTokenResponse> {
  const tokenRequest = buildOAuthTokenRequest(params.client, {
    grant_type: "authorization_code",
    code: params.code,
    redirect_uri: params.redirectUri,
    code_verifier: params.codeVerifier,
  });

  const response = await fetch(params.metadata.token_endpoint, {
    method: "POST",
    headers: tokenRequest.headers,
    body: tokenRequest.body,
  });
  return parseJsonResponse<OAuthTokenResponse>(response);
}

function resolveLoginConfig(command: Command, opts: LoginOptions): CLIConfig {
  const parentOpts = command.parent?.opts() ?? {};
  const config = resolveConfig({
    apiKey: undefined,
    endpoint: parentOpts.endpoint,
  });
  return {
    ...config,
    webEndpoint: opts.webEndpoint || config.webEndpoint,
  };
}

function loadExistingConfig(preferLocal?: boolean): Partial<CLIConfig> {
  const configPath = getConfigPath(preferLocal);
  if (!fs.existsSync(configPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf-8")) as Partial<CLIConfig>;
  } catch {
    return {};
  }
}

function hasConfiguredWebEndpoint(opts: LoginOptions): boolean {
  return Boolean(
    opts.webEndpoint ||
    process.env.SUPERGLUE_WEB_ENDPOINT ||
    typeof loadExistingConfig().webEndpoint === "string",
  );
}

function saveEndpointConfig(config: CLIConfig, preferLocal?: boolean): string {
  const existing = loadExistingConfig(preferLocal);
  const nextConfig: CLIConfig = {
    ...config,
    ...existing,
    apiKey: typeof existing.apiKey === "string" ? existing.apiKey : "",
    endpoint: normalizeEndpoint(config.endpoint),
    webEndpoint: normalizeEndpoint(config.webEndpoint),
    output: { ...config.output, ...existing.output },
    preset: config.preset,
  };
  writeConfig(nextConfig, preferLocal);
  ensureConfigDirs(nextConfig, preferLocal);
  return getConfigPath(preferLocal);
}

async function verifyLogin(config: CLIConfig, accessToken: string) {
  const client = new SuperglueClient({ apiKey: accessToken, apiEndpoint: config.endpoint });
  return client.getMe();
}

export function registerLoginCommands(program: Command): void {
  program
    .command("login")
    .description("Authenticate the superglue CLI through the browser")
    .option("--web-endpoint <url>", "superglue web app endpoint")
    .option("--no-browser", "Print the login URL instead of opening a browser")
    .option("--save-config", "Persist endpoint settings to config.json")
    .option("--global", "Save endpoint config globally (~/.superglue/config.json)")
    .action(async function (opts: LoginOptions) {
      const config = resolveLoginConfig(this, opts);
      const spin = spinner("Preparing browser login...");
      let callbackServer: CallbackServer | null = null;

      try {
        const metadata = await discoverOAuthMetadata(config, {
          useConfiguredAuthorizationEndpoint: hasConfiguredWebEndpoint(opts),
        });
        const state = crypto.randomUUID();
        const pkce = createPkce();
        callbackServer = await startCallbackServer(state);
        const client = await registerOAuthClient(metadata, callbackServer.redirectUri);
        const authorizationUrl = buildAuthorizationUrl({
          metadata,
          clientId: client.clientId,
          redirectUri: callbackServer.redirectUri,
          state,
          codeChallenge: pkce.challenge,
        });

        spin.stop();
        if (opts.browser !== false) {
          openBrowser(authorizationUrl);
          info("Opened browser for superglue login.");
        }
        console.log("");
        console.log(`  ${c.dim}Login URL:${c.reset} ${authorizationUrl}`);
        console.log("");

        const callback = await callbackServer.waitForCallback();
        const tokenResponse = await exchangeAuthorizationCode({
          metadata,
          client,
          redirectUri: callbackServer.redirectUri,
          code: callback.code,
          codeVerifier: pkce.verifier,
        });

        const auth = buildAuthFromTokenResponse({
          endpoint: config.endpoint,
          webEndpoint: config.webEndpoint,
          client,
          tokenResponse,
        });
        const me = await verifyLogin(config, auth.tokens.accessToken);
        writeAuth(auth);
        const configPath = opts.saveConfig
          ? saveEndpointConfig(config, opts.global ? false : undefined)
          : undefined;

        success(`Logged in to ${config.endpoint}`, {
          authPath: getAuthPath(),
          configPath,
          orgId: me.orgId,
          userId: me.userId,
          roleIds: me.roleIds,
        });
      } catch (err: any) {
        spin.stop();
        error(err?.message || "Login failed");
        process.exit(1);
      } finally {
        await callbackServer?.close();
      }
    });

  program
    .command("logout")
    .description("Remove the stored OAuth session from auth.json")
    .action(() => {
      const removed = clearAuth();
      success(removed ? "Logged out" : "No OAuth session found", { authPath: getAuthPath() });
    });

  program
    .command("whoami")
    .description("Show the authenticated superglue user and organization")
    .action(async function () {
      const parentOpts = this.parent?.opts() ?? {};
      const config = resolveConfig({ apiKey: parentOpts.apiKey, endpoint: parentOpts.endpoint });
      const auth = loadAuth();
      const authType = config.apiKey
        ? "api_key"
        : auth && normalizeEndpoint(auth.endpoint) === normalizeEndpoint(config.endpoint)
          ? "oauth"
          : "none";

      if (authType === "none") {
        error("No authentication configured. Run `sg login`.");
        process.exit(1);
      }

      const client = createClient(config);
      try {
        const me = await client.getMe();
        output({
          success: true,
          authType,
          endpoint: config.endpoint,
          userId: me.userId,
          orgId: me.orgId,
          orgName: me.orgName,
          roleIds: me.roleIds,
        });
      } catch (err: any) {
        error(err?.message || "Failed to fetch current user");
        process.exit(1);
      }
    });
}
