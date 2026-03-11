import * as readline from "node:readline";
import { CLI_VERSION } from "./version.js";

const isJsonMode = (): boolean => process.argv.includes("--json") || !process.stdout.isTTY;

// ── ANSI helpers ──
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
};

export { c as colors };

// ── Banner ──
export function banner(): void {
  if (isJsonMode()) return;
  const rst = c.reset;
  const d = c.dim;
  const inv = "\x1b[47;30m";

  const art = [
    "       #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-       ",
    "     =@@@-                                                                                 @@@@     ",
    "    @@@                                                                                       @@%   ",
    "  -@@        @@@@=  @@@  @@@ @@@@@#@  @@@@@@@ @@@@@@@    @@@@@@   @@@     @@@   @@@ @@@@@@*      %@@  ",
    "  @@        @@@  *@ @@@  @@@ @@@  :@@ @@@     @@@  -@@ @@@    @%  @@@     @@@   @@@ @@*           @@# ",
    " #@@        @@@#    @@@  @@@ @@@  :@@ @@@     @@@  -@@ @@@        @@@     @@@   @@@ @@*            @@ ",
    " @@-         @@@@=  @@@  @@@ @@@@@@@  @@@@@@  @@@@@@@  @@@    @@% @@@     @@@   @@@ @@@@@.         @@.",
    " #@%          .@@@@ @@@  @@@ @@@      @@@     @@@  -@@ @@@    @@% @@@     @@@   @@@ @@*            @@ ",
    "  @@        @   @@@ @@@  @@@ @@@      @@@     @@@  -@@ @@@    @@% @@@     @@@   @@@ @@*           *@@ ",
    "  -@@        @@@@=   @@@@@@  @@@      @@@@@@@ @@@  -@@   @@@@@@   @@@@@@%  @@@@@@.  @@@@@@*      #@@  ",
    "   :@@*                                                                                       @@@   ",
    "     %@@@                                                                                  =@@@.    ",
    "       :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%        ",
  ];

  console.log("");
  art.forEach((line) => {
    const first = line.search(/\S/);
    const last = line.length - [...line].reverse().join("").search(/\S/) - 1;
    if (first === -1) return console.log("  " + line);
    const before = line.slice(0, first);
    const inside = line
      .slice(first, last + 1)
      .split("")
      .map((ch) => (ch === " " ? " " : "\u2588"))
      .join("");
    const after = line.slice(last + 1);
    console.log(`  ${before}${inv}${inside}${rst}${after}`);
  });
  console.log(`  ${d}  CLI v${CLI_VERSION}${rst}`);
  console.log("");
}

// ── Spinner ──
export function spinner(message: string): {
  stop: (finalMsg?: string) => void;
  update: (msg: string) => void;
} {
  if (isJsonMode()) return { stop: () => {}, update: () => {} };
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;
  let currentMsg = message;
  const interval = setInterval(() => {
    process.stdout.write(`\r  ${c.cyan}${frames[i++ % frames.length]}${c.reset} ${currentMsg}`);
  }, 80);
  return {
    update: (msg: string) => {
      currentMsg = msg;
    },
    stop: (finalMsg?: string) => {
      clearInterval(interval);
      process.stdout.write(`\r${"".padEnd(currentMsg.length + 10)}\r`);
      if (finalMsg) console.log(`  ${finalMsg}`);
    },
  };
}

// ── Basic outputs ──
export function output(data: unknown): void {
  if (isJsonMode()) {
    console.log(JSON.stringify(data, null, 2));
  } else {
    prettyPrint(data);
  }
}

export function success(message: string, data?: unknown): void {
  if (isJsonMode()) {
    console.log(
      JSON.stringify({
        success: true,
        message,
        ...(data && typeof data === "object" ? data : { data }),
      }),
    );
  } else {
    console.log(`  ${c.green}✓${c.reset} ${message}`);
    if (data) prettyPrint(data, 4);
  }
}

export function error(message: string, details?: unknown): void {
  if (isJsonMode()) {
    console.error(JSON.stringify({ success: false, error: message, details }));
  } else {
    console.error(`  ${c.red}✗${c.reset} ${message}`);
    if (details) prettyPrint(details, 4);
  }
}

export function warn(message: string): void {
  if (!isJsonMode()) {
    console.log(`  ${c.yellow}⚠${c.reset} ${message}`);
  }
}

export function info(message: string): void {
  if (!isJsonMode()) {
    console.log(`  ${c.dim}${message}${c.reset}`);
  }
}

export function heading(text: string): void {
  if (!isJsonMode()) {
    console.log(`\n  ${c.bold}${c.cyan}${text}${c.reset}`);
    console.log(`  ${c.dim}${"─".repeat(text.length)}${c.reset}`);
  }
}

export function keyValue(key: string, value: unknown, indent = 2): void {
  if (isJsonMode()) return;
  const pad = " ".repeat(indent);
  const valStr =
    typeof value === "object" && value !== null ? JSON.stringify(value) : String(value ?? "");
  console.log(`${pad}${c.dim}${key}:${c.reset} ${valStr}`);
}

// ── Table ──
export function table(rows: Record<string, unknown>[], columns?: string[]): void {
  if (isJsonMode()) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  if (rows.length === 0) {
    console.log(`\n  ${c.dim}(no results)${c.reset}\n`);
    return;
  }
  const cols = columns || Object.keys(rows[0]);
  const maxColWidth = 60;
  const widths = cols.map((col) =>
    Math.min(
      maxColWidth,
      Math.max(
        col.length,
        ...rows.map(
          (r) =>
            String(r[col] ?? "")
              .replace(/[\n\r]+/g, " ")
              .trim().length,
        ),
      ),
    ),
  );

  console.log("");
  const header = cols
    .map((col, i) => `${c.bold}${c.cyan}${col.toUpperCase().padEnd(widths[i])}${c.reset}`)
    .join("  ");
  console.log(`  ${header}`);
  const sep = widths.map((w) => `${c.dim}${"─".repeat(w)}${c.reset}`).join(`${c.dim}──${c.reset}`);
  console.log(`  ${sep}`);

  for (const row of rows) {
    const line = cols
      .map((col, i) => {
        let val = String(row[col] ?? "")
          .replace(/[\n\r]+/g, " ")
          .trim();
        if (val.length > maxColWidth) val = val.slice(0, maxColWidth - 1) + "…";

        if (col === "status") {
          const statusColors: Record<string, string> = {
            success: c.green,
            running: c.yellow,
            failed: c.red,
            aborted: c.red,
            error: c.red,
            pending: c.dim,
          };
          const sc = statusColors[val.toLowerCase()] || "";
          return `${sc}${val.padEnd(widths[i])}${c.reset}`;
        }
        return val.padEnd(widths[i]);
      })
      .join("  ");
    console.log(`  ${line}`);
  }
  console.log(`\n  ${c.dim}${rows.length} result${rows.length === 1 ? "" : "s"}${c.reset}\n`);
}

// ── Pretty-print structured data in human mode ──
function prettyPrint(data: unknown, indent = 2): void {
  const pad = " ".repeat(indent);
  if (data === null || data === undefined) {
    console.log(`${pad}${c.dim}(empty)${c.reset}`);
    return;
  }
  if (typeof data !== "object") {
    console.log(`${pad}${String(data)}`);
    return;
  }

  const obj = data as Record<string, unknown>;
  const entries = Object.entries(obj);
  console.log("");
  for (const [key, value] of entries) {
    if (value === undefined || value === null) continue;

    if (key === "success" && typeof value === "boolean") {
      const icon = value ? `${c.green}✓${c.reset}` : `${c.red}✗${c.reset}`;
      console.log(`${pad}${icon} ${value ? "Success" : "Failed"}`);
      continue;
    }

    if (key === "error" && typeof value === "string") {
      console.log(`${pad}${c.red}error:${c.reset} ${value}`);
      continue;
    }

    if (typeof value === "string") {
      if (value.length > 200) {
        console.log(`${pad}${c.dim}${key}:${c.reset}`);
        const wrapped = value.match(/.{1,100}/g) || [value];
        for (const line of wrapped.slice(0, 20)) {
          console.log(`${pad}  ${line}`);
        }
        if (wrapped.length > 20)
          console.log(`${pad}  ${c.dim}... (${value.length} chars total)${c.reset}`);
      } else {
        console.log(`${pad}${c.dim}${key}:${c.reset} ${value}`);
      }
      continue;
    }

    if (typeof value === "number" || typeof value === "boolean") {
      console.log(`${pad}${c.dim}${key}:${c.reset} ${c.yellow}${value}${c.reset}`);
      continue;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        console.log(`${pad}${c.dim}${key}:${c.reset} ${c.dim}[]${c.reset}`);
      } else if (value.every((v) => typeof v === "string" || typeof v === "number")) {
        console.log(`${pad}${c.dim}${key}:${c.reset} ${value.join(", ")}`);
      } else {
        console.log(`${pad}${c.dim}${key}:${c.reset}`);
        printCompactJson(value, indent + 2);
      }
      continue;
    }

    if (typeof value === "object") {
      console.log(`${pad}${c.dim}${key}:${c.reset}`);
      prettyPrint(value, indent + 2);
      continue;
    }
  }
  console.log("");
}

function printCompactJson(data: unknown, indent: number): void {
  const pad = " ".repeat(indent);
  const jsonStr = JSON.stringify(data, null, 2);
  const lines = jsonStr.split("\n");
  const maxLines = 40;
  for (let i = 0; i < Math.min(lines.length, maxLines); i++) {
    const line = lines[i];
    const colored = line
      .replace(/"([^"]+)":/g, `${c.cyan}"$1":${c.reset}`)
      .replace(/: "([^"]*)"(,?)$/g, `: ${c.green}"$1"${c.reset}$2`)
      .replace(/: (\d+)(,?)$/g, `: ${c.yellow}$1${c.reset}$2`)
      .replace(/: (true|false)(,?)$/g, `: ${c.magenta}$1${c.reset}$2`)
      .replace(/: (null)(,?)$/g, `: ${c.dim}$1${c.reset}$2`);
    console.log(`${pad}${colored}`);
  }
  if (lines.length > maxLines) {
    console.log(`${pad}${c.dim}... (${lines.length - maxLines} more lines)${c.reset}`);
  }
}

// ── Diffs ──
export function diff(path: string, oldVal: unknown, newVal: unknown): string {
  const oldStr = typeof oldVal === "string" ? oldVal : JSON.stringify(oldVal, null, 2);
  const newStr = typeof newVal === "string" ? newVal : JSON.stringify(newVal, null, 2);
  return [
    `${c.bold}${path}${c.reset}`,
    `${c.red}  - ${oldStr}${c.reset}`,
    `${c.green}  + ${newStr}${c.reset}`,
  ].join("\n");
}

export function renderDiffs(
  diffs: Array<{ op: string; path: string; value?: unknown; from?: string }>,
): string {
  return diffs
    .map((d) => {
      const opColors: Record<string, string> = {
        remove: c.red,
        add: c.green,
        replace: c.yellow,
        move: c.blue,
        copy: c.blue,
      };
      const opIcons: Record<string, string> = {
        remove: "━",
        add: "┃",
        replace: "┃",
        move: "↳",
        copy: "⊕",
      };
      const color = opColors[d.op] || c.white;
      const icon = opIcons[d.op] || "│";
      const valueStr =
        "value" in d ? ` → ${c.bold}${JSON.stringify(d.value).slice(0, 100)}${c.reset}` : "";
      return `  ${color}${icon} ${c.bold}[${d.op}]${c.reset} ${c.dim}${d.path}${c.reset}${valueStr}`;
    })
    .join("\n");
}

// ── Interactive prompts ──
export async function confirm(message: string): Promise<boolean> {
  if (process.argv.includes("--yes") || process.argv.includes("-y")) return true;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`  ${message} ${c.dim}[y/N]${c.reset} `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
    });
  });
}

export async function prompt(message: string, defaultValue?: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const suffix = defaultValue ? ` ${c.dim}[${defaultValue}]${c.reset}` : "";
  return new Promise((resolve) => {
    rl.question(`  ${message}${suffix}: `, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue || "");
    });
  });
}

export async function promptHidden(message: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    process.stdout.write(`  ${message}: `);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    let input = "";
    const onData = (ch: Buffer) => {
      const s = ch.toString();
      for (const char of s) {
        if (char === "\n" || char === "\r") {
          if (process.stdin.isTTY) process.stdin.setRawMode(false);
          process.stdin.removeListener("data", onData);
          process.stdout.write("\n");
          rl.close();
          resolve(input);
          return;
        } else if (char === "\u0003") {
          process.exit(130);
        } else if (char === "\u007f" || char === "\b") {
          if (input.length > 0) {
            input = input.slice(0, -1);
            process.stdout.write("\b \b");
          }
        } else {
          input += char;
          process.stdout.write(`${c.dim}•${c.reset}`);
        }
      }
    };
    process.stdin.on("data", onData);
    process.stdin.resume();
  });
}

export async function choose(
  message: string,
  options: string[],
  defaultIndex = 0,
): Promise<number> {
  if (!process.stdout.isTTY) return defaultIndex;
  console.log("");
  for (let i = 0; i < options.length; i++) {
    const marker = i === defaultIndex ? `${c.cyan}❯${c.reset}` : " ";
    const label =
      i === defaultIndex ? `${c.bold}${options[i]}${c.reset}` : `${c.dim}${options[i]}${c.reset}`;
    console.log(`    ${marker} ${c.dim}(${i + 1})${c.reset} ${label}`);
  }
  const answer = await prompt(`  ${message}`, String(defaultIndex + 1));
  const idx = parseInt(answer, 10) - 1;
  return idx >= 0 && idx < options.length ? idx : defaultIndex;
}
