import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, heading, info, colors as c } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

export function registerDocsCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("search-docs")
    .description("Search system documentation by keywords")
    .requiredOption("--system-id <id>", "System ID")
    .requiredOption("-k, --keywords <keywords>", "Search keywords")
    .action(async (opts) => {
      const { client } = getContext();
      try {
        const result = await client.searchSystemDocumentation(opts.systemId, opts.keywords);
        if (!result || result.trim().length === 0) {
          if (process.argv.includes("--json") || !process.stdout.isTTY) {
            output({ success: false, message: "No documentation found for this system" });
          } else {
            info("No documentation found for this system");
          }
        } else if (result.startsWith("No relevant sections found")) {
          if (process.argv.includes("--json") || !process.stdout.isTTY) {
            output({ success: true, noResults: true, message: result, keywords: opts.keywords });
          } else {
            info(result);
          }
        } else {
          if (process.argv.includes("--json") || !process.stdout.isTTY) {
            output({ success: true, content: result, keywords: opts.keywords });
          } else {
            heading(`Documentation: ${opts.systemId}`);
            console.log(`  ${c.dim}Keywords: ${opts.keywords}${c.reset}\n`);
            const lines = result.split("\n");
            for (const line of lines) {
              if (line.startsWith("# ") || line.startsWith("## ") || line.startsWith("### ")) {
                console.log(`  ${c.bold}${c.cyan}${line}${c.reset}`);
              } else if (line.startsWith("```")) {
                console.log(`  ${c.dim}${line}${c.reset}`);
              } else if (line.startsWith("- ") || line.startsWith("* ")) {
                console.log(`  ${c.yellow}•${c.reset} ${line.slice(2)}`);
              } else {
                console.log(`  ${line}`);
              }
            }
            console.log("");
          }
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
