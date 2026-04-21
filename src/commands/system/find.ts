import { type Command, Option } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import { findTemplateForSystem, maskCredentialValue } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, table, isTableMode, isFullMode } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function filterSystemFields(system: any) {
  const credentials = system.credentials || {};
  const storedCredentials = Object.fromEntries(
    Object.entries(credentials).map(([key, value]) => [
      key,
      { placeholder: `<<${system.id}_${key}>>`, value: maskCredentialValue(key, value) },
    ]),
  );
  return {
    id: system.id,
    name: system.name,
    url: system.url,
    environment: system.environment,
    specificInstructions: system.specificInstructions,
    storedCredentials: Object.keys(storedCredentials).length > 0 ? storedCredentials : undefined,
  };
}

export function registerFindCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("list")
    .description("List all systems")
    .option("--mode <mode>", "Filter by environment: dev, prod, or all (default: all)")
    .option("--limit <n>", "Max results", "25")
    .option("--offset <n>", "Skip first N results", "0")
    .action(async (opts) => {
      const { client } = getContext();
      try {
        const mode = opts.mode === "dev" || opts.mode === "prod" ? opts.mode : "all";
        const limit = Math.min(Math.max(parseInt(opts.limit, 10) || 25, 1), 100);
        const offset = Math.max(parseInt(opts.offset, 10) || 0, 0);
        const page = Math.floor(offset / limit) + 1;
        const { items: rawItems, total } = await client.listSystems(limit, page, { mode });
        const pageOffset = offset % limit;
        const items = pageOffset > 0 ? rawItems.slice(pageOffset) : rawItems;
        const full = isFullMode();

        const rows = items.map((s: any) => {
          const credentialKeys = Object.keys(s.credentials || {});
          const credPlaceholders = credentialKeys.map((k: string) => `<<${s.id}_${k}>>`).join(", ");
          return {
            id: s.id,
            name: s.name || "",
            env: s.environment || "prod",
            url: full ? s.url || "" : (s.url || "").slice(0, 40),
            credentials: credPlaceholders || "(none)",
          };
        });

        if (isTableMode()) {
          table(rows, ["id", "name", "env", "url", "credentials"], { total });
        } else {
          output({
            success: true,
            total,
            hasMore: offset + items.length < total,
            items: rows,
          });
        }
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
            systems: items.map((s: any) => filterSystemFields(s)),
          });
          return;
        }

        const keywords = rawQuery.toLowerCase().split(/\s+/);
        const filtered = items.filter((s: any) => {
          const text = [s.id, s.name, s.url].filter(Boolean).join(" ").toLowerCase();
          return keywords.some((kw) => text.includes(kw));
        });

        // Always show full details including credentials
        output({
          success: true,
          systems: filtered.map((s: any) => filterSystemFields(s)),
        });
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
