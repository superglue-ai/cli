import type { Command } from "commander";
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
    specificInstructions: system.specificInstructions,
    credentialPlaceholders: credentialKeys.map((k: string) => `<<${system.id}_${k}>>`),
  };
}

export function registerFindCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("list")
    .description("List all systems")
    .action(async () => {
      const { client } = getContext();
      try {
        const { items } = await client.listSystems(100);
        table(
          items.map((s: any) => ({
            id: s.id,
            name: s.name || "",
            url: (s.url || "").slice(0, 50),
          })),
          ["id", "name", "url"],
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
    .action(async (query: string | undefined, opts) => {
      const { client } = getContext();
      try {
        if (opts.id) {
          const system = await client.getSystem(opts.id);
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

        const rawQuery = (query || "*").trim();
        const { items } = await client.listSystems(100);

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
