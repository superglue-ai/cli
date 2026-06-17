import { type Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { colors as c, error, isTableMode, output, success } from "../../output.js";
import {
  buildScheduleOptions,
  formatScheduleError,
  formatScheduleForCli,
  hasOptionUpdates,
  parseJsonObjectOption,
} from "./helpers.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerEditCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("edit")
    .description("Edit an existing schedule")
    .requiredOption("--tool <id>", "Saved tool ID that owns the schedule")
    .requiredOption("--id <id>", "Schedule ID")
    .option("--cron <expression>", "New 5-field cron expression")
    .option("--timezone <name>", "New IANA timezone")
    .option("--enabled", "Enable the schedule")
    .option("--disabled", "Disable the schedule")
    .option("--payload <json>", "Replacement JSON object payload")
    .option("--payload-file <path>", "Replacement JSON payload file")
    .option("--options <json-or-file>", "Replacement request options JSON object or file path")
    .option("--options-file <path>", "Replacement request options JSON file")
    .option("--clear-options", "Replace request options with an empty object")
    .option("--webhook-url <url>", "Set webhook URL called after successful execution")
    .option("--tool-chain <toolId>", "Set tool ID to run after successful execution")
    .option("--clear-webhook", "Remove webhook/tool-chain success action from options")
    .option("--retries <n>", "Set retry count, 0-10")
    .option("--timeout <ms>", "Set request timeout in milliseconds")
    .addHelpText(
      "after",
      `
Examples:
  sg schedule edit --tool daily_report --id <scheduleId> --disabled
  sg schedule edit --tool daily_report --id <scheduleId> --cron "0 8 * * *" --timezone UTC
  sg schedule edit --tool import_orders --id <scheduleId> --clear-webhook --retries 2
`,
    )
    .action(async (opts) => {
      const { client } = getContext();
      try {
        if (opts.enabled && opts.disabled) {
          throw new Error("Use either --enabled or --disabled, not both");
        }

        const updates: Record<string, unknown> = {};
        if (opts.cron !== undefined) updates.cronExpression = opts.cron;
        if (opts.timezone !== undefined) updates.timezone = opts.timezone;
        if (opts.enabled) updates.enabled = true;
        if (opts.disabled) updates.enabled = false;

        const payload = parseJsonObjectOption({
          inline: opts.payload,
          file: opts.payloadFile,
          label: "payload",
        });
        if (payload !== undefined) updates.payload = payload;

        if (hasOptionUpdates(opts)) {
          const shouldMergeExistingOptions =
            opts.options === undefined && opts.optionsFile === undefined && !opts.clearOptions;
          const existing = shouldMergeExistingOptions
            ? await client.getToolSchedule(opts.tool, opts.id)
            : null;
          if (shouldMergeExistingOptions && !existing) {
            throw new Error(`Schedule not found: ${opts.id}`);
          }
          updates.options = buildScheduleOptions(opts, existing?.options);
        }

        if (Object.keys(updates).length === 0) {
          throw new Error("Provide at least one field to update");
        }

        const schedule = await client.updateToolSchedule(opts.tool, opts.id, updates);

        if (isTableMode()) {
          success(`Schedule updated: ${c.bold}${schedule.id}${c.reset}`, {
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
