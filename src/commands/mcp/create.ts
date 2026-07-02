import { Option, type Command } from "commander";
import type { McpServerConfigInput, SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { colors as c, error, isTableMode, output, success } from "../../output.js";
import {
  buildMcpClientConfig,
  collectToolIds,
  createMcpServer,
  formatMcpError,
  formatMcpServerForCli,
  getCliIdentity,
  parseMcpServerConfig,
} from "./helpers.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function parseCreateInput(opts: any): McpServerConfigInput {
  if (opts.config) {
    const parsed = parseMcpServerConfig(opts.config);
    if (!Array.isArray(parsed.toolIds)) {
      throw new Error("MCP server config must include toolIds as an array");
    }
    return parsed as McpServerConfigInput;
  }

  const toolIdsProvided = opts.tool.length > 0 || opts.tools !== undefined;
  if (!toolIdsProvided) {
    throw new Error("At least one tool list is required. Use --tool <id> or --tools <id,id>.");
  }
  return {
    name: opts.name,
    displayName: opts.displayName,
    description: opts.description,
    authMode: opts.authMode,
    toolIds: collectToolIds(opts.tool, opts.tools),
  };
}

export function registerCreateCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("create")
    .description("Create a named MCP server for selected saved tools")
    .option("--config <file-or-json>", "MCP server config file or inline JSON")
    .option("--name <name>", "URL-safe server name")
    .option("--display-name <name>", "Human-readable display name")
    .option("--description <text>", "Description")
    .addOption(
      new Option("--auth-mode <mode>", "Authentication mode")
        .choices(["oauth", "creator_api_key"])
        .default("oauth"),
    )
    .option(
      "--tool <id>",
      "Saved tool ID to expose (repeatable)",
      (value: string, previous: string[]) => {
        previous.push(value);
        return previous;
      },
      [],
    )
    .option("--tools <ids>", "Comma-separated saved tool IDs to expose")
    .addHelpText(
      "after",
      `
Examples:
  sg mcp create --name sales-tools --tool get_customer --tool create_invoice
  sg mcp create --name sales-tools --tools get_customer,create_invoice --auth-mode oauth
  sg mcp create --config mcp-server.json

The CLI uses the configured API endpoint and authentication from sg login, env vars, config.json,
or global flags. For self-hosted instances, set SUPERGLUE_API_ENDPOINT or pass --endpoint.
`,
    )
    .action(async (opts) => {
      const { config } = getContext();
      try {
        const input = parseCreateInput(opts);
        const created = await createMcpServer(config, input);
        const identity = await getCliIdentity(config);
        const server = formatMcpServerForCli(config, created, identity);

        if (isTableMode()) {
          success(`MCP server created: ${c.bold}${server.name}${c.reset}`, {
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
