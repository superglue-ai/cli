import { type Command } from "commander";
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

function parseCredentialsJson(raw: string): Record<string, unknown> {
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("--credentials must be a JSON object");
  }
  return parsed as Record<string, unknown>;
}

function formatCredentialResponse({
  systemId,
  set,
}: {
  systemId: string;
  set?: Pick<
    CredentialSetSummary,
    "credentialKeys" | "missingRequiredCredentialKeys" | "url"
  > | null;
}) {
  const credentialKeys = set?.credentialKeys || [];
  return {
    systemId,
    ...(set?.url ? { url: set.url } : {}),
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
    .action(async (opts) => {
      const { client } = getContext();
      try {
        await client.getSystem(opts.systemId);
        const set = await getOwnedCredentialSet(client, opts.systemId);
        output({
          success: true,
          data: formatCredentialResponse({ systemId: opts.systemId, set }),
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
    .option(
      "--url <url>",
      "Base URL override for the credential; replaces the system url at execution time. Pass an empty string to clear.",
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
        await client.getSystem(opts.systemId);
        const set = await setOwnedCredentials({
          client,
          systemId: opts.systemId,
          credentials: parsedCredentials,
          url: opts.url,
        });
        spin.stop();
        if (isTableMode()) {
          success(`Credentials saved for ${c.bold}${opts.systemId}${c.reset}`, {
            keys: formatCredentialKeyList(set?.credentialKeys || []) || "(none)",
          });
        } else {
          output({
            success: true,
            data: formatCredentialResponse({ systemId: opts.systemId, set }),
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
    .action(async (opts) => {
      const { client } = getContext();
      const spin = spinner(`Clearing user credentials for ${c.bold}${opts.systemId}${c.reset}...`);
      try {
        await client.getSystem(opts.systemId);
        const set = await clearOwnedCredentials(client, opts.systemId);
        spin.stop();
        if (isTableMode()) {
          success(`Credentials cleared for ${c.bold}${opts.systemId}${c.reset}`);
        } else {
          output({
            success: true,
            data: formatCredentialResponse({ systemId: opts.systemId, set }),
          });
        }
      } catch (err: any) {
        spin.stop();
        error(err.message);
        process.exit(1);
      }
    });
}
