import { type Command, Option } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import { getConnectionProtocol } from "@superglue/shared";
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
          protocol: getConnectionProtocol(opts.url),
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
