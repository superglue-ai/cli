import { Command } from "commander";
import { resolveConfig } from "./config.js";
import { createClient } from "./client.js";
import { registerInitCommand } from "./commands/init.js";
import { registerToolCommands } from "./commands/tool/index.js";
import { registerSystemCommands } from "./commands/system/index.js";
import { registerRunCommands } from "./commands/run/index.js";
import { registerUpdateCommand } from "./commands/update.js";
import { CLI_VERSION, checkVersionCompatibility } from "./version.js";

const program = new Command();

program
  .name("sg")
  .description("superglue CLI — build, run, and manage integration tools")
  .version(CLI_VERSION)
  .option("--api-key <key>", "superglue API key")
  .option("--endpoint <url>", "superglue API endpoint")
  .option("--json", "force JSON output")
  .option("-y, --yes", "auto-accept all confirmations")
  .addHelpText(
    "after",
    `
All Commands:
  sg init                                     Set up CLI configuration

  sg tool build --config <file>               Build a tool from a JSON config file
  sg tool build --id <id> --instruction <t>   Build a tool from flags (requires --steps <file>)
  sg tool run --draft <id> [--payload <json>] Run a draft tool
  sg tool run --tool <id> [--payload <json>]  Run a saved tool
  sg tool edit --tool <id> --patches <json>   Edit a tool via JSON Patch operations
  sg tool edit --draft <id> --patches <json>  Edit a draft via JSON Patch operations
  sg tool save <id>                           Save a draft tool to the server
  sg tool list                                List all saved tools (IDs + instructions)
  sg tool find [query]                        Search tools by keyword
  sg tool find --id <id>                      Get full config of a specific tool

  sg system create --config <file>            Create a system from a JSON config file
  sg system create --id <id> --url <url>      Create a system from flags
  sg system edit <id>                         Edit a system's configuration
  sg system list                              List all systems
  sg system find [query]                      Search systems by keyword
  sg system find --id <id>                    Get full config of a specific system
  sg system call --url <url> [--method GET]   Call an API/DB/file server with credential injection
  sg system docs <id>                         View system documentation
  sg system oauth <id>                        Authenticate a system via OAuth

  sg run list [toolId]                        List execution runs, optionally filtered by tool
  sg run get <runId>                          Get details of a specific run

  sg update                                   Update CLI to latest version
  sg update --check                           Check for available updates

Global Flags:
  --api-key <key>   Override API key from config
  --endpoint <url>  Override API endpoint from config
  --json            Force JSON output (default in non-TTY)
  -y, --yes         Auto-accept all confirmations
`,
  );

const getContext = () => {
  const opts = program.opts();
  const config = resolveConfig({ apiKey: opts.apiKey, endpoint: opts.endpoint });
  const client = createClient(config);
  return { config, client };
};

registerInitCommand(program);
registerUpdateCommand(program);
registerToolCommands(program, getContext);
registerSystemCommands(program, getContext);
registerRunCommands(program, getContext);

// Check version compatibility before running commands that hit the server
// Note: We manually extract --api-key and --endpoint from argv since program.opts()
// returns empty values before parse() is called
const commandsRequiringServer = ["tool", "system", "run"];
const globalFlagsWithValues = ["--api-key", "--endpoint"];
const globalFlagsNoValue = ["--json", "-y", "--yes", "-h", "--help", "-V", "--version"];

// Find the first subcommand, skipping global flags and their values
function findSubcommand(argv: string[]): string | undefined {
  let i = 2; // skip node and script path
  while (i < argv.length) {
    const arg = argv[i];
    if (globalFlagsWithValues.includes(arg)) {
      i += 2; // skip flag and its value
    } else if (globalFlagsNoValue.includes(arg)) {
      i += 1; // skip flag only
    } else if (arg.startsWith("-")) {
      i += 1; // skip unknown flag
    } else {
      return arg; // found subcommand
    }
  }
  return undefined;
}

const subcommand = findSubcommand(process.argv);
if (subcommand && commandsRequiringServer.includes(subcommand)) {
  const apiKeyIdx = process.argv.indexOf("--api-key");
  const endpointIdx = process.argv.indexOf("--endpoint");
  const cliApiKey = apiKeyIdx !== -1 ? process.argv[apiKeyIdx + 1] : undefined;
  const cliEndpoint = endpointIdx !== -1 ? process.argv[endpointIdx + 1] : undefined;
  const config = resolveConfig({ apiKey: cliApiKey, endpoint: cliEndpoint });
  if (config.apiKey) {
    checkVersionCompatibility(config.endpoint).then(() => program.parse());
  } else {
    program.parse();
  }
} else {
  program.parse();
}
