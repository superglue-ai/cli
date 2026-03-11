import * as fs from "node:fs";
import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import { normalizeToolSchemas } from "@superglue/shared";
import * as jsonpatch from "fast-json-patch";
import type { Operation } from "fast-json-patch";
import type { CLIConfig } from "../../config.js";
import { readDraft, writeDraft } from "../../drafts.js";
import {
  output,
  error,
  confirm,
  renderDiffs,
  success,
  heading,
  spinner,
  colors as c,
} from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerEditCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("edit")
    .description("Edit a tool using JSON Patch operations")
    .option("--draft <id>", "Draft ID to edit")
    .option("--tool <id>", "Saved tool ID to edit")
    .option("--patches <json-or-file>", "JSON Patch array (inline JSON or file path)")
    .option("--payload <json>", "Test payload JSON")
    .option("--test", "Run the patched tool after accepting")
    .action(async (opts) => {
      const { config, client } = getContext();

      if (!opts.draft && !opts.tool) {
        error("Provide --draft or --tool");
        process.exit(1);
      }
      if (!opts.patches) {
        error("--patches is required");
        process.exit(1);
      }

      let patches: Operation[];
      try {
        const raw = fs.existsSync(opts.patches)
          ? fs.readFileSync(opts.patches, "utf-8")
          : opts.patches;
        patches = JSON.parse(raw);
        if (!Array.isArray(patches)) patches = [patches];
      } catch (err: any) {
        error(`Invalid patches: ${err.message}`);
        process.exit(1);
      }

      let originalConfig: any;
      let workingDraftId: string;

      if (opts.tool) {
        try {
          const saved = await client.getWorkflow(opts.tool);
          if (!saved) {
            error(`Tool not found: ${opts.tool}`);
            process.exit(1);
          }
          originalConfig = saved;
          workingDraftId = `fix-${opts.tool}-${Date.now()}`;
        } catch (err: any) {
          error(err.message);
          process.exit(1);
        }
      } else {
        const draft = readDraft(opts.draft);
        if (!draft) {
          error(`Draft not found: ${opts.draft}`);
          process.exit(1);
        }
        originalConfig = draft.config;
        workingDraftId = opts.draft;
      }

      let patchedConfig: any;
      try {
        const copy = JSON.parse(JSON.stringify(originalConfig));
        const result = jsonpatch.applyPatch(copy, patches, true, true);
        patchedConfig = normalizeToolSchemas(result.newDocument || copy);
      } catch (err: any) {
        error(`Patch failed: ${err.message}`);
        process.exit(1);
      }

      const diffs = patches.map((p) => ({
        op: p.op,
        path: p.path,
        ...("value" in p ? { value: (p as any).value } : {}),
        ...("from" in p && (p as any).from ? { from: (p as any).from } : {}),
      }));

      if (process.stdout.isTTY && !process.argv.includes("--json")) {
        heading("Proposed Changes");
        console.log(renderDiffs(diffs));
        console.log("");
      }

      const autoAccept =
        process.argv.includes("--yes") ||
        process.argv.includes("-y") ||
        config.policies.editTool === "auto_accept";

      if (!autoAccept) {
        const accepted = await confirm("Accept changes?");
        if (!accepted) {
          output({ success: false, rejected: true, message: "Changes rejected" });
          process.exit(1);
        }
      }

      const draft = {
        draftId: workingDraftId,
        config: {
          ...patchedConfig,
          instruction: patchedConfig.instruction ?? originalConfig.instruction,
          updatedAt: new Date().toISOString(),
        },
        systemIds: patchedConfig.systemIds || [],
        instruction: patchedConfig.instruction ?? "",
        createdAt: new Date().toISOString(),
      };

      writeDraft(draft);

      if (opts.test) {
        let payload: any;
        try {
          payload = opts.payload ? JSON.parse(opts.payload) : {};
        } catch (err: any) {
          error(`Invalid --payload JSON: ${err.message}`);
          process.exit(1);
        }
        const spin = spinner("Running test...");
        try {
          const testResult = await client.runToolConfig({ tool: draft.config, payload });
          spin.stop();
          if (testResult.success) {
            success("Test passed");
          } else {
            error(`Test failed: ${testResult.error || "Unknown error"}`);
          }
          if (process.argv.includes("--json") || !process.stdout.isTTY) {
            output({
              success: true,
              draftId: workingDraftId,
              diffs,
              testResult: {
                success: testResult.success,
                data: testResult.data,
                error: testResult.error,
              },
            });
          } else {
            output(testResult.data);
          }
        } catch (err: any) {
          spin.stop();
          error(`Test error: ${err.message}`);
          output({
            success: true,
            draftId: workingDraftId,
            diffs,
            testResult: { success: false, error: err.message },
          });
        }
      } else {
        if (process.argv.includes("--json") || !process.stdout.isTTY) {
          output({ success: true, draftId: workingDraftId, diffs });
        } else {
          success(`Draft updated: ${c.bold}${workingDraftId}${c.reset}`);
          console.log("");
        }
      }
    });
}
