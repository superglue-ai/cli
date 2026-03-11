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
        const { items } = await client.listWorkflows(100);
        const tools = items.filter((t: any) => !t.archived);
        table(
          tools.map((t: any) => ({
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
        if (searchQuery === "*") {
          const { items } = await client.listWorkflows(100);
          const tools = items
            .filter((t: any) => !t.archived)
            .map((t: any) => ({
              id: t.id,
              instruction: (t.instruction || "").slice(0, 80),
              steps: t.steps?.length || 0,
            }));
          output({ success: true, tools });
        } else {
          const tools = await client.findRelevantTools(searchQuery);
          output({
            success: true,
            tools: tools.map((t: any) => ({
              id: t.id,
              instruction: (t.instruction || "").slice(0, 80),
              steps: t.steps?.length || 0,
            })),
          });
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
