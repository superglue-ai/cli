import { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "./config.js";
import { error } from "./output.js";
import { createOAuthTokenProvider } from "./auth.js";

export function createClient(config: CLIConfig): SuperglueClient {
  if (config.apiKey) {
    return new SuperglueClient({
      apiKey: config.apiKey,
      apiEndpoint: config.endpoint,
    });
  }

  const tokenProvider = createOAuthTokenProvider(config);
  if (!tokenProvider) {
    error(
      "No authentication configured. Run `sg login`. For headless/API-key auth, set SUPERGLUE_API_KEY or pass --api-key. For custom/self-hosted instances, also set SUPERGLUE_API_ENDPOINT or pass --endpoint.",
    );
    process.exit(1);
  }

  return new SuperglueClient({
    tokenProvider,
    apiEndpoint: config.endpoint,
  });
}
