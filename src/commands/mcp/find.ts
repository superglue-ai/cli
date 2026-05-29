import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { error, output } from "../../output.js";
import {
  buildMcpClientConfig,
  compactMcpServer,
  formatMcpError,
  formatMcpServerForCli,
  getCliIdentity,
  getMcpServer,
  listAllMcpServers,
} from "./helpers.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function matchesQuery(server: any, keywords: string[]): boolean {
  const text = [
    server.id,
    server.name,
    server.displayName,
    server.description,
    ...(server.toolIds || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return keywords.some((keyword) => text.includes(keyword));
}

export function registerFindCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("find [query]")
    .description("Find MCP servers by query, name, or exact ID")
    .option("--id <exactId>", "Exact MCP server ID lookup")
    .option("--name <serverName>", "Exact MCP server name lookup")
    .action(async (query: string | undefined, opts) => {
      const { config } = getContext();
      try {
        const identity = await getCliIdentity(config);
        if (opts.id) {
          const server = await getMcpServer(config, opts.id);
          if (!server) {
            error(`MCP server not found: ${opts.id}`);
            process.exit(1);
          }
          const formatted = formatMcpServerForCli(config, server, identity);
          output({
            success: true,
            server: formatted,
            clientConfig: buildMcpClientConfig(formatted),
          });
          return;
        }

        const data = await listAllMcpServers(config);
        const filtered = (() => {
          if (opts.name) {
            return data.filter((server) => server.name === opts.name);
          }
          const rawQuery = (query || "*").trim();
          if (rawQuery === "*") return data;
          const keywords = rawQuery.toLowerCase().split(/\s+/).filter(Boolean);
          return data.filter((server) => matchesQuery(server, keywords));
        })();

        const formatted = filtered.map((server) => formatMcpServerForCli(config, server, identity));
        output({
          success: true,
          total: formatted.length,
          servers:
            formatted.length === 1
              ? formatted.map((server) => ({
                  ...server,
                  clientConfig: buildMcpClientConfig(server),
                }))
              : formatted.map(compactMcpServer),
        });
      } catch (err: any) {
        error(formatMcpError(err));
        process.exit(1);
      }
    });
}
