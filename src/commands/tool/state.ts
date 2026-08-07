import * as fs from "node:fs";
import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function parseStateInput(opts: { state?: string; stateFile?: string }): Record<string, unknown> {
  if (!opts.state && !opts.stateFile) {
    error("Provide --state <json> or --state-file <path>");
    process.exit(1);
  }
  if (opts.state && opts.stateFile) {
    error("Only one of --state or --state-file can be used");
    process.exit(1);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(opts.stateFile ? fs.readFileSync(opts.stateFile, "utf-8") : opts.state!);
  } catch (err: any) {
    error(`Invalid state JSON: ${err.message}`);
    process.exit(1);
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    error("State must be a plain JSON object");
    process.exit(1);
  }
  return parsed as Record<string, unknown>;
}

export function registerStateCommand(parent: Command, getContext: ContextFn): void {
  const state = parent
    .command("state")
    .description("Inspect, set, or reset a saved tool's persistent state");

  state
    .command("get <toolId>")
    .description("Show the tool's current persistent state")
    .action(async (toolId: string) => {
      const { client } = getContext();
      try {
        const currentState = await client.getToolState(toolId);
        output({ success: true, toolId, state: currentState });
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });

  state
    .command("set <toolId>")
    .description("Replace the tool's persistent state (full replace)")
    .option("--state <json>", "Replacement state JSON object")
    .option("--state-file <path>", "Replacement state JSON file")
    .addHelpText(
      "after",
      `
Replaces all keys, subject to the same key and size limits as run-time state writes.
Keys changed by a concurrent run between read and write are reported as warnings.
State is stored unencrypted; never put credential values in it.
`,
    )
    .action(async (toolId: string, opts) => {
      const { client } = getContext();
      const nextState = parseStateInput(opts);
      try {
        const warnings = await client.setToolState(toolId, nextState);
        output({
          success: true,
          toolId,
          keyCount: Object.keys(nextState).length,
          ...(warnings.length > 0 ? { warnings } : {}),
        });
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });

  state
    .command("reset <toolId>")
    .description("Delete all persistent state keys so the next run cold-starts")
    .action(async (toolId: string) => {
      const { client } = getContext();
      try {
        const deletedKeys = await client.deleteToolState(toolId);
        output({ success: true, toolId, deletedKeys });
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
