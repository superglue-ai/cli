import type { CLIPreset } from "./config.js";

export interface PresetDef {
  commands: Set<string>;
  toolRunModes: Set<string>;
}

export const PRESETS: Record<CLIPreset, PresetDef> = {
  runner: {
    commands: new Set(["init", "tool.run", "tool.find", "run.list", "run.get", "skill", "update"]),
    toolRunModes: new Set(["tool"]),
  },
  builder: {
    commands: new Set([
      "init",
      "tool.run",
      "tool.find",
      "tool.build",
      "tool.edit",
      "tool.save",
      "system.call",
      "system.docs",
      "system.find",
      "run.list",
      "run.get",
      "skill",
      "update",
    ]),
    toolRunModes: new Set(["tool", "config", "config-file", "draft"]),
  },
  admin: {
    commands: new Set(["*"]),
    toolRunModes: new Set(["tool", "config", "config-file", "draft"]),
  },
};

export function isCommandAllowed(preset: CLIPreset, command: string): boolean {
  const def = PRESETS[preset];
  return def.commands.has("*") || def.commands.has(command);
}

export function isToolRunModeAllowed(preset: CLIPreset, mode: string): boolean {
  return PRESETS[preset].toolRunModes.has(mode);
}

const COMMAND_DISPLAY_NAMES: Record<string, string> = {
  "system.docs": "system search-docs",
};

export function presetBlockedError(command: string, preset: CLIPreset): string {
  const display = COMMAND_DISPLAY_NAMES[command] || command.replace(".", " ");
  return `'sg ${display}' is not available in the '${preset}' preset. Change preset in .superglue/config.json or set SUPERGLUE_CLI_PRESET.`;
}
