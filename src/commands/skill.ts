import * as fs from "node:fs";
import * as path from "node:path";
import type { Command } from "commander";
import { error } from "../output.js";

// In dev: __dirname is src/commands/, skills is at ../../skills/superglue
// In built bundle: __dirname is dist/, skills is at ./skills/superglue (copied by build script)
const SKILLS_DIR = fs.existsSync(path.resolve(__dirname, "skills/superglue"))
  ? path.resolve(__dirname, "skills/superglue")
  : path.resolve(__dirname, "../../skills/superglue");

export function registerSkillCommand(program: Command): void {
  program
    .command("skill")
    .description("Print the superglue skill reference (SKILL.md) for AI agents")
    .argument("[topic]", "Optional topic: references/<topic>.md (e.g. postgres, http, integration)")
    .action((topic?: string) => {
      const file = topic
        ? path.join(SKILLS_DIR, "references", `${topic}.md`)
        : path.join(SKILLS_DIR, "SKILL.md");

      if (!fs.existsSync(file)) {
        if (topic) {
          const refsDir = path.join(SKILLS_DIR, "references");
          const available = fs.existsSync(refsDir)
            ? fs
                .readdirSync(refsDir)
                .filter((f) => f.endsWith(".md"))
                .map((f) => f.replace(".md", ""))
            : [];
          error(`Topic not found: ${topic}. Available: ${available.join(", ") || "none"}`);
        } else {
          error(`Skill file not found: ${file}`);
        }
        process.exit(1);
      }

      process.stdout.write(fs.readFileSync(file, "utf-8"));
    });
}
