import * as fs from "node:fs";
import * as path from "node:path";
import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { readDraft } from "../../drafts.js";
import { parseFileFlags, resolvePayloadWithFiles } from "../../files.js";
import { output, error, success, spinner, colors as c } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerRunCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("run")
    .description("Execute a draft or saved tool")
    .option("--draft <id>", "Draft ID from build")
    .option("--tool <id>", "Saved tool ID")
    .option("--payload <json>", "JSON payload")
    .option("--payload-file <path>", "JSON payload file")
    .option(
      "--file <key=path...>",
      "File references",
      (v: string, arr: string[]) => {
        arr.push(v);
        return arr;
      },
      [],
    )
    .option("--include-step-results", "Include raw step results")
    .option("--include-config", "Include full tool config")
    .action(async (opts) => {
      const { config, client } = getContext();

      if (!opts.draft && !opts.tool) {
        error("Provide --draft or --tool");
        process.exit(1);
      }

      const filePayloads = await parseFileFlags(opts.file, client);
      let payload = opts.payloadFile
        ? JSON.parse(fs.readFileSync(opts.payloadFile, "utf-8"))
        : opts.payload
          ? JSON.parse(opts.payload)
          : undefined;

      if (payload) {
        const fileResult = resolvePayloadWithFiles(payload, filePayloads);
        if (!fileResult.success) {
          error(fileResult.error);
          process.exit(1);
        }
        payload = fileResult.resolved;
      }

      let result: any;
      const toolLabel = opts.tool || opts.draft;
      const spin = spinner(`Running ${c.bold}${toolLabel}${c.reset}...`);

      if (opts.tool) {
        try {
          result = await client.runTool({ toolId: opts.tool, payload });
          spin.stop();
        } catch (err: any) {
          spin.stop();
          error(err.message);
          process.exit(1);
        }
      } else {
        const draft = readDraft(opts.draft);
        if (!draft) {
          spin.stop();
          error(`Draft not found: ${opts.draft}`);
          process.exit(1);
        }
        try {
          result = await client.runToolConfig({ tool: draft.config, payload });
          spin.stop();
        } catch (err: any) {
          spin.stop();
          error(err.message);
          process.exit(1);
        }
      }

      const out: any = {
        success: result.success,
        data: result.data,
        ...(result.error ? { error: result.error } : {}),
        ...(opts.includeStepResults && result.stepResults
          ? { stepResults: result.stepResults }
          : {}),
        ...(opts.includeConfig && result.tool ? { config: result.tool } : {}),
      };

      output(out);

      if (config.output.mode === "stdout+file") {
        const outDir = path.resolve(config.output.directory);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        const rawId = opts.tool || opts.draft;
        const safeId = path.basename(rawId).replace(/[^a-zA-Z0-9_-]/g, "_");
        const filename = `${safeId}-${Date.now()}.json`;
        fs.writeFileSync(path.join(outDir, filename), JSON.stringify(out, null, 2));
      }

      if (!result.success) process.exit(1);
    });
}
