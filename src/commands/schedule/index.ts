import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig, CLIPreset } from "../../config.js";
import { error } from "../../output.js";
import { isCommandAllowed, presetBlockedError } from "../../presets.js";
import { registerCreateCommand } from "./create.js";
import { registerEditCommand } from "./edit.js";
import { registerListCommand } from "./list.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function gatedRegister(
  parent: Command,
  name: string,
  presetKey: string,
  preset: CLIPreset,
  register: () => void,
): void {
  if (isCommandAllowed(preset, presetKey)) {
    register();
  } else {
    parent
      .command(name, { hidden: true })
      .allowUnknownOption()
      .allowExcessArguments(true)
      .action(() => {
        error(presetBlockedError(presetKey, preset));
        process.exit(1);
      });
  }
}

export function registerScheduleCommands(
  program: Command,
  getContext: ContextFn,
  preset: CLIPreset,
): void {
  const schedule = program
    .command("schedule")
    .description("Manage saved tool schedules")
    .addHelpText(
      "after",
      `
Quick Reference:
  sg schedule list                              List schedules (default 25)
  sg schedule list --tool <id>                  List schedules for a saved tool
  sg schedule create --tool <id> --cron <expr>  Create a cron schedule
  sg schedule edit --tool <id> --id <schedule>  Edit, enable, or disable a schedule

Examples:
  sg schedule create --tool daily_report --cron "0 9 * * 1-5" --timezone UTC
  sg schedule edit --tool daily_report --id <scheduleId> --disabled

Output: JSON by default. Use --table for human-readable, --full to include payload/options in lists.
`,
    );

  gatedRegister(schedule, "list", "schedule.list", preset, () =>
    registerListCommand(schedule, getContext),
  );
  gatedRegister(schedule, "create", "schedule.create", preset, () =>
    registerCreateCommand(schedule, getContext),
  );
  gatedRegister(schedule, "edit", "schedule.edit", preset, () =>
    registerEditCommand(schedule, getContext),
  );
}
