import { exec } from "node:child_process";
import { promisify } from "node:util";
import { colors as c } from "./output.js";
import pkg from "../package.json";

const execAsync = promisify(exec);

export const CLI_VERSION: string = pkg.version;

interface HealthResponse {
  status: string;
  version?: string;
  minCliVersion?: string;
}

function parseVersionPart(part: string): { numeric: number; prerelease: string | null } {
  // Handle parts like "0", "1", "0-beta", "1-rc.1"
  const match = part.match(/^(\d+)(?:-(.+))?$/);
  if (match) {
    return { numeric: parseInt(match[1], 10), prerelease: match[2] || null };
  }
  // Non-numeric part (shouldn't happen in valid semver, treat as 0 with prerelease)
  return { numeric: 0, prerelease: part };
}

export function compareVersions(a: string, b: string): number {
  const partsA = a.split(".");
  const partsB = b.split(".");
  const maxLen = Math.max(partsA.length, partsB.length);

  for (let i = 0; i < maxLen; i++) {
    const parsedA = parseVersionPart(partsA[i] || "0");
    const parsedB = parseVersionPart(partsB[i] || "0");

    // Compare numeric parts first
    if (parsedA.numeric < parsedB.numeric) return -1;
    if (parsedA.numeric > parsedB.numeric) return 1;

    // If numeric parts are equal, compare prerelease
    // No prerelease > has prerelease (1.0.0 > 1.0.0-beta)
    if (parsedA.prerelease === null && parsedB.prerelease !== null) return 1;
    if (parsedA.prerelease !== null && parsedB.prerelease === null) return -1;
    if (parsedA.prerelease !== null && parsedB.prerelease !== null) {
      if (parsedA.prerelease < parsedB.prerelease) return -1;
      if (parsedA.prerelease > parsedB.prerelease) return 1;
    }
  }
  return 0;
}

export async function checkVersionCompatibility(endpoint: string): Promise<void> {
  try {
    const healthUrl = `${endpoint.replace(/\/$/, "")}/v1/health`;
    const response = await fetch(healthUrl, { signal: AbortSignal.timeout(3000) });
    if (!response.ok) return;

    const health = (await response.json()) as HealthResponse;
    if (!health.minCliVersion) return;

    if (compareVersions(CLI_VERSION, health.minCliVersion) < 0) {
      console.error("");
      console.error(`${c.yellow}${c.bold}⚠ CLI version ${CLI_VERSION} is outdated.${c.reset}`);
      console.error(
        `${c.yellow}  Server requires at least v${health.minCliVersion}. Run: ${c.bold}sg update${c.reset}`,
      );
      console.error("");
    }
  } catch {
    // Silently ignore version check failures
  }
}

export async function getLatestNpmVersion(): Promise<string | null> {
  try {
    const response = await fetch("https://registry.npmjs.org/@superglue/cli/latest", {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { version?: string };
    return data.version || null;
  } catch {
    return null;
  }
}

export async function updateCli(): Promise<{ success: boolean; message: string }> {
  const latestVersion = await getLatestNpmVersion();

  if (!latestVersion) {
    return { success: false, message: "Could not fetch latest version from npm" };
  }

  if (compareVersions(CLI_VERSION, latestVersion) >= 0) {
    return { success: true, message: `Already on latest version (${CLI_VERSION})` };
  }

  try {
    await execAsync("npm install -g @superglue/cli@latest");
    return {
      success: true,
      message: `Updated from ${CLI_VERSION} to ${latestVersion}`,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Update failed: ${err.message}. Try manually: npm install -g @superglue/cli@latest`,
    };
  }
}
