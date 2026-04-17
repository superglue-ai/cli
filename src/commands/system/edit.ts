import { type Command, Option } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, success, spinner, colors as c, warn, isTableMode } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerEditCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("edit")
    .description("Edit an existing system")
    .requiredOption("--id <id>", "System ID")
    .option("--name <name>", "New name")
    .option("--url <url>", "New URL")
    .option("--instructions <text>", "New specific instructions")
    .option("--credentials <json>", "Credentials JSON to merge (all fields including secrets)")
    .option("--scrape-url <url>", "Documentation URL to scrape")
    .option("--scrape-keywords <keywords>", "Space-separated scrape keywords")
    .addOption(
      new Option("--env <environment>", "Environment: dev or prod").choices(["dev", "prod"]),
    )
    .action(async (opts) => {
      const { client } = getContext();

      const patchPayload: any = { id: opts.id };
      if (opts.name) patchPayload.name = opts.name;
      if (opts.url) patchPayload.url = opts.url;
      if (opts.instructions) patchPayload.specificInstructions = opts.instructions;
      if (opts.credentials) {
        try {
          patchPayload.credentials = JSON.parse(opts.credentials);
        } catch (err: any) {
          error(`Invalid --credentials JSON: ${err.message}`);
          process.exit(1);
        }
      }

      try {
        const envOption =
          opts.env === "dev" || opts.env === "prod" ? { environment: opts.env } : undefined;
        const spin = spinner(`Updating system ${c.bold}${opts.id}${c.reset}...`);
        const existing = await client.getSystem(opts.id, envOption);
        if (!existing) {
          spin.stop();
          error(`System not found: ${opts.id}`);
          process.exit(1);
        }

        if (patchPayload.credentials && existing.credentials) {
          patchPayload.credentials = { ...existing.credentials, ...patchPayload.credentials };
        }

        const result = await client.updateSystem(opts.id, patchPayload, envOption);

        if (opts.scrapeUrl) {
          try {
            const keywords = opts.scrapeKeywords?.split(" ").filter(Boolean);
            await client.triggerSystemDocumentationScrapeJob(result.id, {
              url: opts.scrapeUrl,
              keywords,
            });
          } catch (scrapeErr: unknown) {
            const errMsg =
              scrapeErr instanceof Error ? scrapeErr.message : String(scrapeErr || "Unknown error");
            warn(`Documentation scrape failed for ${opts.scrapeUrl}: ${errMsg}`);
          }
        }

        spin.stop();
        if (isTableMode()) {
          success(`System updated: ${c.bold}${result.id}${c.reset}`);
        } else {
          output({ success: true, system: { id: result.id, name: result.name, url: result.url } });
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
