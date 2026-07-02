import { spawn } from "node:child_process";

export function openBrowser(url: string): void {
  const platform = process.platform;
  const cmd = platform === "darwin" ? "open" : platform === "win32" ? "rundll32" : "xdg-open";
  const args = platform === "win32" ? ["url.dll,FileProtocolHandler", url] : [url];
  try {
    const child = spawn(cmd, args, { detached: true, stdio: "ignore" });
    child.on("error", () => {
      // The caller prints the URL, so browser opening is best-effort.
    });
    child.unref();
  } catch {
    // The caller prints the URL, so browser opening is best-effort.
  }
}
