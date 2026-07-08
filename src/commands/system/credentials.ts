import { type Command, Option } from "commander";
import { maskCredentialValue } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, success, spinner, colors as c, isTableMode } from "../../output.js";
import {
  deleteMySystemCredentials,
  getMySystemCredentials,
  setMySystemCredentials,
} from "./user-credentials-api.js";

type ContextFn = () => { config: CLIConfig };

function parseEnvironment(opts: { env?: string }): { environment?: "dev" | "prod" } {
  return opts.env === "dev" || opts.env === "prod" ? { environment: opts.env } : {};
}

function parseCredentialsJson(raw: string): Record<string, unknown> {
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("--credentials must be a JSON object");
  }
  return parsed as Record<string, unknown>;
}

function formatCredentials(credentials: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(credentials).map(([key, value]) => [
      key,
      {
        placeholder: `<<SYSTEM_ID_${key}>>`,
        value: maskCredentialValue(key, value),
      },
    ]),
  );
}

function formatCredentialResponse(data: {
  systemId: string;
  environment: "dev" | "prod";
  hasCredentials: boolean;
  credentials: Record<string, unknown>;
}) {
  const credentials = formatCredentials(data.credentials || {});
  return {
    systemId: data.systemId,
    environment: data.environment,
    hasCredentials: data.hasCredentials,
    credentials: Object.fromEntries(
      Object.entries(credentials).map(([key, value]) => [
        key,
        {
          ...value,
          placeholder: `<<${data.systemId}_${key}>>`,
        },
      ]),
    ),
  };
}

export function registerCredentialsCommand(parent: Command, getContext: ContextFn): void {
  const credentials = parent
    .command("credentials")
    .description("Manage the current user's credentials for a system")
    .addHelpText(
      "after",
      `
Examples:
  sg system credentials get --system-id salesforce
  sg system credentials set --system-id stripe --credentials '{"api_key":"sk-..."}'
  sg system credentials clear --system-id stripe

These commands manage the executing user's credentials for a system.
`,
    );

  credentials
    .command("get")
    .description("Get the current user's credentials for a system")
    .requiredOption("--system-id <id>", "System ID")
    .addOption(
      new Option("--env <environment>", "Environment: dev or prod").choices(["dev", "prod"]),
    )
    .action(async (opts) => {
      const { config } = getContext();
      try {
        const data = await getMySystemCredentials(config, opts.systemId, parseEnvironment(opts));
        output({ success: true, data: formatCredentialResponse(data) });
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });

  credentials
    .command("set")
    .description("Set the current user's credentials for a system")
    .requiredOption("--system-id <id>", "System ID")
    .requiredOption("--credentials <json>", "Credentials JSON object")
    .addOption(
      new Option("--env <environment>", "Environment: dev or prod").choices(["dev", "prod"]),
    )
    .action(async (opts) => {
      const { config } = getContext();
      let parsedCredentials: Record<string, unknown>;
      try {
        parsedCredentials = parseCredentialsJson(opts.credentials);
      } catch (err: any) {
        error(`Invalid --credentials JSON: ${err.message}`);
        process.exit(1);
      }

      const spin = spinner(`Saving user credentials for ${c.bold}${opts.systemId}${c.reset}...`);
      try {
        const data = await setMySystemCredentials(
          config,
          opts.systemId,
          parsedCredentials,
          parseEnvironment(opts),
        );
        spin.stop();
        if (isTableMode()) {
          success(`Credentials saved for ${c.bold}${opts.systemId}${c.reset}`, {
            environment: data.environment,
            keys: Object.keys(data.credentials || {}).join(", ") || "(none)",
          });
        } else {
          output({ success: true, data: formatCredentialResponse(data) });
        }
      } catch (err: any) {
        spin.stop();
        error(err.message);
        process.exit(1);
      }
    });

  credentials
    .command("clear")
    .description("Delete the current user's credentials for a system")
    .requiredOption("--system-id <id>", "System ID")
    .addOption(
      new Option("--env <environment>", "Environment: dev or prod").choices(["dev", "prod"]),
    )
    .action(async (opts) => {
      const { config } = getContext();
      const spin = spinner(`Clearing user credentials for ${c.bold}${opts.systemId}${c.reset}...`);
      try {
        const data = await deleteMySystemCredentials(config, opts.systemId, parseEnvironment(opts));
        spin.stop();
        if (isTableMode()) {
          success(`Credentials cleared for ${c.bold}${opts.systemId}${c.reset}`, {
            environment: data.environment,
          });
        } else {
          output({ success: true, data: formatCredentialResponse(data) });
        }
      } catch (err: any) {
        spin.stop();
        error(err.message);
        process.exit(1);
      }
    });
}
