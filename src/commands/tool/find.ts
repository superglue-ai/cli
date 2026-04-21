import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, table, isTableMode, isFullMode } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerFindCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("list")
    .description("List all tools")
    .option("--limit <n>", "Max results", "25")
    .option("--offset <n>", "Skip first N results", "0")
    .action(async (opts) => {
      const { client } = getContext();
      try {
        const limit = Math.min(Math.max(parseInt(opts.limit, 10) || 25, 1), 100);
        const offset = Math.max(parseInt(opts.offset, 10) || 0, 0);
        const { items, total } = await client.listWorkflows(limit, offset);
        const full = isFullMode();
        const rows = items.map((t: any) => ({
          id: t.id,
          instruction: full ? t.instruction || "" : (t.instruction || "").slice(0, 60),
          steps: t.steps?.length || 0,
        }));
        if (isTableMode()) {
          table(rows, ["id", "instruction", "steps"], { total });
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
                matches.sort((a: any, b: any) => b.score - a.score);
                return matches.map((m: any) => m.tool);
              })();

        const full = isFullMode();
        output({
          success: true,
          total: filtered.length,
          items: filtered.map((t: any) => ({
            id: t.id,
            instruction: full ? t.instruction || "" : (t.instruction || "").slice(0, 80),
            steps: t.steps?.length || 0,
          })),
        });
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
