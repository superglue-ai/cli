import * as fs from "node:fs";
import type { RequestOptions, ToolSchedule } from "@superglue/shared";

export function formatScheduleForCli(
  schedule: ToolSchedule,
  full = false,
): Record<string, unknown> {
  const row: Record<string, unknown> = {
    id: schedule.id,
    toolId: schedule.toolId,
    status: schedule.enabled ? "active" : "inactive",
    cronExpression: schedule.cronExpression,
    timezone: schedule.timezone,
    nextRunAt: schedule.nextRunAt.toISOString(),
  };

  if (!full) return row;

  return {
    ...row,
    payload: schedule.payload || {},
    options: schedule.options || {},
    createdByUserId: schedule.createdByUserId,
    lastRunAt: schedule.lastRunAt?.toISOString(),
    createdAt: schedule.createdAt.toISOString(),
    updatedAt: schedule.updatedAt.toISOString(),
  };
}

export function getScheduleStatusCounts(schedules: ToolSchedule[]): Record<string, number> {
  return {
    active: schedules.filter((schedule) => schedule.enabled).length,
    inactive: schedules.filter((schedule) => !schedule.enabled).length,
  };
}

export function parseJsonObject(value: string, label: string): Record<string, any> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch (err: any) {
    throw new Error(`Invalid ${label} JSON: ${err.message}`);
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${label} must be a JSON object`);
  }

  return parsed as Record<string, any>;
}

export function parseFileOrJsonObject(value: string, label: string): Record<string, any> {
  const raw = value.trim().startsWith("{") ? value : fs.readFileSync(value, "utf-8");
  return parseJsonObject(raw, label);
}

export function parseJsonObjectOption({
  inline,
  file,
  label,
}: {
  inline?: string;
  file?: string;
  label: string;
}): Record<string, any> | undefined {
  if (inline !== undefined && file !== undefined) {
    throw new Error(`Use either --${label} or --${label}-file, not both`);
  }
  if (file !== undefined) return parseJsonObject(fs.readFileSync(file, "utf-8"), label);
  if (inline !== undefined) return parseJsonObject(inline, label);
  return undefined;
}

function parseIntegerOption({
  value,
  name,
  min,
  max,
}: {
  value: string;
  name: string;
  min: number;
  max?: number;
}): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min || (max !== undefined && parsed > max)) {
    const range = max === undefined ? `at least ${min}` : `between ${min} and ${max}`;
    throw new Error(`--${name} must be an integer ${range}`);
  }
  return parsed;
}

export function hasOptionUpdates(opts: any): boolean {
  return (
    opts.options !== undefined ||
    opts.optionsFile !== undefined ||
    opts.clearOptions ||
    opts.webhookUrl !== undefined ||
    opts.toolChain !== undefined ||
    opts.clearWebhook ||
    opts.retries !== undefined ||
    opts.timeout !== undefined
  );
}

export function buildScheduleOptions(
  opts: any,
  baseOptions?: RequestOptions,
): RequestOptions | undefined {
  if (!hasOptionUpdates(opts)) return undefined;
  if (opts.options !== undefined && opts.optionsFile !== undefined) {
    throw new Error("Use either --options or --options-file, not both");
  }
  if (opts.webhookUrl !== undefined && opts.toolChain !== undefined) {
    throw new Error("Use either --webhook-url or --tool-chain, not both");
  }
  if (opts.clearWebhook && (opts.webhookUrl !== undefined || opts.toolChain !== undefined)) {
    throw new Error("Use --clear-webhook without --webhook-url or --tool-chain");
  }

  let options: RequestOptions = opts.clearOptions ? {} : { ...(baseOptions || {}) };
  if (opts.options !== undefined) {
    options = parseFileOrJsonObject(opts.options, "options") as RequestOptions;
  }
  if (opts.optionsFile !== undefined) {
    options = parseJsonObject(
      fs.readFileSync(opts.optionsFile, "utf-8"),
      "options",
    ) as RequestOptions;
  }

  if (opts.retries !== undefined) {
    options.retries = parseIntegerOption({ value: opts.retries, name: "retries", min: 0, max: 10 });
  }
  if (opts.timeout !== undefined) {
    options.timeout = parseIntegerOption({ value: opts.timeout, name: "timeout", min: 100 });
  }
  if (opts.clearWebhook) {
    delete options.webhookUrl;
  } else if (opts.toolChain !== undefined) {
    options.webhookUrl = `tool:${opts.toolChain}`;
  } else if (opts.webhookUrl !== undefined) {
    options.webhookUrl = opts.webhookUrl;
  }

  return options;
}

export function formatScheduleError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (message.toLowerCase().includes("fetch failed")) {
    return [
      "Could not reach the configured superglue API endpoint.",
      "Set SUPERGLUE_API_ENDPOINT or pass --endpoint, and provide an org-scoped API key.",
    ].join(" ");
  }
  return message;
}
