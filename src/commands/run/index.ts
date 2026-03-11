import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { registerListCommand } from "./list.js";
import { registerGetCommand } from "./get.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerRunCommands(program: Command, getContext: ContextFn): void {
  const run = program.command("run").description("View tool execution runs");
  registerListCommand(run, getContext);
  registerGetCommand(run, getContext);
}
