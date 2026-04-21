import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig, CLIPreset } from "../../config.js";
import { isCommandAllowed, presetBlockedError } from "../../presets.js";
import { error } from "../../output.js";
import { registerBuildCommand } from "./build.js";
import { registerRunCommand } from "./run.js";
import { registerEditCommand } from "./edit.js";
import { registerSaveCommand } from "./save.js";
import { registerFindCommand } from "./find.js";

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

export function registerToolCommands(
  program: Command,
  getContext: ContextFn,
  preset: CLIPreset,
): void {
  const tool = program
    .command("tool")
    .description("Manage superglue tools")
    .addHelpText(
      "after",
      `
Skill Reference:
  Run 'sg skill' for the full tool-building guide (build → run → edit → save workflow).

Quick Reference:
  sg tool build --config <file>              Build a tool from JSON config → returns draftId
  sg tool run --draft <draftId>              Test the draft → returns { success, data }
  sg tool edit --draft <draftId> --patches <json>  Fix issues via JSON Patch
  sg tool save --draft <draftId>             Persist to database → returns toolId + webhookUrl
  sg tool run --tool <toolId>               Run a saved tool
  sg tool list [--limit N]                   List tools (default 25)
  sg tool find <query>                       Search by keyword
  sg tool find --id <toolId>                 Get full tool config

Output: JSON by default. Use --table for human-readable, --full to disable truncation.
`,
    );
  gatedRegister(tool, "build", "tool.build", preset, () => registerBuildCommand(tool, getContext));
  registerRunCommand(tool, getContext, preset);
  gatedRegister(tool, "edit", "tool.edit", preset, () => registerEditCommand(tool, getContext));
  gatedRegister(tool, "save", "tool.save", preset, () => registerSaveCommand(tool, getContext));
  registerFindCommand(tool, getContext);
}
