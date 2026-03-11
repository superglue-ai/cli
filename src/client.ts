import { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "./config.js";

export function createClient(config: CLIConfig): SuperglueClient {
  if (!config.apiKey) {
    console.error("Error: No API key configured. Run `sg init` or set SUPERGLUE_API_KEY.");
    process.exit(1);
  }
  return new SuperglueClient({
    apiKey: config.apiKey,
    apiEndpoint: config.endpoint,
  });
}
