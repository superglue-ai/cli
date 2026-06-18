import type { Command } from "commander";
import type { SuperglueClient, ToolSchedule } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { error, isFullMode, isTableMode, output, table } from "../../output.js";
import { formatScheduleError, formatScheduleForCli, getScheduleStatusCounts } from "./helpers.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function parseClampedIntegerOption({
  value,
  defaultValue,
  min,
  max,
}: {
  value?: string;
  defaultValue: number;
  min: number;
  max?: number;
}): number {
  const parsed = parseInt(value ?? "", 10);
  const resolved = Number.isNaN(parsed) ? defaultValue : parsed;
  const minClamped = Math.max(resolved, min);
  return max === undefined ? minClamped : Math.min(minClamped, max);
}

async function listAllSchedules(client: SuperglueClient, toolId?: string): Promise<ToolSchedule[]> {
  const items: ToolSchedule[] = [];
  let page = 1;

  while (true) {
    const response = await client.listToolSchedulesPage({ toolId, limit: 100, page });
    items.push(...response.items);
    if (!response.hasMore || response.items.length === 0) break;
    page += 1;
  }

  return items;
}

export function registerListCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("list")
    .description("List tool schedules")
    .option("--tool <id>", "Filter by tool ID")
    .option("--status <status>", "Filter by status: active, inactive, or all", "all")
    .option("--limit <n>", "Max results", "25")
    .option("--offset <n>", "Skip first N results", "0")
    .action(async (opts) => {
      const { client } = getContext();
      try {
        const limit = parseClampedIntegerOption({
          value: opts.limit,
          defaultValue: 25,
          min: 1,
          max: 100,
        });
        const offset = parseClampedIntegerOption({
          value: opts.offset,
          defaultValue: 0,
          min: 0,
        });
        const status = ["active", "inactive"].includes(opts.status) ? opts.status : "all";

        const allSchedules = await listAllSchedules(client, opts.tool);
        const filteredItems = allSchedules.filter((schedule) => {
          if (status === "active") return schedule.enabled;
          if (status === "inactive") return !schedule.enabled;
          return true;
        });
        const paginatedItems = filteredItems.slice(offset, offset + limit);
        const statusCounts = getScheduleStatusCounts(allSchedules);
        const rows = paginatedItems.map((schedule) => formatScheduleForCli(schedule, isFullMode()));
        const hasMore = offset + paginatedItems.length < filteredItems.length;

        if (isTableMode()) {
          table(rows, ["id", "toolId", "status", "cronExpression", "timezone", "nextRunAt"], {
            total: filteredItems.length,
          });
        } else {
          output({
            success: true,
            total: filteredItems.length,
            hasMore,
            statusCounts,
            items: rows,
          });
        }
      } catch (err: any) {
        error(formatScheduleError(err));
        process.exit(1);
      }
    });
}
