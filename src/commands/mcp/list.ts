import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { error, isTableMode, output, table } from "../../output.js";
import {
  compactMcpServer,
  formatMcpError,
  formatMcpServerForCli,
  getCliIdentity,
  listMcpServers,
} from "./helpers.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerListCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("list")
    .description("List named MCP servers")
    .option("--limit <n>", "Max results", "25")
    .option("--offset <n>", "Skip first N results", "0")
    .action(async (opts) => {
      const { config } = getContext();
      try {
        const limit = Math.min(Math.max(parseInt(opts.limit, 10) || 25, 1), 100);
        const offset = Math.max(parseInt(opts.offset, 10) || 0, 0);
        const [result, identity] = await Promise.all([
          listMcpServers(config, { limit, offset }),
          getCliIdentity(config),
        ]);
        const items = result.data.map((server) =>
          compactMcpServer(formatMcpServerForCli(config, server, identity)),
        );

        if (isTableMode()) {
          table(items, ["id", "name", "authMode", "toolCount", "endpoint"], {
            total: result.total,
          });
        } else {
          output({
            success: true,
            total: result.total,
            hasMore: result.hasMore,
            items,
          });
        }
      } catch (err: any) {
        error(formatMcpError(err));
        process.exit(1);
      }
    });
}
