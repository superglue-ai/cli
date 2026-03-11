import * as fs from "node:fs";
import * as path from "node:path";
import { getConfigDir } from "./config.js";

export interface Draft {
  draftId: string;
  config: any;
  systemIds: string[];
  instruction: string;
  createdAt: string;
}

function getDraftsDir(): string {
  return path.join(getConfigDir(), "drafts");
}

function getDraftPath(draftId: string): string {
  const safeName = draftId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(getDraftsDir(), `${safeName}.json`);
}

export function writeDraft(draft: Draft): void {
  const dir = getDraftsDir();
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(getDraftPath(draft.draftId), JSON.stringify(draft, null, 2));
}

export function readDraft(draftId: string): Draft | null {
  const filePath = getDraftPath(draftId);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

export function deleteDraft(draftId: string): void {
  const filePath = getDraftPath(draftId);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

export function listDrafts(): Draft[] {
  const dir = getDraftsDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as Draft;
      } catch {
        return null;
      }
    })
    .filter((d): d is Draft => d !== null);
}
