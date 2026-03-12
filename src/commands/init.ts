import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import type { Command } from "commander";
import { SuperglueClient } from "@superglue/shared";
import { type CLIConfig, getConfigDir, writeConfig, ensureConfigDirs } from "../config.js";
import {
  banner,
  success,
  error,
  info,
  heading,
  prompt,
  promptHidden,
  choose,
  spinner,
  link,
  colors as c,
} from "../output.js";

export function registerInitCommand(program: Command): void {
  program
    .command("init")
    .description("Set up superglue CLI configuration")
    .action(async () => {
      banner();
      console.log(`  ${c.bold}Welcome to the superglue CLI setup!${c.reset}`);
      console.log(`  ${c.dim}Let's get you connected in a few steps.${c.reset}\n`);

      heading("Authentication");
      console.log(
        `  ${c.dim}Get your API key at${c.reset} ${link("https://app.superglue.cloud/admin?view=api-keys")}`,
      );
      console.log("");
      const apiKey = await promptHidden("  API Key");
      if (!apiKey) {
        error("API key is required");
        process.exit(1);
      }

      const endpoint = await prompt("  API Endpoint", "https://api.superglue.cloud");
      const defaultWeb = endpoint
        .replace(/:3002\b/, ":3001")
        .replace(/api\.superglue/, "app.superglue");
      const webEndpoint = await prompt("  Web Endpoint (for OAuth callbacks)", defaultWeb);

      const spin = spinner("Verifying connection...");
      try {
        const client = new SuperglueClient({ apiKey, apiEndpoint: endpoint });
        await client.listSystems(1);
        spin.stop(`${c.green}✓${c.reset} Connected to ${c.bold}${endpoint}${c.reset}`);
      } catch (err: any) {
        spin.stop(`${c.red}✗${c.reset} Connection failed`);
        error(err.message);
        process.exit(1);
      }

      heading("Output Preferences");
      const outputModeIdx = await choose(
        "Output mode",
        [
          "stdout only — print results to terminal",
          "stdout + file — also save results as JSON files",
        ],
        0,
      );
      const outputMode = outputModeIdx === 1 ? ("stdout+file" as const) : ("stdout" as const);

      let outputDir = ".superglue/output";
      if (outputMode === "stdout+file") {
        outputDir = await prompt("  Output directory", ".superglue/output");
      }

      heading("Config Location");
      const homeDir = os.homedir();
      const localPath = path.join(process.cwd(), ".superglue");
      const globalPath = path.join(homeDir, ".superglue");
      const configLocationIdx = await choose(
        "Where to save config?",
        [
          `Project (${localPath}) — config stays with this project`,
          `Global (${globalPath}) — shared across all projects`,
        ],
        0,
      );
      const preferLocal = configLocationIdx === 0;

      const config: CLIConfig = {
        apiKey,
        endpoint,
        webEndpoint,
        output: { mode: outputMode, directory: outputDir },
      };

      writeConfig(config, preferLocal);
      ensureConfigDirs(config, preferLocal);

      const configDir = getConfigDir(preferLocal);
      const configRelPath = preferLocal
        ? ".superglue/config.json"
        : path.join(configDir, "config.json");

      // Update .gitignore for local paths that might be generated
      const gitignorePath = path.join(process.cwd(), ".gitignore");
      const ignoreEntries: string[] = [];

      // Always ignore output directory if it's local (stdout+file mode)
      if (outputMode === "stdout+file" && !path.isAbsolute(outputDir)) {
        ignoreEntries.push(`${outputDir}/`);
      }

      // Only ignore .superglue/ paths for local config
      if (preferLocal) {
        ignoreEntries.push(".superglue/drafts/", ".superglue/config.json");
      }

      if (ignoreEntries.length > 0) {
        if (fs.existsSync(gitignorePath)) {
          const existing = fs.readFileSync(gitignorePath, "utf-8");
          const toAdd = ignoreEntries.filter((e) => !existing.includes(e));
          if (toAdd.length > 0) {
            fs.appendFileSync(gitignorePath, "\n# superglue CLI\n" + toAdd.join("\n") + "\n");
            info("Updated .gitignore");
          }
        } else if (preferLocal) {
          // Only create .gitignore if using local config
          fs.writeFileSync(gitignorePath, "# superglue CLI\n" + ignoreEntries.join("\n") + "\n");
          info("Created .gitignore");
        }
      }

      console.log("");
      success(`Config saved to ${c.bold}${configRelPath}${c.reset}`);
      if (preferLocal) {
        success(`Created ${c.bold}.superglue/drafts/${c.reset}`);
      }
      if (outputMode === "stdout+file") {
        success(`Created ${c.bold}${outputDir}/${c.reset}`);
      }
      console.log("");
      console.log(`  ${c.bold}You're all set!${c.reset} Try these commands:\n`);
      console.log(
        `    ${c.cyan}sg system list${c.reset}    ${c.dim}— see your connected systems${c.reset}`,
      );
      console.log(
        `    ${c.cyan}sg tool list${c.reset}      ${c.dim}— see your saved tools${c.reset}`,
      );
      console.log(
        `    ${c.cyan}sg run list${c.reset}       ${c.dim}— see recent executions${c.reset}`,
      );
      console.log("");
    });
}
