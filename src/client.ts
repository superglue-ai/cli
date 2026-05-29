import { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "./config.js";
import { error } from "./output.js";

export function createClient(config: CLIConfig): SuperglueClient {
  if (!config.apiKey) {
    error(
      "No API key configured. Run `sg init`, set SUPERGLUE_API_KEY, or pass --api-key. For custom/self-hosted instances, also set SUPERGLUE_API_ENDPOINT or pass --endpoint.",
    );
    process.exit(1);
  }
  return new SuperglueClient({
    apiKey: config.apiKey,
    apiEndpoint: config.endpoint,
  });
}
