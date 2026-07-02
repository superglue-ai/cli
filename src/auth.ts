import * as fs from "node:fs";
import * as path from "node:path";
import type { CLIConfig } from "./config.js";
import { getConfigDir } from "./config.js";

const TOKEN_REFRESH_SKEW_MS = 60_000;
const refreshAuthPromises = new Map<string, Promise<CLIAuth>>();

export interface CLIOAuthClient {
  clientId: string;
  clientSecret?: string;
  tokenEndpointAuthMethod?: "none" | "client_secret_basic" | "client_secret_post";
  redirectUris: string[];
}

export interface CLIOAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  scope?: string;
  tokenType?: string;
}

export interface CLIAuth {
  endpoint: string;
  webEndpoint: string;
  tokenEndpoint?: string;
  client: CLIOAuthClient;
  tokens: CLIOAuthTokens;
  createdAt: string;
  updatedAt: string;
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

type OAuthErrorResponse = {
  error?: string;
  error_description?: string;
};

export type OAuthTokenRequest = {
  body: URLSearchParams;
  headers: Record<string, string>;
};

function normalizeEndpoint(endpoint: string): string {
  return endpoint.replace(/\/+$/, "");
}

function getTokenExpiresAt(expiresIn?: number): string | undefined {
  const expiresInMs = Number(expiresIn) * 1000;
  if (!Number.isFinite(expiresInMs) || expiresInMs <= TOKEN_REFRESH_SKEW_MS) return undefined;
  return new Date(Date.now() + expiresInMs).toISOString();
}

function isTokenFresh(tokens: CLIOAuthTokens): boolean {
  if (!tokens.accessToken) return false;
  if (!tokens.expiresAt) return true;
  const expiresAt = Date.parse(tokens.expiresAt);
  return Number.isFinite(expiresAt) && expiresAt - TOKEN_REFRESH_SKEW_MS > Date.now();
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

export function getAuthPath(): string {
  return path.join(getConfigDir(false), "auth.json");
}

export function loadAuth(): CLIAuth | null {
  const authPath = getAuthPath();
  if (!fs.existsSync(authPath)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(authPath, "utf-8"));
    if (!parsed || typeof parsed !== "object") return null;
    if (
      !isNonEmptyString(parsed.endpoint) ||
      !isNonEmptyString(parsed.webEndpoint) ||
      !isNonEmptyString(parsed.client?.clientId) ||
      !isNonEmptyString(parsed.tokens?.accessToken)
    ) {
      return null;
    }
    return parsed as CLIAuth;
  } catch {
    return null;
  }
}

export function writeAuth(auth: CLIAuth): void {
  const authPath = getAuthPath();
  const dir = path.dirname(authPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(authPath, JSON.stringify(auth, null, 2) + "\n", { mode: 0o600 });
  fs.chmodSync(authPath, 0o600);
}

export function clearAuth(): boolean {
  const authPath = getAuthPath();
  if (!fs.existsSync(authPath)) return false;
  fs.rmSync(authPath);
  return true;
}

export function getAuthForEndpoint(endpoint: string): CLIAuth | null {
  const auth = loadAuth();
  if (!auth) return null;
  return normalizeEndpoint(auth.endpoint) === normalizeEndpoint(endpoint) ? auth : null;
}

export function buildAuthFromTokenResponse(params: {
  endpoint: string;
  webEndpoint: string;
  tokenEndpoint?: string;
  client: CLIOAuthClient;
  tokenResponse: OAuthTokenResponse;
  previousRefreshToken?: string;
}): CLIAuth {
  const accessToken = params.tokenResponse.access_token;
  if (!accessToken) {
    throw new Error("OAuth token response did not include an access token");
  }
  const now = new Date().toISOString();
  return {
    endpoint: normalizeEndpoint(params.endpoint),
    webEndpoint: normalizeEndpoint(params.webEndpoint),
    ...(params.tokenEndpoint ? { tokenEndpoint: normalizeEndpoint(params.tokenEndpoint) } : {}),
    client: params.client,
    tokens: {
      accessToken,
      refreshToken: params.tokenResponse.refresh_token || params.previousRefreshToken,
      expiresAt: getTokenExpiresAt(params.tokenResponse.expires_in),
      scope: params.tokenResponse.scope,
      tokenType: params.tokenResponse.token_type,
    },
    createdAt: now,
    updatedAt: now,
  };
}

function resolveTokenEndpointAuthMethod(
  client: CLIOAuthClient,
): "none" | "client_secret_basic" | "client_secret_post" {
  if (client.tokenEndpointAuthMethod) return client.tokenEndpointAuthMethod;
  return client.clientSecret ? "client_secret_basic" : "none";
}

function formEncodeOAuthCredential(value: string): string {
  const params = new URLSearchParams({ credential: value });
  return params.toString().slice("credential=".length);
}

export function buildOAuthTokenRequest(
  client: CLIOAuthClient,
  values: Record<string, string>,
): OAuthTokenRequest {
  const body = new URLSearchParams(values);
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const tokenEndpointAuthMethod = resolveTokenEndpointAuthMethod(client);

  if (tokenEndpointAuthMethod === "client_secret_basic") {
    if (!client.clientSecret) {
      throw new Error("OAuth client_secret_basic authentication requires a client secret.");
    }
    const basicCredentials = `${formEncodeOAuthCredential(client.clientId)}:${formEncodeOAuthCredential(client.clientSecret)}`;
    headers.Authorization = `Basic ${Buffer.from(basicCredentials, "utf8").toString("base64")}`;
    return { body, headers };
  }

  body.set("client_id", client.clientId);
  if (tokenEndpointAuthMethod === "client_secret_post") {
    if (!client.clientSecret) {
      throw new Error("OAuth client_secret_post authentication requires a client secret.");
    }
    body.set("client_secret", client.clientSecret);
  }

  return { body, headers };
}

export async function parseOAuthJsonResponse<T extends OAuthErrorResponse>(
  response: Response,
  fallbackMessage = `HTTP ${response.status}`,
): Promise<T> {
  const data = (await response.json().catch(() => ({}))) as T;
  if (!response.ok) {
    const message = data.error_description || data.error || fallbackMessage;
    throw new Error(message);
  }
  return data;
}

async function refreshAuth(auth: CLIAuth): Promise<CLIAuth> {
  if (!auth.tokens.refreshToken) {
    throw new Error("OAuth session expired. Run `sg login` to authenticate again.");
  }

  const tokenRequest = buildOAuthTokenRequest(auth.client, {
    grant_type: "refresh_token",
    refresh_token: auth.tokens.refreshToken,
  });

  const response = await fetch(
    auth.tokenEndpoint || `${normalizeEndpoint(auth.endpoint)}/oauth2/token`,
    {
      method: "POST",
      headers: tokenRequest.headers,
      body: tokenRequest.body,
    },
  );
  const tokenResponse = await parseOAuthJsonResponse<OAuthTokenResponse>(
    response,
    `OAuth token request failed (${response.status})`,
  );
  const refreshed: CLIAuth = {
    ...buildAuthFromTokenResponse({
      endpoint: auth.endpoint,
      webEndpoint: auth.webEndpoint,
      tokenEndpoint: auth.tokenEndpoint,
      client: auth.client,
      tokenResponse,
      previousRefreshToken: auth.tokens.refreshToken,
    }),
    createdAt: auth.createdAt,
  };
  writeAuth(refreshed);
  return refreshed;
}

function refreshAuthOnce(auth: CLIAuth): Promise<CLIAuth> {
  const key = normalizeEndpoint(auth.endpoint);
  const existing = refreshAuthPromises.get(key);
  if (existing) return existing;

  const refreshPromise = refreshAuth(auth).finally(() => {
    if (refreshAuthPromises.get(key) === refreshPromise) {
      refreshAuthPromises.delete(key);
    }
  });
  refreshAuthPromises.set(key, refreshPromise);
  return refreshPromise;
}

export function createOAuthTokenProvider(config: CLIConfig): (() => Promise<string>) | null {
  const auth = getAuthForEndpoint(config.endpoint);
  if (!auth) return null;

  return async () => {
    const current = getAuthForEndpoint(config.endpoint);
    if (!current) {
      throw new Error("No OAuth session found. Run `sg login` to authenticate.");
    }
    if (isTokenFresh(current.tokens)) {
      return current.tokens.accessToken;
    }
    const refreshed = await refreshAuthOnce(current);
    return refreshed.tokens.accessToken;
  };
}
