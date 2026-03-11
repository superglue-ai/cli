import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { readDraft, deleteDraft } from "../../drafts.js";
import { output, error, success, spinner, colors as c } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerSaveCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("save")
    .description("Persist a draft tool to the database")
    .requiredOption("--draft <id>", "Draft ID to save")
    .option("--id <customId>", "Custom ID for the saved tool")
    .action(async (opts) => {
      const { config, client } = getContext();

      const draft = readDraft(opts.draft);
      if (!draft) {
        error(`Draft not found: ${opts.draft}`);
        process.exit(1);
      }

      const toolId = opts.id || draft.config.id;
      try {
        const spin = spinner(`Saving tool ${c.bold}${toolId}${c.reset}...`);
        const saved = await client.upsertWorkflow(toolId, {
          ...draft.config,
          id: toolId,
          systemIds: draft.systemIds,
        });
        deleteDraft(opts.draft);
        spin.stop();
        const apiEndpoint = config.endpoint;
        if (process.argv.includes("--json") || !process.stdout.isTTY) {
          output({
            success: true,
            toolId: saved.id,
            webhookUrl: `${apiEndpoint}/v1/hooks/${saved.id}?token=YOUR_API_KEY`,
          });
        } else {
          success(`Tool saved: ${c.bold}${saved.id}${c.reset}`);
          console.log(`  ${c.dim}webhook:${c.reset} ${apiEndpoint}/v1/hooks/${saved.id}`);
          console.log(`  ${c.dim}draft ${opts.draft} deleted${c.reset}`);
          console.log("");
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
