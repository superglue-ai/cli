import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import { getConnectionProtocol } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { parseFileFlags } from "../../files.js";
import { output, error, confirm, heading, colors as c } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function shouldAutoExecute(policy: string, method: string, url: string): boolean {
  if (policy === "run_everything") return true;
  if (policy === "ask_every_time") return false;
  if (policy === "run_gets_only") {
    const protocol = getConnectionProtocol(url);
    return protocol === "http" && method.toUpperCase() === "GET";
  }
  return false;
}

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
    .action(async (opts) => {
      const { config, client } = getContext();
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

      const autoExec =
        process.argv.includes("--yes") ||
        process.argv.includes("-y") ||
        shouldAutoExecute(config.policies.callSystem, method, opts.url);

      if (!autoExec) {
        const methodColors: Record<string, string> = {
          GET: c.green,
          POST: c.yellow,
          PUT: c.blue,
          PATCH: c.magenta,
          DELETE: c.red,
        };
        const mc = methodColors[method.toUpperCase()] || c.white;
        console.log("");
        console.log(`  ${mc}${c.bold}${method.toUpperCase()}${c.reset} ${opts.url}`);
        if (opts.systemId) console.log(`  ${c.dim}system:${c.reset} ${opts.systemId}`);
        if (opts.headers) console.log(`  ${c.dim}headers:${c.reset} ${opts.headers}`);
        if (body) {
          const preview = body.length > 200 ? body.slice(0, 200) + `${c.dim}...${c.reset}` : body;
          console.log(`  ${c.dim}body:${c.reset} ${preview}`);
        }
        console.log("");
        const accepted = await confirm("Execute this request?");
        if (!accepted) {
          output({ success: false, cancelled: true, message: "Request cancelled" });
          process.exit(0);
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
        const result = await client.executeStep({ step, payload: {} });
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
