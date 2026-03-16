import * as fs from "node:fs";
import { type Command, Option } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import { systems, slugify } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, promptHidden, success, spinner, colors as c } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

async function collectSensitiveCredentials(fields: string[]): Promise<Record<string, string>> {
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
  return creds;
}

export function registerCreateCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("create")
    .description("Create a new system")
    .option("--config <file>", "JSON config file")
    .option("--id <id>", "System ID (derived from name if omitted)")
    .option("--name <name>", "Human-readable name (required)")
    .option("--url <url>", "API URL")
    .option("--template <id>", "Template ID")
    .option("--instructions <text>", "Specific instructions")
    .option("--credentials <json>", "Non-sensitive credentials JSON")
    .option("--sensitive-credentials <fields>", "Comma-separated sensitive credential field names")
    .option("--docs-url <url>", "Documentation URL to scrape")
    .option("--openapi-url <url>", "OpenAPI spec URL")
    .addOption(
      new Option("--env <environment>", "Environment: dev or prod (default: prod)").choices([
        "dev",
        "prod",
      ]),
    )
    .action(async (opts) => {
      const { client } = getContext();

      let systemInput: any;
      if (opts.config) {
        try {
          const parsed = JSON.parse(fs.readFileSync(opts.config, "utf-8"));
          // Allow --env to override config file environment
          if (opts.env === "dev" || opts.env === "prod") {
            parsed.environment = opts.env;
          }
          systemInput = parsed;
        } catch (err: any) {
          error(`Invalid config file: ${err.message}`);
          process.exit(1);
        }
      } else {
        let credentials: any;
        if (opts.credentials) {
          try {
            credentials = JSON.parse(opts.credentials);
          } catch (err: any) {
            error(`Invalid --credentials JSON: ${err.message}`);
            process.exit(1);
          }
        }
        systemInput = {
          id: opts.id,
          name: opts.name,
          url: opts.url,
          specificInstructions: opts.instructions,
          credentials,
          environment: opts.env === "dev" || opts.env === "prod" ? opts.env : undefined,
        };
      }

      if (opts.template) {
        const template = systems[opts.template];
        if (!template) {
          error(
            `Template not found: ${opts.template}. Available: ${Object.keys(systems).join(", ")}`,
          );
          process.exit(1);
        }
        const oauthCreds: Record<string, any> = {};
        if (template.oauth) {
          if (template.oauth.authUrl) oauthCreds.auth_url = template.oauth.authUrl;
          if (template.oauth.tokenUrl) oauthCreds.token_url = template.oauth.tokenUrl;
          if (template.oauth.scopes) oauthCreds.scopes = template.oauth.scopes;
          if (template.oauth.client_id) oauthCreds.client_id = template.oauth.client_id;
        }
        systemInput = {
          ...systemInput,
          name: systemInput.name || template.name,
          url: systemInput.url || template.apiUrl,
          templateName: opts.template,
          credentials: { ...oauthCreds, ...systemInput.credentials },
        };
      }

      if (opts.sensitiveCredentials) {
        const fields = opts.sensitiveCredentials
          .split(",")
          .map((f: string) => f.trim())
          .filter(Boolean);
        const sensitive = await collectSensitiveCredentials(fields);
        systemInput.credentials = { ...systemInput.credentials, ...sensitive };
      }

      if (typeof systemInput.name !== "string" || systemInput.name.trim() === "") {
        error("System name is required (--name)");
        process.exit(1);
      }
      if (!systemInput.id) {
        systemInput.id = slugify(systemInput.name.trim());
        if (!systemInput.id) {
          error("System ID could not be derived from name; use --id with letters or numbers");
          process.exit(1);
        }
      }

      try {
        const spin = spinner(`Creating system ${c.bold}${systemInput.id}${c.reset}...`);
        const result = await client.createSystem(systemInput);
        spin.stop();

        if (opts.docsUrl) {
          try {
            await client.triggerSystemDocumentationScrapeJob(result.id, { url: opts.docsUrl });
          } catch {}
        }
        if (opts.openapiUrl) {
          try {
            await client.fetchOpenApiSpec(result.id, opts.openapiUrl);
          } catch {}
        }

        if (process.argv.includes("--json") || !process.stdout.isTTY) {
          output({
            success: true,
            system: { id: result.id, name: result.name, url: result.url },
          });
        } else {
          success(`System created: ${c.bold}${result.id}${c.reset}`, {
            name: result.name,
            url: result.url,
          });
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
