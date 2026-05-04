import * as fs from "node:fs";
import * as path from "node:path";
import type { Command } from "commander";
import type { SuperglueClient } from "@superglue/shared";
import type { CLIConfig } from "../../config.js";
import { output, error, success, info, spinner } from "../../output.js";

type ContextFn = () => { config: CLIConfig; client: SuperglueClient };

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function registerDownloadCommand(parent: Command, getContext: ContextFn): void {
  parent
    .command("download <runId> [fileKey]")
    .description("Download file artifacts from a run")
    .option("--output-dir <path>", "Target directory", ".")
    .action(async (runId: string, fileKey: string | undefined, opts: any) => {
      const { client } = getContext();
      try {
        const run = await client.getRun(runId);
        if (!run) {
          error(`Run not found: ${runId}`);
          process.exit(1);
        }

        const fileArtifacts = run.fileArtifacts || [];
        if (fileArtifacts.length === 0) {
          error(`No file artifacts for run ${runId}`);
          process.exit(1);
        }

        const toDownload = fileKey
          ? fileArtifacts.filter((f) => f.fileKey === fileKey)
          : fileArtifacts;

        if (toDownload.length === 0) {
          error(`File artifact not found: ${fileKey}`);
          info(`Available file artifacts: ${fileArtifacts.map((f: any) => f.fileKey).join(", ")}`);
          process.exit(1);
        }

        const outDir = path.resolve(opts.outputDir);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        for (const file of toDownload) {
          const downloadUrl = file.downloadUrl;
          if (!downloadUrl) {
            error(`No download URL for ${file.fileKey} — file storage may not be configured`);
            continue;
          }

          const spin = spinner(`Downloading ${file.filename}...`);
          try {
            const response = await fetch(downloadUrl);
            if (!response.ok) {
              spin.stop();
              error(`Download failed for ${file.filename}: HTTP ${response.status}`);
              continue;
            }

            const buffer = Buffer.from(await response.arrayBuffer());
            const baseName = path.basename(file.filename);
            const safeName =
              !baseName || baseName === "." || baseName === ".." ? "download" : baseName;
            let outPath = path.join(outDir, safeName);
            if (fs.existsSync(outPath)) {
              const ext = path.extname(safeName);
              const stem = safeName.slice(0, safeName.length - ext.length);
              let i = 1;
              while (fs.existsSync(outPath)) {
                outPath = path.join(outDir, `${stem}_${i}${ext}`);
                i++;
              }
            }
            fs.writeFileSync(outPath, buffer);
            spin.stop();
            success(`Downloaded ${file.filename} (${formatBytes(buffer.length)}) → ${outPath}`);
          } catch (err: any) {
            spin.stop();
            error(`Download failed for ${file.filename}: ${err.message}`);
          }
        }
      } catch (err: any) {
        error(err.message);
        process.exit(1);
      }
    });
}
