import { Command, Option } from "commander";
import { resolveConfig, type CLIPreset } from "./config.js";
import { createClient } from "./client.js";
import { registerInitCommand } from "./commands/init.js";
import { registerToolCommands } from "./commands/tool/index.js";
import { registerSystemCommands } from "./commands/system/index.js";
import { registerMcpCommands } from "./commands/mcp/index.js";
import { registerRunCommands } from "./commands/run/index.js";
import { registerScheduleCommands } from "./commands/schedule/index.js";
import { registerUpdateCommand } from "./commands/update.js";
import { registerSkillCommand } from "./commands/skill.js";
import {
  CLI_VERSION,
  checkVersionCompatibility,
  startBackgroundUpdateCheck,
  printUpdateNotification,
} from "./version.js";

function findSubcommand(argv: string[]): string | undefined {
  const globalFlagsWithValues = ["--api-key", "--endpoint"];
  const globalFlagsNoValue = ["--table", "--full", "--json", "-h", "--help", "-V", "--version"];
  let i = 2;
  while (i < argv.length) {
    const arg = argv[i];
    if (globalFlagsWithValues.includes(arg)) {
      i += 2;
    } else if (globalFlagsNoValue.includes(arg)) {
      i += 1;
    } else if (arg.startsWith("-")) {
      i += 1;
    } else {
      return arg;
    }
  }
  return undefined;
}

function extractFlagValue(argv: string[], flag: string): string | undefined {
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith(`${flag}=`)) {
      return arg.slice(flag.length + 1);
    }
    if (arg === flag && i + 1 < argv.length) {
      return argv[i + 1];
    }
  }
  return undefined;
}

const program = new Command();

program
  .name("sg")
  .description("superglue CLI — build, run, and manage integration tools and MCP servers")
  .version(CLI_VERSION)
  .option("--api-key <key>", "superglue API key")
  .option("--endpoint <url>", "superglue API endpoint")
  .option("--table", "human-readable table output (default: JSON)")
  .option("--full", "disable truncation of large fields")
  .addOption(new Option("--json").hideHelp())
  .addHelpText(
    "after",
    `
IMPORTANT FOR AI AGENTS:
  Before using the sg CLI, you MUST read the skill reference for complete usage
  instructions, patterns, and examples:

    sg skill                        Print the main SKILL.md reference
    sg skill superglue-info         superglue interfaces, company info, UI layout, internals
    sg skill integration            SDK/REST/webhook integration patterns
    sg skill http                   HTTP step configuration, auth, pagination
    sg skill graphql                GraphQL step configuration and schema introspection
    sg skill postgres               PostgreSQL step configuration and schema introspection
    sg skill mssql                  MSSQL / Azure SQL step configuration
    sg skill redis                  Redis commands and connection patterns
    sg skill sftp-smb               SFTP, FTP, and SMB step configuration
    sg skill file-handling          File detection, parsing, references, uploads
    sg skill access-rules           RBAC roles, tool/system permissions (enterprise)

  The main skill reference covers: tool building, system setup, OAuth flows,
  credential handling, variable syntax, data selectors, and common pitfalls.
  The CLI must know the target superglue API endpoint and an org-scoped API key:
  use sg init, SUPERGLUE_API_KEY/SUPERGLUE_API_ENDPOINT, or --api-key/--endpoint.
  DO NOT attempt to use sg commands without reading the skill reference first.

All Commands:
  sg init                                        Set up CLI configuration

  sg tool build --config <file>                  Build a tool from a JSON config
  sg tool build --id <id> --instruction <text>   Build a tool from flags (requires --steps)
  sg tool run --tool <id> [--payload <json>]     Run a saved tool
  sg tool run --draft <id> [--payload <json>]    Run a draft tool
  sg tool run --config <json> [--payload <json>] Run inline config
  sg tool edit --tool <id> --patches <json>      Edit a tool via JSON Patch
  sg tool edit --draft <id> --patches <json>     Edit a draft via JSON Patch
  sg tool save --draft <id>                      Save a draft to the server
  sg tool list                                   List all saved tools
  sg tool find [query]                           Search tools by keyword
  sg tool find --id <id>                         Get full config of a tool
  sg tool find --id <id> --fields <f1,f2>        Get only selected top-level fields

  sg system create --config <file>               Create a system from JSON config
  sg system create --name <name> --url <url>     Create a system from flags
  sg system edit --id <id>                       Edit a system's configuration
  sg system list                                 List all systems
  sg system find [query]                         Search systems by keyword
  sg system find --id <id>                       Get full config of a system
  sg system credentials get --system-id <id>     Get current user's system credentials
  sg system credentials set --system-id <id>     Set current user's system credentials
  sg system call --url <url> [--method GET]      Call an API, database, or file server
  sg system search-docs --system-id <id> -k <kw> Search system documentation
  sg system oauth --system-id <id> [--scopes <s>] Authenticate a system via OAuth

  sg mcp list                                   List named MCP servers
  sg mcp find [query]                           Search named MCP servers
  sg mcp find --id <id>                         Get full MCP server config + client setup
  sg mcp create --name <n> --tool <id>          Create a named MCP server
  sg mcp edit --id <id> --add-tool <id>         Edit a named MCP server

  sg schedule list                              List schedules
  sg schedule list --tool <id>                  List schedules for a saved tool
  sg schedule create --tool <id> --cron <expr>  Create a cron schedule
  sg schedule edit --tool <id> --id <schedule>  Edit, enable, or disable a schedule

  sg run list [toolId]                           List runs, optionally filtered by tool
  sg run get <runId>                             Get details of a specific run

  sg skill [topic]                                Print skill reference for AI agents
  sg update                                      Update CLI to latest version
  sg update --check                              Check for available updates

Global Flags:
  --api-key <key>    Override API key from config
  --endpoint <url>   Override API endpoint from config
  --table            Human-readable table output (default: JSON)
  --full             Disable truncation of large fields

Presets (set via sg init --preset or SUPERGLUE_CLI_PRESET):
  runner     Run saved tools by ID only (agent-safe, read-only)
  builder    Runner + build/edit tools, call systems, manage MCP servers (no system CRUD)
  admin      Full access (default)
`,
  );

const earlyConfig = resolveConfig({
  apiKey: extractFlagValue(process.argv, "--api-key"),
  endpoint: extractFlagValue(process.argv, "--endpoint"),
});
const preset: CLIPreset = earlyConfig.preset;

const getContext = () => {
  const opts = program.opts();
  const config = resolveConfig({ apiKey: opts.apiKey, endpoint: opts.endpoint });
  const client = createClient(config);
  return { config, client };
};

registerInitCommand(program);
registerUpdateCommand(program);
registerSkillCommand(program);
registerToolCommands(program, getContext, preset);
registerSystemCommands(program, getContext, preset);
registerMcpCommands(program, getContext, preset);
registerScheduleCommands(program, getContext, preset);
registerRunCommands(program, getContext, preset);

// Check version compatibility before running commands that hit the server
// Note: We manually extract --api-key and --endpoint from argv since program.opts()
// returns empty values before parse() is called
const commandsRequiringServer = ["tool", "system", "mcp", "schedule", "run"];

const subcommand = findSubcommand(process.argv);

startBackgroundUpdateCheck();

const runAndNotify = async (parsePromise: Promise<any>) => {
  await parsePromise;
  if (subcommand !== "update") {
    await printUpdateNotification();
  }
};

if (subcommand && commandsRequiringServer.includes(subcommand)) {
  if (earlyConfig.apiKey) {
    runAndNotify(checkVersionCompatibility(earlyConfig.endpoint).then(() => program.parseAsync()));
  } else {
    runAndNotify(program.parseAsync());
  }
} else {
  runAndNotify(program.parseAsync());
}
