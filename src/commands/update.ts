import type { Command } from "commander";
import { CLI_VERSION, compareVersions, getLatestNpmVersion, updateCli } from "../version.js";
import { output, error, success, spinner, colors as c } from "../output.js";

export function registerUpdateCommand(program: Command): void {
  program
    .command("update")
    .description("Update the superglue CLI to the latest version")
    .option("--check", "Only check for updates, don't install")
    .action(async (opts) => {
      if (opts.check) {
        const spin = spinner("Checking for updates...");
        const latestVersion = await getLatestNpmVersion();
        spin.stop();

        if (!latestVersion) {
          error("Could not fetch latest version from npm");
          process.exit(1);
        }

        const comparison = compareVersions(CLI_VERSION, latestVersion);
        if (comparison >= 0) {
          success(`You're on the latest version (${CLI_VERSION})`);
        } else {
          console.log("");
          console.log(`  ${c.dim}Current version:${c.reset} ${CLI_VERSION}`);
          console.log(`  ${c.green}Latest version:${c.reset}  ${latestVersion}`);
          console.log("");
          console.log(`  Run ${c.bold}sg update${c.reset} to upgrade`);
          console.log("");
        }
        return;
      }

      const spin = spinner("Updating @superglue/cli...");
      const result = await updateCli();
      spin.stop();

      if (result.success) {
        success(result.message);
      } else {
        error(result.message);
        process.exit(1);
      }
    });
}
