import { type Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { colors as c, error, isTableMode, output, success } from "../../output.js";
import {
  buildScheduleOptions,
  formatScheduleError,
  formatScheduleForCli,
  parseJsonObjectOption,
} from "./helpers.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerCreateCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("create")
    .description("Create a schedule for a saved tool")
    .requiredOption("--tool <id>", "Saved tool ID to schedule")
    .requiredOption("--cron <expression>", "5-field cron expression")
    .requiredOption("--timezone <name>", "IANA timezone, e.g. UTC or Europe/Berlin")
    .option("--disabled", "Create the schedule disabled")
    .option("--payload <json>", "JSON object payload passed to each scheduled run")
    .option("--payload-file <path>", "JSON file payload passed to each scheduled run")
    .option("--options <json-or-file>", "Request options JSON object or file path")
    .option("--options-file <path>", "Request options JSON file")
    .option("--webhook-url <url>", "Webhook URL called after successful execution")
    .option("--tool-chain <toolId>", "Tool ID to run after successful execution")
    .option("--retries <n>", "Retry count, 0-10")
    .option("--timeout <ms>", "Request timeout in milliseconds")
    .addHelpText(
      "after",
      `
Examples:
  sg schedule create --tool daily_report --cron "0 9 * * 1-5" --timezone UTC
  sg schedule create --tool sync_crm --cron "*/15 * * * *" --timezone Europe/Berlin --payload '{"limit":100}'
  sg schedule create --tool import_orders --cron "0 * * * *" --timezone UTC --tool-chain notify_team
`,
    )
    .action(async (opts) => {
      const { client } = getContext();
      try {
        const payload = parseJsonObjectOption({
          inline: opts.payload,
          file: opts.payloadFile,
          label: "payload",
        });
        const options = buildScheduleOptions(opts);
        const schedule = await client.createToolSchedule(opts.tool, {
          cronExpression: opts.cron,
          timezone: opts.timezone,
          enabled: !opts.disabled,
          payload,
          options,
        });

        if (isTableMode()) {
          success(`Schedule created: ${c.bold}${schedule.id}${c.reset}`, {
            toolId: schedule.toolId,
            status: schedule.enabled ? "active" : "inactive",
            nextRunAt: schedule.nextRunAt.toISOString(),
          });
        } else {
          output({ success: true, schedule: formatScheduleForCli(schedule, true) });
        }
      } catch (err: any) {
        error(formatScheduleError(err));
        process.exit(1);
      }
    });
}
