import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, info, isFullMode } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function truncateField(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  let str: string;
  try {
    str = typeof value === "string" ? value : JSON.stringify(value);
  } catch {
    str = String(value);
  }
  if (str.length <= 500) return value;
  return { _truncated: true, _size: str.length, _preview: str.slice(0, 500) };
}

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
        const full = isFullMode();
        const fileArtifacts = run.fileArtifacts;
        output({
          success: true,
          run: {
            runId: run.runId,
            toolId: run.toolId,
            status: run.status,
            error: run.error,
            toolPayload: full ? run.toolPayload : truncateField(run.toolPayload),
            data: full ? run.data : truncateField(run.data),
            requestSource: run.requestSource,
            ...(run.stepResults
              ? { stepResults: full ? run.stepResults : truncateField(run.stepResults) }
              : {}),
            ...(fileArtifacts && fileArtifacts.length > 0
              ? {
                  fileArtifacts: fileArtifacts.map((f: any) => ({
                    fileKey: f.fileKey,
                    filename: f.filename,
                    contentType: f.contentType,
                    size: f.size,
                  })),
                }
              : {}),
          },
        });
        if (fileArtifacts && fileArtifacts.length > 0) {
          info(
            `${fileArtifacts.length} file(s) available — download with: sg run download ${runId}`,
          );
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
