import * as fs from "node:fs";
import { type Command, Option } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import { systems, slugify, findTemplateForSystem } from "@superglue/shared";
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
    .option(
      "--template <id>",
      "Template ID — auto-fills URL, OAuth config, and credentials. Auto-detected from URL if omitted.",
    )
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
    .addHelpText("after", () => {
      const oauthTemplates = Object.entries(systems)
        .filter(([, t]) => t.oauth)
        .map(([key, t]) => `  ${key.padEnd(24)} ${t.name}`)
        .join("\n");
      return `\nOAuth templates (use with --template or auto-detected from URL):\n${oauthTemplates}\n`;
    })
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

      // Resolve template: explicit --template flag, or auto-detect from URL/name
      let templateKey: string | undefined = opts.template;
      let template: (typeof systems)[string] | undefined;

      if (templateKey) {
        template = systems[templateKey];
        if (!template) {
          error(
            `Template not found: ${templateKey}. Available: ${Object.keys(systems).join(", ")}`,
          );
          process.exit(1);
        }
      } else if (systemInput.url || systemInput.name || systemInput.id) {
        const match = findTemplateForSystem({
          url: systemInput.url,
          name: systemInput.name,
          id: systemInput.id,
        });
        if (match) {
          templateKey = match.key;
          template = match.template;
          if (process.stderr.isTTY) {
            process.stderr.write(
              `${c.dim}Auto-detected template: ${c.bold}${templateKey}${c.reset}${c.dim} (use --template to override)${c.reset}\n`,
            );
          }
        }
      }

      if (template && templateKey) {
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
          templateName: templateKey,
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
            ...(templateKey ? { template: templateKey } : {}),
          });
        } else {
          success(`System created: ${c.bold}${result.id}${c.reset}`, {
            name: result.name,
            url: result.url,
            ...(templateKey ? { template: templateKey } : {}),
          });
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
