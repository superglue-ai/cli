import { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "./config.js";
import { error } from "./output.js";

export function createClient(config: CLIConfig): SuperglueClient {
  if (!config.apiKey) {
    error("No API key configured. Run `sg init` or set SUPERGLUE_API_KEY.");
    process.exit(1);
  }
  return new SuperglueClient({
    apiKey: config.apiKey,
    apiEndpoint: config.endpoint,
  });
}
