import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { registerCreateCommand } from "./create.js";
import { registerEditCommand } from "./edit.js";
import { registerFindCommand } from "./find.js";
import { registerCallCommand } from "./call.js";
import { registerDocsCommand } from "./docs.js";
import { registerOAuthCommand } from "./oauth.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerSystemCommands(program: Command, getContext: ContextFn): void {
  const system = program.command("system").description("Manage superglue systems");
  registerCreateCommand(system, getContext);
  registerEditCommand(system, getContext);
  registerFindCommand(system, getContext);
  registerCallCommand(system, getContext);
  registerDocsCommand(system, getContext);
  registerOAuthCommand(system, getContext);
}
