import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

export type CLIPreset = "runner" | "builder" | "admin";

export interface CLIConfig {
  apiKey: string;
  endpoint: string;
  webEndpoint: string;
  output: { mode: "stdout" | "stdout+file"; directory: string };
  preset: CLIPreset;
}

const VALID_PRESETS: Set<string> = new Set(["runner", "builder", "admin"]);

const DEFAULT_CONFIG: Omit<CLIConfig, "apiKey" | "endpoint" | "webEndpoint"> = {
  output: { mode: "stdout", directory: ".superglue/output" },
  preset: "admin",
};

export function getConfigDir(preferLocal?: boolean): string {
  const localDir = path.join(process.cwd(), ".superglue");
  const homeDir = os.homedir();

  if (!homeDir) {
    // If we can't determine home directory, fall back to local only
    return localDir;
  }

  const globalDir = path.join(homeDir, ".superglue");

  // If explicitly requesting local, return local dir
  if (preferLocal === true) {
    return localDir;
  }

  // If explicitly requesting global, return global dir
  if (preferLocal === false) {
    return globalDir;
  }

  // Auto-detect: prefer local if config exists there, else global
  if (fs.existsSync(path.join(localDir, "config.json"))) {
    return localDir;
  }
  return globalDir;
}

export function getConfigPath(preferLocal?: boolean): string {
  return path.join(getConfigDir(preferLocal), "config.json");
}

function loadConfigFile(): Partial<CLIConfig> {
  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch {
    return {};
  }
}

export function resolveConfig(flags: { apiKey?: string; endpoint?: string }): CLIConfig {
  const file = loadConfigFile();
  const apiKey = flags.apiKey || process.env.SUPERGLUE_API_KEY || file.apiKey || "";
  const endpoint =
    flags.endpoint ||
    process.env.SUPERGLUE_API_ENDPOINT ||
    file.endpoint ||
    "https://api.superglue.cloud";
  const webEndpoint =
    process.env.SUPERGLUE_WEB_ENDPOINT ||
    file.webEndpoint ||
    endpoint.replace(/:3002\b/, ":3001").replace(/api\.superglue/, "app.superglue");
  const envPreset = process.env.SUPERGLUE_CLI_PRESET;
  const preset: CLIPreset =
    envPreset && VALID_PRESETS.has(envPreset)
      ? (envPreset as CLIPreset)
      : file.preset && VALID_PRESETS.has(file.preset)
        ? (file.preset as CLIPreset)
        : "admin";

  return {
    ...DEFAULT_CONFIG,
    ...file,
    apiKey,
    endpoint,
    webEndpoint,
    preset,
    output: { ...DEFAULT_CONFIG.output, ...file.output },
  };
}

export function writeConfig(config: CLIConfig, preferLocal?: boolean): void {
  const dir = getConfigDir(preferLocal);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "config.json"), JSON.stringify(config, null, 2) + "\n", {
    mode: 0o600,
  });
}

export function ensureConfigDirs(config: CLIConfig, preferLocal?: boolean): void {
  const draftsDir = path.join(getConfigDir(preferLocal), "drafts");
  if (!fs.existsSync(draftsDir)) fs.mkdirSync(draftsDir, { recursive: true });
  if (config.output.mode === "stdout+file") {
    const outDir = path.resolve(config.output.directory);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  }
}
