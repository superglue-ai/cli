import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, table, info, colors as c } from "../../output.js";

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
    .option("--search <text>", "Full-text search")
    .action(async (opts) => {
      const { client } = getContext();
      try {
        const limit = Math.min(parseInt(opts.limit, 10) || 10, 50);
        const offset = parseInt(opts.offset, 10) || 0;
        const page = Math.floor(offset / limit) + 1;
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

        if (process.argv.includes("--json") || !process.stdout.isTTY) {
          output({
            success: true,
            total: result.total,
            runs: result.items.map((r: any) => ({
              runId: r.runId,
              toolId: r.toolId,
              status: r.status,
              requestSource: r.requestSource,
              error: r.error,
            })),
          });
        } else {
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
          );
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
