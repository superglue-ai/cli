import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig, CLIPreset } from "../../config.js";
import { error } from "../../output.js";
import { isCommandAllowed, presetBlockedError } from "../../presets.js";
import { registerCreateCommand } from "./create.js";
import { registerEditCommand } from "./edit.js";
import { registerFindCommand } from "./find.js";
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

export function registerMcpCommands(
  program: Command,
  getContext: ContextFn,
  preset: CLIPreset,
): void {
  const mcp = program
    .command("mcp")
    .description("Manage named MCP servers")
    .addHelpText(
      "after",
      `
Quick Reference:
  sg mcp list                              List named MCP servers
  sg mcp find --id <id>                    Get full MCP server config and client setup
  sg mcp find <query>                      Search MCP servers by name, description, or tool IDs
  sg mcp create --name <n> --tool <id>     Create a named MCP server
  sg mcp edit --id <id> --add-tool <id>    Add a tool to an MCP server
  sg mcp edit --id <id> --tools <ids>      Replace exposed tool IDs

Setup:
  The CLI needs both the superglue API endpoint and an org-scoped API key.
  Use sg init, SUPERGLUE_API_KEY/SUPERGLUE_API_ENDPOINT, or --api-key/--endpoint.
  For self-hosted instances, never assume the Cloud URL; pass the instance endpoint.

Auth modes:
  oauth            MCP users authenticate through the OAuth-capable client flow.
  creator_api_key  Headless/private clients authenticate with an API key assigned to the creator.

Output: JSON by default. Use --table for human-readable, --full to disable truncation.
`,
    );

  if (isCommandAllowed(preset, "mcp.find")) {
    registerListCommand(mcp, getContext);
    registerFindCommand(mcp, getContext);
  } else {
    for (const name of ["list", "find"]) {
      mcp
        .command(name, { hidden: true })
        .allowUnknownOption()
        .allowExcessArguments(true)
        .action(() => {
          error(presetBlockedError("mcp.find", preset));
          process.exit(1);
        });
    }
  }

  gatedRegister(mcp, "create", "mcp.create", preset, () => registerCreateCommand(mcp, getContext));
  gatedRegister(mcp, "edit", "mcp.edit", preset, () => registerEditCommand(mcp, getContext));
}
