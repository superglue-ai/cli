import { type Command, Option } from "commander";
import type {
  CredentialKeyMetadata,
  CredentialSetSummary,
  SuperglueClient,
} from "@superglue/shared";
import { output, error, success, spinner, colors as c, isTableMode } from "../../output.js";
import {
  clearOwnedCredentials,
  getOwnedCredentialSet,
  setOwnedCredentials,
} from "./credentials-api.js";

type ContextFn = () => { client: SuperglueClient };

function parseEnvironment(opts: { env?: string }): "dev" | "prod" {
  return opts.env === "dev" ? "dev" : "prod";
}

function parseCredentialsJson(raw: string): Record<string, unknown> {
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("--credentials must be a JSON object");
  }
  return parsed as Record<string, unknown>;
}

function formatCredentialResponse({
  systemId,
  environment,
  set,
}: {
  systemId: string;
  environment: "dev" | "prod";
  set?: Pick<CredentialSetSummary, "credentialKeys" | "missingRequiredCredentialKeys"> | null;
}) {
  const credentialKeys = set?.credentialKeys || [];
  return {
    systemId,
    environment,
    credentialKeys: credentialKeys.map((credential) => ({
      ...credential,
      placeholder: `<<${systemId}_${credential.key}>>`,
    })),
    missingRequiredCredentialKeys: set?.missingRequiredCredentialKeys || [],
  };
}

function formatCredentialKeyList(credentialKeys: CredentialKeyMetadata[]): string {
  return credentialKeys
    .map((credential) => (credential.hasValue ? credential.key : `${credential.key} (empty)`))
    .join(", ");
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
      const { client } = getContext();
      try {
        const environment = parseEnvironment(opts);
        await client.getSystem(opts.systemId, { environment });
        const set = await getOwnedCredentialSet(client, opts.systemId);
        output({
          success: true,
          data: formatCredentialResponse({ systemId: opts.systemId, environment, set }),
        });
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
      const { client } = getContext();
      let parsedCredentials: Record<string, unknown>;
      try {
        parsedCredentials = parseCredentialsJson(opts.credentials);
      } catch (err: any) {
        error(`Invalid --credentials JSON: ${err.message}`);
        process.exit(1);
      }

      const spin = spinner(`Saving user credentials for ${c.bold}${opts.systemId}${c.reset}...`);
      try {
        const environment = parseEnvironment(opts);
        await client.getSystem(opts.systemId, { environment });
        const set = await setOwnedCredentials({
          client,
          systemId: opts.systemId,
          credentials: parsedCredentials,
        });
        spin.stop();
        if (isTableMode()) {
          success(`Credentials saved for ${c.bold}${opts.systemId}${c.reset}`, {
            environment,
            keys: formatCredentialKeyList(set?.credentialKeys || []) || "(none)",
          });
        } else {
          output({
            success: true,
            data: formatCredentialResponse({ systemId: opts.systemId, environment, set }),
          });
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
      const { client } = getContext();
      const spin = spinner(`Clearing user credentials for ${c.bold}${opts.systemId}${c.reset}...`);
      try {
        const environment = parseEnvironment(opts);
        await client.getSystem(opts.systemId, { environment });
        const set = await clearOwnedCredentials(client, opts.systemId);
        spin.stop();
        if (isTableMode()) {
          success(`Credentials cleared for ${c.bold}${opts.systemId}${c.reset}`, {
            environment,
          });
        } else {
          output({
            success: true,
            data: formatCredentialResponse({ systemId: opts.systemId, environment, set }),
          });
        }
      } catch (err: any) {
        spin.stop();
        error(err.message);
        process.exit(1);
      }
    });
}
