import type { CLIConfig } from "../../config.js";

export type UserCredentialsEnvironmentOption = { environment?: "dev" | "prod" };

export type UserSystemCredentials = {
  userId: string;
  systemId: string;
  environment: "dev" | "prod";
  hasCredentials: boolean;
  credentials: Record<string, unknown>;
  updatedAt?: string;
};

function userCredentialsPath(systemId: string, environment?: "dev" | "prod"): string {
  const query = environment ? `?env=${environment}` : "";
  return `/v1/user-credentials/systems/${encodeURIComponent(systemId)}${query}`;
}

function getApiErrorMessage(errorData: unknown, fallback: string): string {
  if (typeof errorData === "string" && errorData.trim()) return errorData;
  if (!errorData || typeof errorData !== "object") return fallback;

  const body = errorData as { error?: unknown; message?: unknown };
  if (typeof body.message === "string" && body.message.trim()) return body.message;
  if (typeof body.error === "string" && body.error.trim()) return body.error;
  if (body.error && typeof body.error === "object") {
    const error = body.error as { message?: unknown };
    if (typeof error.message === "string" && error.message.trim()) return error.message;
  }

  return fallback;
}

async function userCredentialsRequest(
  config: CLIConfig,
  method: "GET" | "PUT" | "DELETE",
  systemId: string,
  options: UserCredentialsEnvironmentOption = {},
  body?: Record<string, unknown>,
): Promise<UserSystemCredentials> {
  const response = await fetch(
    `${config.endpoint.replace(/\/$/, "")}${userCredentialsPath(systemId, options.environment)}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(getApiErrorMessage(errorData, response.statusText));
  }

  const payload = (await response.json()) as { data: UserSystemCredentials };
  return payload.data;
}

export function getMySystemCredentials(
  config: CLIConfig,
  systemId: string,
  options?: UserCredentialsEnvironmentOption,
): Promise<UserSystemCredentials> {
  return userCredentialsRequest(config, "GET", systemId, options);
}

export function setMySystemCredentials(
  config: CLIConfig,
  systemId: string,
  credentials: Record<string, unknown>,
  options?: UserCredentialsEnvironmentOption,
): Promise<UserSystemCredentials> {
  return userCredentialsRequest(config, "PUT", systemId, options, { credentials });
}

export function deleteMySystemCredentials(
  config: CLIConfig,
  systemId: string,
  options?: UserCredentialsEnvironmentOption,
): Promise<UserSystemCredentials> {
  return userCredentialsRequest(config, "DELETE", systemId, options);
}
