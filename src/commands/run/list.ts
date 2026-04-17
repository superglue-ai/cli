import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, table, info, colors as c, isTableMode } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerListCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("list")
    .description("List recent runs")
    .option("--tool <id>", "Filter by tool ID")
    .option("--status <status>", "Filter by status (running, success, failed, aborted)")
    .option("--source <sources>", "Comma-separated request sources")
    .option("--user <userId>", "Filter by user ID")
    .option("--system-id <id>", "Filter by system ID")
    .option("--limit <n>", "Max results", "10")
    .option("--offset <n>", "Skip first N results", "0")
    .action(async (opts) => {
      const { client } = getContext();
      try {
        const limit = Math.min(Math.max(parseInt(opts.limit, 10) || 10, 1), 50);
        const offset = Math.max(parseInt(opts.offset, 10) || 0, 0);
        const page = Math.ceil((offset + 1) / limit);
        const requestSources = opts.source?.split(",").filter(Boolean) as any;

        const result = await client.listRuns({
          toolId: opts.tool,
          limit,
          page,
          status: opts.status as any,
          requestSources,
          userId: opts.user,
          systemId: opts.systemId,
        });

        if (isTableMode()) {
          if (result.total > 0) {
            info(
              `${result.total} total runs${opts.tool ? ` for ${c.bold}${opts.tool}${c.reset}` : ""}`,
            );
          }
          table(
            result.items.map((r: any) => ({
              runId: (r.runId || "").slice(0, 12),
              toolId: r.toolId || "",
              status: r.status || "",
              source: r.requestSource || "",
            })),
            ["runId", "toolId", "status", "source"],
            { total: result.total },
          );
        } else {
          output({
            success: true,
            total: result.total,
            items: result.items.map((r: any) => ({
              runId: r.runId,
              toolId: r.toolId,
              status: r.status,
              requestSource: r.requestSource,
              error: r.error,
            })),
          });
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
