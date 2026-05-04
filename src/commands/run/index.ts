import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig, CLIPreset } from "../../config.js";
import { registerListCommand } from "./list.js";
import { registerGetCommand } from "./get.js";
import { registerDownloadCommand } from "./download.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerRunCommands(
  program: Command,
  getContext: ContextFn,
  _preset: CLIPreset,
): void {
  const run = program
    .command("run")
    .description("View tool execution runs")
    .addHelpText(
      "after",
      `
Quick Reference:
  sg run list                                List recent runs (default 10)
  sg run list --tool <id> --status failed    Filter by tool and/or status
  sg run list --limit 50                     Adjust page size
  sg run get <runId>                         Get run details (data truncated by default)
  sg run get <runId> --full                  Get complete run data without truncation
  sg run download <runId>                    Download all file artifacts from a run
  sg run download <runId> <fileKey>          Download a specific file artifact

Output: JSON by default. Use --table for human-readable, --full to disable truncation.
`,
    );
  registerListCommand(run, getContext);
  registerGetCommand(run, getContext);
  registerDownloadCommand(run, getContext);
}
