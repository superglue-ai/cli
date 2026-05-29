import { Option, type Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { colors as c, error, isTableMode, output, success } from "../../output.js";
import {
  buildMcpClientConfig,
  collectToolIds,
  formatMcpError,
  formatMcpServerForCli,
  getCliIdentity,
  getMcpServer,
  parseMcpServerConfig,
  updateMcpServer,
} from "./helpers.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

async function buildUpdates(config: CLIConfig, opts: any): Promise<Record<string, unknown>> {
  if (opts.config) {
    return parseMcpServerConfig(opts.config) as Record<string, unknown>;
  }

  const updates: Record<string, unknown> = {};
  if (opts.name !== undefined) updates.name = opts.name;
  if (opts.displayName !== undefined) updates.displayName = opts.displayName;
  if (opts.description !== undefined) updates.description = opts.description;
  if (opts.clearDisplayName) updates.displayName = null;
  if (opts.clearDescription) updates.description = null;
  if (opts.authMode !== undefined) updates.authMode = opts.authMode;

  const replacementToolIdsProvided = opts.tool.length > 0 || opts.tools !== undefined;
  const additiveToolIds = collectToolIds(opts.addTool);
  const removedToolIds = collectToolIds(opts.removeTool);

  if (replacementToolIdsProvided && (additiveToolIds.length > 0 || removedToolIds.length > 0)) {
    throw new Error("Use either --tool/--tools to replace toolIds or --add-tool/--remove-tool.");
  }

  if (replacementToolIdsProvided) {
    updates.toolIds = collectToolIds(opts.tool, opts.tools);
  } else if (additiveToolIds.length > 0 || removedToolIds.length > 0) {
    const existing = await getMcpServer(config, opts.id);
    if (!existing) throw new Error(`MCP server not found: ${opts.id}`);
    const toolIds = new Set(existing.toolIds || []);
    for (const toolId of additiveToolIds) toolIds.add(toolId);
    for (const toolId of removedToolIds) toolIds.delete(toolId);
    updates.toolIds = Array.from(toolIds);
  }

  return updates;
}

export function registerEditCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("edit")
    .description("Edit a named MCP server")
    .requiredOption("--id <id>", "MCP server ID")
    .option("--config <file-or-json>", "Partial MCP server config file or inline JSON")
    .option("--name <name>", "New URL-safe server name")
    .option("--display-name <name>", "New human-readable display name")
    .option("--clear-display-name", "Clear the display name")
    .option("--description <text>", "New description")
    .option("--clear-description", "Clear the description")
    .addOption(
      new Option("--auth-mode <mode>", "Authentication mode").choices(["oauth", "creator_api_key"]),
    )
    .option(
      "--tool <id>",
      "Replacement saved tool ID (repeatable)",
      (value: string, previous: string[]) => {
        previous.push(value);
        return previous;
      },
      [],
    )
    .option("--tools <ids>", "Replacement comma-separated saved tool IDs")
    .option(
      "--add-tool <id>",
      "Add a saved tool ID (repeatable)",
      (value: string, previous: string[]) => {
        previous.push(value);
        return previous;
      },
      [],
    )
    .option(
      "--remove-tool <id>",
      "Remove a saved tool ID (repeatable)",
      (value: string, previous: string[]) => {
        previous.push(value);
        return previous;
      },
      [],
    )
    .addHelpText(
      "after",
      `
Examples:
  sg mcp edit --id <serverId> --add-tool get_customer
  sg mcp edit --id <serverId> --tools get_customer,create_invoice
  sg mcp edit --id <serverId> --auth-mode creator_api_key
`,
    )
    .action(async (opts) => {
      const { config } = getContext();
      try {
        const updates = await buildUpdates(config, opts);
        if (Object.keys(updates).length === 0) {
          error("Provide at least one field to update");
          process.exit(1);
        }

        const updated = await updateMcpServer(config, opts.id, updates);
        const identity = await getCliIdentity(config);
        const server = formatMcpServerForCli(config, updated, identity);

        if (isTableMode()) {
          success(`MCP server updated: ${c.bold}${server.name}${c.reset}`, {
            id: server.id,
            endpoint: server.connection.endpoint,
            authMode: server.authMode,
            tools: server.toolIds.length,
          });
        } else {
          output({
            success: true,
            server,
            clientConfig: buildMcpClientConfig(server),
          });
        }
      } catch (err: any) {
        error(formatMcpError(err));
        process.exit(1);
      }
    });
}
