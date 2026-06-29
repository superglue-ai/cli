import * as fs from "node:fs";
import type { McpServerAuthMode, McpServerConfig, McpServerConfigInput } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface CliIdentity {
  userId?: string;
  orgId?: string;
  orgName?: string;
  roleIds?: string[];
}

export interface ListMcpServersResponse {
  data: McpServerConfig[];
  total: number;
  hasMore: boolean;
}

export interface McpServerConnectionInfo {
  endpoint: string;
  allToolsEndpoint: string;
  authMode: McpServerAuthMode;
  apiKeyEnv: "SUPERGLUE_API_KEY";
  apiEndpointEnv: "SUPERGLUE_API_ENDPOINT";
  creatorApiKeyRequired: boolean;
  configuredApiKeyCanInvoke?: boolean;
}

export interface FormattedMcpServer {
  id: string;
  orgId: string;
  name: string;
  displayName?: string;
  description?: string;
  authMode: McpServerAuthMode;
  toolIds: string[];
  createdByUserId?: string;
  createdAt?: string;
  updatedAt?: string;
  connection: McpServerConnectionInfo;
}

function baseEndpoint(config: CLIConfig): string {
  return config.endpoint.replace(/\/$/, "");
}

function extractErrorMessage(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const value = payload as Record<string, any>;
  if (typeof value.error === "string") return value.error;
  if (value.error && typeof value.error.message === "string") return value.error.message;
  if (typeof value.message === "string") return value.message;
  return undefined;
}

async function requestJson<T>(
  config: CLIConfig,
  method: HttpMethod,
  path: string,
  body?: unknown,
): Promise<T> {
  const response = await fetch(`${baseEndpoint(config)}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  let payload: unknown;
  try {
    payload = text ? JSON.parse(text) : undefined;
  } catch {
    payload = text;
  }
  if (!response.ok) {
    const message =
      extractErrorMessage(payload) ||
      (typeof payload === "string" && payload.trim() ? payload.trim() : undefined) ||
      `HTTP ${response.status}`;
    throw new Error(message);
  }
  return payload as T;
}

export function formatMcpError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("MCP server management is not available")) {
    return [
      "MCP server management is not available on this superglue instance or plan.",
      "Verify --endpoint/SUPERGLUE_API_ENDPOINT points at the intended instance.",
      "The default MCP endpoint may still be usable at <api-endpoint>/mcp with an API key.",
    ].join(" ");
  }
  if (message.includes("Authentication failed") || message.includes("No token provided")) {
    return [
      "Authentication failed.",
      "Run `sg login`. For headless/API-key auth, set SUPERGLUE_API_KEY and SUPERGLUE_API_ENDPOINT, or pass --api-key and --endpoint.",
    ].join(" ");
  }
  if (message.toLowerCase().includes("fetch failed")) {
    return [
      "Could not reach the configured superglue API endpoint.",
      "For custom/self-hosted instances, set SUPERGLUE_API_ENDPOINT or pass --endpoint.",
      "Then run `sg login`, or provide an org-scoped API key with SUPERGLUE_API_KEY or --api-key for headless auth.",
    ].join(" ");
  }
  return message;
}

export async function getCliIdentity(config: CLIConfig): Promise<CliIdentity | null> {
  try {
    return await requestJson<CliIdentity>(config, "GET", "/v1/me");
  } catch {
    return null;
  }
}

export async function listMcpServers(
  config: CLIConfig,
  params: { limit: number; offset: number },
): Promise<ListMcpServersResponse> {
  const apiLimit = 1000;
  const items: McpServerConfig[] = [];
  let total = 0;
  let hasMore = false;
  let page = Math.floor(params.offset / apiLimit) + 1;
  let skip = params.offset % apiLimit;

  while (items.length < params.limit) {
    const response = await requestJson<ListMcpServersResponse>(
      config,
      "GET",
      `/v1/mcp-servers?limit=${apiLimit}&page=${page}`,
    );
    const pageItems = response.data || [];
    total = response.total || 0;

    const remaining = params.limit - items.length;
    items.push(...pageItems.slice(skip, skip + remaining));

    hasMore = params.offset + items.length < total;
    if (!response.hasMore || pageItems.length === 0 || !hasMore) break;

    page += 1;
    skip = 0;
  }

  return {
    data: items,
    total,
    hasMore,
  };
}

export async function listAllMcpServers(config: CLIConfig): Promise<McpServerConfig[]> {
  const items: McpServerConfig[] = [];
  let offset = 0;

  while (true) {
    const result = await listMcpServers(config, { limit: 1000, offset });
    items.push(...result.data);
    if (!result.hasMore || result.data.length === 0) break;
    offset += result.data.length;
  }

  return items;
}

export async function getMcpServer(config: CLIConfig, id: string): Promise<McpServerConfig | null> {
  try {
    const response = await requestJson<{ data: McpServerConfig }>(
      config,
      "GET",
      `/v1/mcp-servers/${encodeURIComponent(id)}`,
    );
    return response.data;
  } catch (error: any) {
    if (error.message?.includes("not found")) return null;
    throw error;
  }
}

export async function createMcpServer(
  config: CLIConfig,
  input: McpServerConfigInput,
): Promise<McpServerConfig> {
  const response = await requestJson<{ data: McpServerConfig }>(
    config,
    "POST",
    "/v1/mcp-servers",
    input,
  );
  return response.data;
}

export async function updateMcpServer(
  config: CLIConfig,
  id: string,
  updates: Record<string, unknown>,
): Promise<McpServerConfig> {
  const response = await requestJson<{ data: McpServerConfig }>(
    config,
    "PUT",
    `/v1/mcp-servers/${encodeURIComponent(id)}`,
    updates,
  );
  return response.data;
}

function toIsoString(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString();
  return typeof value === "string" ? value : undefined;
}

export function buildMcpEndpoint(config: CLIConfig, server: McpServerConfig): string {
  return `${baseEndpoint(config)}/mcp/${encodeURIComponent(server.orgId)}/${encodeURIComponent(
    server.name,
  )}`;
}

export function formatMcpServerForCli(
  config: CLIConfig,
  server: McpServerConfig,
  identity?: CliIdentity | null,
): FormattedMcpServer {
  const authMode = server.authMode || "oauth";
  const creatorApiKeyRequired = authMode === "creator_api_key";
  return {
    id: server.id,
    orgId: server.orgId,
    name: server.name,
    displayName: server.displayName,
    description: server.description,
    authMode,
    toolIds: server.toolIds || [],
    createdByUserId: server.createdByUserId,
    createdAt: toIsoString(server.createdAt),
    updatedAt: toIsoString(server.updatedAt),
    connection: {
      endpoint: buildMcpEndpoint(config, server),
      allToolsEndpoint: `${baseEndpoint(config)}/mcp`,
      authMode,
      apiKeyEnv: "SUPERGLUE_API_KEY",
      apiEndpointEnv: "SUPERGLUE_API_ENDPOINT",
      creatorApiKeyRequired,
      configuredApiKeyCanInvoke: creatorApiKeyRequired
        ? Boolean(identity?.userId && server.createdByUserId === identity.userId)
        : true,
    },
  };
}

export function buildMcpClientConfig(server: FormattedMcpServer) {
  const clientServer: Record<string, unknown> = {
    type: "http",
    url: server.connection.endpoint,
  };
  if (server.authMode === "creator_api_key") {
    clientServer.headers = {
      Authorization: "Bearer ${SUPERGLUE_API_KEY}",
    };
  }
  return {
    mcpServers: {
      [server.name]: clientServer,
    },
  };
}

export function parseMcpServerConfig(raw: string): Partial<McpServerConfigInput> {
  const source = raw.trim();
  return JSON.parse(source.startsWith("{") ? source : fs.readFileSync(source, "utf-8"));
}

export function collectToolIds(...values: Array<string[] | string | undefined>): string[] {
  const toolIds = values
    .flatMap((value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      return value.split(",");
    })
    .map((value) => value.trim())
    .filter(Boolean);
  return Array.from(new Set(toolIds));
}

export function compactMcpServer(server: FormattedMcpServer) {
  return {
    id: server.id,
    name: server.name,
    displayName: server.displayName || "",
    authMode: server.authMode,
    toolCount: server.toolIds.length,
    endpoint: server.connection.endpoint,
  };
}
