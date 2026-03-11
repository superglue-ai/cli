import * as fs from "node:fs";
import * as path from "node:path";
import type { SuperglueClient } from "@superglue/shared";

export async function parseFileFlags(
  fileFlags: string[] | undefined,
  client: SuperglueClient,
): Promise<Record<string, any>> {
  if (!fileFlags || fileFlags.length === 0) return {};

  const payloads: Record<string, any> = {};
  for (const flag of fileFlags) {
    const eqIdx = flag.indexOf("=");
    if (eqIdx === -1) {
      console.error(`Invalid --file format: "${flag}". Expected key=path`);
      process.exit(1);
    }
    const key = flag.slice(0, eqIdx);
    const filePath = path.resolve(flag.slice(eqIdx + 1));
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }

    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer]);
    const file = new File([blob], path.basename(filePath));

    try {
      const result = await client.extract({ file });
      payloads[key] = result.data;
    } catch (err: any) {
      console.error(`Failed to extract file "${key}" (${filePath}): ${err.message}`);
      process.exit(1);
    }
  }
  return payloads;
}

export function resolveFileReferences(value: any, filePayloads: Record<string, any>): any {
  if (typeof value === "string" && value.startsWith("file::")) {
    const key = value.slice(6);
    if (!(key in filePayloads)) {
      throw new Error(
        `File reference 'file::${key}' not found. Available: ${Object.keys(filePayloads).join(", ") || "(none)"}`,
      );
    }
    return filePayloads[key];
  }
  if (Array.isArray(value)) {
    return value.map((v) => resolveFileReferences(v, filePayloads));
  }
  if (value && typeof value === "object") {
    const resolved: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) {
      resolved[k] = resolveFileReferences(v, filePayloads);
    }
    return resolved;
  }
  return value;
}

export function resolvePayloadWithFiles(
  payload: any,
  filePayloads: Record<string, any>,
): { success: true; resolved: any } | { success: false; error: string } {
  if (!payload) return { success: true, resolved: payload };
  try {
    const resolved = resolveFileReferences(payload, filePayloads);
    return { success: true, resolved };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
