import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerGetCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("get <runId>")
    .description("Get details of a specific run")
    .action(async (runId: string) => {
      const { client } = getContext();
      try {
        const run = await client.getRun(runId);
        if (!run) {
          error(`Run not found: ${runId}`);
          process.exit(1);
        }
        output({
          success: true,
          run: {
            runId: run.runId,
            toolId: run.toolId,
            status: run.status,
            error: run.error,
            toolPayload: run.toolPayload,
            data: run.data,
            requestSource: run.requestSource,
            ...(run.stepResults ? { stepResults: run.stepResults } : {}),
          },
        });
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
