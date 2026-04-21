import { type Command, Option } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import { inferProtocolFromUrl } from "@superglue/shared";
import { parseFileFlags } from "../../files.js";
import { output, error, colors as c } from "../../output.js";

type ContextFn = () => { client: SuperglueClient };

export function registerCallCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("call")
    .description("Call a system (API, database, file server)")
    .requiredOption("--url <url>", "Full URL including protocol")
    .option("--system-id <id>", "System ID for credential injection")
    .option("--method <method>", "HTTP method", "GET")
    .option("--headers <json>", "HTTP headers JSON")
    .option("--body <string>", "Request body")
    .option(
      "--file <key=path...>",
      "File references",
      (v: string, arr: string[]) => {
        arr.push(v);
        return arr;
      },
      [],
    )
    .addOption(
      new Option("--env <environment>", "Environment: dev or prod").choices(["dev", "prod"]),
    )
    .addHelpText(
      "after",
      `
${c.bold}Discovering Credential Placeholders:${c.reset}
  Use 'sg system find <system-id>' to see available credential placeholders:

    ${c.dim}$${c.reset} sg system find my_postgres
    ${c.green}→ storedCredentials:${c.reset} { username: { placeholder: "<<my_postgres_username>>", value: "admin" }, password: { placeholder: "<<my_postgres_password>>", value: "****" } }

  Or use 'sg system list' to see credentials for all systems at once.

${c.bold}Examples:${c.reset}
  ${c.dim}# HTTP API with API key${c.reset}
  sg system call --system-id stripe \\
    --url "https://api.stripe.com/v1/customers" \\
    --headers '{"Authorization": "Bearer <<stripe_api_key>>"}'

  ${c.dim}# PostgreSQL database query${c.reset}
  sg system call --system-id my_postgres \\
    --url "postgres://<<my_postgres_username>>:<<my_postgres_password>>@localhost:5432/mydb" \\
    --body '{"query": "SELECT * FROM users WHERE id = $1", "params": [123]}'

  ${c.dim}# Microsoft SQL Server with parameterized query${c.reset}
  sg system call --system-id azure_sql \\
    --url "mssql://<<azure_sql_username>>:<<azure_sql_password>>@server.database.windows.net:1433/mydb" \\
    --body '{"query": "SELECT * FROM orders WHERE status = @param1", "params": ["pending"]}'

  ${c.dim}# Redis command${c.reset}
  sg system call --system-id my_redis \\
    --url "redis://<<my_redis_password>>@localhost:6379" \\
    --body '{"command": "GET", "args": ["user:123"]}'

  ${c.dim}# SFTP list files${c.reset}
  sg system call --system-id sftp_server \\
    --url "sftp://<<sftp_server_username>>:<<sftp_server_password>>@files.example.com:22" \\
    --body '{"operation": "list", "path": "/uploads"}'

${c.bold}Supported Protocols:${c.reset}
  HTTP/HTTPS, PostgreSQL, MSSQL/SQL Server, Redis, SFTP/FTP/FTPS, SMB
`,
    )
    .action(async (opts) => {
      const { client } = getContext();
      const method = opts.method || "GET";

      const filePayloads = await parseFileFlags(opts.file, client);

      let body = opts.body;
      if (body && Object.keys(filePayloads).length > 0) {
        try {
          let parsed = JSON.parse(body);
          const resolveFileRefs = (obj: any): any => {
            if (typeof obj === "string" && obj.startsWith("file::")) {
              const key = obj.slice(6);
              if (key in filePayloads) return filePayloads[key];
              error(
                `Unresolved file reference: file::${key}. Available: ${Object.keys(filePayloads).join(", ") || "(none)"}`,
              );
              process.exit(1);
            }
            if (Array.isArray(obj)) return obj.map(resolveFileRefs);
            if (obj && typeof obj === "object") {
              const result: any = {};
              for (const [k, v] of Object.entries(obj)) {
                result[k] = resolveFileRefs(v);
              }
              return result;
            }
            return obj;
          };
          parsed = resolveFileRefs(parsed);
          body = JSON.stringify(parsed);
        } catch (err: any) {
          if (err.message?.startsWith("Unresolved file reference")) throw err;
        }
      }

      let headers: Record<string, string> | undefined;
      if (opts.headers) {
        try {
          headers = JSON.parse(opts.headers);
        } catch (err: any) {
          error(`Invalid --headers JSON: ${err.message}`);
          process.exit(1);
        }
      }

      const step = {
        id: `call_system_${Date.now()}`,
        failureBehavior: "continue",
        config: {
          url: opts.url,
          method,
          headers,
          body,
          systemId: opts.systemId,
        },
      };

      try {
        const mode = opts.env === "dev" || opts.env === "prod" ? opts.env : undefined;
        const result = await client.executeStep({ step, payload: {}, mode });
        const responseData = result.data?.data !== undefined ? result.data.data : result.data;
        output({
          success: result.success,
          protocol: inferProtocolFromUrl(opts.url),
          data: responseData,
          ...(result.error ? { error: result.error } : {}),
        });
        if (!result.success) process.exit(1);
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
