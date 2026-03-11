import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { registerBuildCommand } from "./build.js";
import { registerRunCommand } from "./run.js";
import { registerEditCommand } from "./edit.js";
import { registerSaveCommand } from "./save.js";
import { registerFindCommand } from "./find.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerToolCommands(program: Command, getContext: ContextFn): void {
  const tool = program.command("tool").description("Manage superglue tools");
  registerBuildCommand(tool, getContext);
  registerRunCommand(tool, getContext);
  registerEditCommand(tool, getContext);
  registerSaveCommand(tool, getContext);
  registerFindCommand(tool, getContext);
}
