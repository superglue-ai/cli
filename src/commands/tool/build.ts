import * as fs from "node:fs";
import * as crypto from "node:crypto";
import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import { toJsonSchema, convertRequiredToArray } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { writeDraft } from "../../drafts.js";
import { parseFileFlags, resolvePayloadWithFiles } from "../../files.js";
import { output, error, success, colors as c, isTableMode } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerBuildCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("build")
    .description("Build a new superglue tool from a configuration")
    .option("--config <file>", "JSON config file for the tool")
    .option("--id <id>", "Tool ID in kebab-case")
    .option("--instruction <text>", "Brief human-readable tool instruction")
    .option("--steps <file>", "JSON file containing steps array")
    .option("--output-transform <code>", "JS output transform function")
    .option("--output-schema <file>", "JSON file for output schema")
    .option("--payload <json>", "Sample payload JSON")
    .option(
      "--file <key=path...>",
      "File references (key=path)",
      (v: string, arr: string[]) => {
        arr.push(v);
        return arr;
      },
      [],
    )
    .addHelpText(
      "after",
      `
Run 'sg skill' for the full tool-building reference.

Workflow: build → run --draft → edit --draft (if needed) → save --draft
Returns: { success, draftId, toolId, config }
`,
    )
    .action(async (opts) => {
      const { client } = getContext();

      let toolConfig: any;
      if (opts.config) {
        const raw = opts.config.trim();
        toolConfig = raw.startsWith("{")
          ? JSON.parse(raw)
          : JSON.parse(fs.readFileSync(raw, "utf-8"));
      } else {
        toolConfig = {
          id: opts.id,
          instruction: opts.instruction,
          steps: opts.steps ? JSON.parse(fs.readFileSync(opts.steps, "utf-8")) : undefined,
          outputTransform: opts.outputTransform,
          outputSchema: opts.outputSchema
            ? JSON.parse(fs.readFileSync(opts.outputSchema, "utf-8"))
            : undefined,
        };
      }

      if (!toolConfig.id || !toolConfig.instruction || !toolConfig.steps) {
        error("Required: id, instruction, and steps");
        process.exit(1);
      }

      const filePayloads = await parseFileFlags(opts.file, client);
      let payload = opts.payload ? JSON.parse(opts.payload) : undefined;
      if (payload) {
        const fileResult = resolvePayloadWithFiles(payload, filePayloads);
        if (!fileResult.success) {
          error(fileResult.error);
          process.exit(1);
        }
        payload = fileResult.resolved;
      }

      let inputSchema: any;
      if (payload && Object.keys(payload).length > 0) {
        try {
          inputSchema = convertRequiredToArray(
            toJsonSchema(payload, { arrays: { mode: "all" }, required: true }),
          );
        } catch {
          inputSchema = undefined;
        }
      }

      const draftId = `draft_${crypto.randomUUID()}`;
      const draft = {
        draftId,
        config: {
          ...toolConfig,
          inputSchema,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        systemIds: toolConfig.systemIds || [],
        instruction: toolConfig.instruction,
        createdAt: new Date().toISOString(),
      };

      writeDraft(draft);
      if (isTableMode()) {
        success(`Draft created: ${c.bold}${draftId}${c.reset}`);
        console.log(`  ${c.dim}tool:${c.reset}   ${toolConfig.id}`);
        console.log(`  ${c.dim}steps:${c.reset}  ${toolConfig.steps.length}`);
        console.log(
          `\n  ${c.dim}Next: ${c.reset}${c.cyan}sg tool run --draft ${draftId}${c.reset}`,
        );
        console.log("");
      } else {
        output({ success: true, draftId, toolId: toolConfig.id, config: draft.config });
      }
    });
}
