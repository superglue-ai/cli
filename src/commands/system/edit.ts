import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, promptHidden, success, spinner, colors as c, warn } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerEditCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("edit")
    .description("Edit an existing system")
    .requiredOption("--id <id>", "System ID")
    .option("--env <environment>", "Environment: dev or prod")
    .option("--name <name>", "New name")
    .option("--url <url>", "New URL")
    .option("--instructions <text>", "New specific instructions")
    .option("--credentials <json>", "Non-sensitive credentials JSON to merge")
    .option("--sensitive-credentials <fields>", "Comma-separated sensitive credential field names")
    .option("--scrape-url <url>", "Documentation URL to scrape")
    .option("--scrape-keywords <keywords>", "Space-separated scrape keywords")
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

      if (opts.sensitiveCredentials) {
        const fields = opts.sensitiveCredentials
          .split(",")
          .map((f: string) => f.trim())
          .filter(Boolean);
        const creds: Record<string, string> = {};
        for (const field of fields) {
          const envKey = `SUPERGLUE_CRED_${field.toUpperCase()}`;
          const envVal = process.env[envKey];
          if (envVal) {
            creds[field] = envVal;
          } else if (process.stdin.isTTY) {
            creds[field] = await promptHidden(`  Enter ${field}`);
          } else {
            error(`Missing credential: ${field}. Set ${envKey} or use interactive mode.`);
            process.exit(1);
          }
        }
        patchPayload.credentials = { ...patchPayload.credentials, ...creds };
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
        if (process.argv.includes("--json") || !process.stdout.isTTY) {
          output({ success: true, system: { id: result.id, name: result.name, url: result.url } });
        } else {
          success(`System updated: ${c.bold}${result.id}${c.reset}`);
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
