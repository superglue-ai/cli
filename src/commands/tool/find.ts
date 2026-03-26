import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, table } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerFindCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("list")
    .description("List all tools")
    .action(async () => {
      const { client } = getContext();
      try {
        const { items } = await client.listWorkflows(1000);
        table(
          items.map((t: any) => ({
            id: t.id,
            instruction: (t.instruction || "").slice(0, 60),
            steps: t.steps?.length || 0,
          })),
          ["id", "instruction", "steps"],
        );
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });

  parent
    .command("find [query]")
    .description("Find tools by query or exact ID")
    .option("--id <exactId>", "Exact tool ID lookup")
    .action(async (query: string | undefined, opts) => {
      const { client } = getContext();
      try {
        if (opts.id) {
          const tool = await client.getWorkflow(opts.id);
          if (!tool) {
            error(`Tool not found: ${opts.id}`);
            process.exit(1);
          }
          output({ success: true, tool });
          return;
        }
        const searchQuery = (query || "").trim() || "*";
        const { items } = await client.listWorkflows(1000);

        const filtered =
          searchQuery === "*"
            ? items
            : (() => {
                const keywords = searchQuery
                  .toLowerCase()
                  .split(/\s+/)
                  .filter((k: string) => k.length > 0);
                const scored = items.map((t: any) => {
                  const text = [t.id, t.name, t.instruction]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
                  return {
                    tool: t,
                    score: keywords.filter((kw: string) => text.includes(kw)).length,
                  };
                });
                const matches = scored.filter((s: any) => s.score > 0);
                if (matches.length === 0) return items;
                matches.sort((a: any, b: any) => b.score - a.score);
                return matches.map((m: any) => m.tool);
              })();

        output({
          success: true,
          tools: filtered.map((t: any) => ({
            id: t.id,
            instruction: (t.instruction || "").slice(0, 80),
            steps: t.steps?.length || 0,
          })),
        });
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
