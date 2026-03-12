import { type Command, Option } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import { findTemplateForSystem } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, table } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function filterSystemFields(system: any) {
  const credentialKeys = Object.keys(system.credentials || {});
  return {
    id: system.id,
    name: system.name,
    url: system.url,
    environment: system.environment,
    specificInstructions: system.specificInstructions,
    credentialPlaceholders: credentialKeys.map((k: string) => `<<${system.id}_${k}>>`),
  };
}

export function registerFindCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("list")
    .description("List all systems")
    .option("--mode <mode>", "Filter by environment: dev, prod, or all (default: all)")
    .action(async (opts) => {
      const { client } = getContext();
      try {
        const mode = opts.mode === "dev" || opts.mode === "prod" ? opts.mode : "all";
        const { items } = await client.listSystems(100, 1, { mode });
        table(
          items.map((s: any) => ({
            id: s.id,
            name: s.name || "",
            env: s.environment || "prod",
            url: (s.url || "").slice(0, 50),
          })),
          ["id", "name", "env", "url"],
        );
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });

  parent
    .command("find [query]")
    .description("Find systems by query or exact ID")
    .option("--id <exactId>", "Exact system ID lookup")
    .addOption(
      new Option("--env <environment>", "Environment: dev or prod").choices(["dev", "prod"]),
    )
    .action(async (query: string | undefined, opts) => {
      const { client } = getContext();
      try {
        if (opts.id) {
          const envOption =
            opts.env === "dev" || opts.env === "prod" ? { environment: opts.env } : undefined;
          const system = await client.getSystem(opts.id, envOption);
          if (!system) {
            error(`System not found: ${opts.id}`);
            process.exit(1);
          }
          const templateMatch = findTemplateForSystem(system);
          output({
            success: true,
            system: filterSystemFields(system),
            template: templateMatch?.template || null,
          });
          return;
        }

        const listMode = opts.env ? { mode: opts.env as "dev" | "prod" } : undefined;
        const rawQuery = (query || "*").trim();
        const { items } = await client.listSystems(100, 1, listMode);

        if (rawQuery === "*") {
          output({
            success: true,
            systems: items.map((s: any) => ({ id: s.id, name: s.name, url: s.url })),
          });
          return;
        }

        const keywords = rawQuery.toLowerCase().split(/\s+/);
        const filtered = items.filter((s: any) => {
          const text = [s.id, s.name, s.url].filter(Boolean).join(" ").toLowerCase();
          return keywords.some((kw) => text.includes(kw));
        });

        output({
          success: true,
          systems: filtered.map((s: any) => ({ id: s.id, name: s.name, url: s.url })),
        });
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
