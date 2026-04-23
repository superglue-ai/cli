import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig, CLIPreset } from "../../config.js";
import { isCommandAllowed, presetBlockedError } from "../../presets.js";
import { error } from "../../output.js";
import { registerCreateCommand } from "./create.js";
import { registerEditCommand } from "./edit.js";
import { registerFindCommand } from "./find.js";
import { registerCallCommand } from "./call.js";
import { registerDocsCommand } from "./docs.js";
import { registerOAuthCommand } from "./oauth.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function gatedRegister(
  parent: Command,
  name: string,
  presetKey: string,
  preset: CLIPreset,
  register: () => void,
): void {
  if (isCommandAllowed(preset, presetKey)) {
    register();
  } else {
    parent
      .command(name, { hidden: true })
      .allowUnknownOption()
      .allowExcessArguments(true)
      .action(() => {
        error(presetBlockedError(presetKey, preset));
        process.exit(1);
      });
  }
}

export function registerSystemCommands(
  program: Command,
  getContext: ContextFn,
  preset: CLIPreset,
): void {
  const system = program
    .command("system")
    .description("Manage superglue systems")
    .addHelpText(
      "after",
      `
Skill References:
  sg skill                  Full guide (system setup, credentials, OAuth)
  sg skill postgres         PostgreSQL connection and schema introspection
  sg skill mssql            MSSQL / Azure SQL connection patterns
  sg skill redis            Redis commands and connection patterns
  sg skill sftp-smb         SFTP, FTP, SMB patterns
  sg skill http             HTTP API patterns and authentication
  sg skill graphql          GraphQL schema introspection and step config

Quick Reference:
  sg system create --name <n> --url <u>      Create a system (auto-detects OAuth templates)
  sg system edit --id <id> --credentials <j> Update credentials or config
  sg system list [--limit N]                 List systems (default 25)
  sg system find --id <id>                   Get full system config + credential placeholders
  sg system call --url <url> --system-id <id>  Call an API/DB/file-server with credential injection
  sg system oauth --system-id <id> --scopes <s>  OAuth authentication flow
  sg system search-docs --system-id <id> -k <kw> Search system documentation

Credentials: pass ALL credentials (including secrets) via --credentials JSON.
  sg system create --name Stripe --url https://api.stripe.com --credentials '{"api_key":"sk-..."}'

Output: JSON by default. Use --table for human-readable, --full to disable truncation.
`,
    );
  gatedRegister(system, "create", "system.create", preset, () =>
    registerCreateCommand(system, getContext),
  );
  gatedRegister(system, "edit", "system.edit", preset, () =>
    registerEditCommand(system, getContext),
  );
  if (isCommandAllowed(preset, "system.find")) {
    registerFindCommand(system, getContext);
  } else {
    for (const name of ["list", "find"]) {
      system
        .command(name, { hidden: true })
        .allowUnknownOption()
        .allowExcessArguments(true)
        .action(() => {
          error(presetBlockedError("system.find", preset));
          process.exit(1);
        });
    }
  }
  gatedRegister(system, "call", "system.call", preset, () =>
    registerCallCommand(system, getContext),
  );
  gatedRegister(system, "search-docs", "system.docs", preset, () =>
    registerDocsCommand(system, getContext),
  );
  gatedRegister(system, "oauth", "system.oauth", preset, () =>
    registerOAuthCommand(system, getContext),
  );
}
