# File Handling

How the runtime detects, parses, and exposes files across all protocol strategies (HTTP, SFTP/FTP, SMB).

## Step Configuration

File handling is not a standalone step type — it is a cross-cutting runtime behavior that applies to any step that produces or consumes files. The `file::<alias>.<suffix>` syntax is used in step config `body` / `content` fields to reference files from previous steps or user uploads.

```typescript
// Reference a file downloaded by a previous step
{ "body": "file::downloadStep.raw" }

// Reference a user-uploaded file
{ "body": '{"fileBase64": "file::document.base64"}' }

// Reference a specific file from a multi-file step
{ "content": 'file::batchDownload["report.csv"].raw' }
```

### file:: Reference Syntax

Use `file::<alias>.<suffix>` in step config `body` / `content` fields:

| Suffix       | Returns                     | Use case                                |
| ------------ | --------------------------- | --------------------------------------- |
| `.raw`       | Original bytes (Uint8Array) | SFTP/FTP put, HTTP raw body upload      |
| `.base64`    | Base64-encoded string       | APIs expecting base64 inside JSON/XML   |
| `.extracted` | Parsed content              | Text fields needing parsed file content |

Constraints:

- Bare `file::<key>` without a suffix is invalid and causes a runtime error
- File references resolve only in body/content fields, not in headers, query params, or URLs
- Multi-file steps use bracket notation: `file::stepId["report.csv"].raw`
- Loop iterations use numeric index: `file::stepId[0].raw`

## Authentication

N/A — file handling is a runtime behavior, not a protocol. Authentication is handled by the protocol skill that produces or consumes the file (http, sftp-smb, etc.).

## File Handling Runtime Details

### Detection Priority

Every response is read as raw bytes. The runtime classifies it using this priority chain:

1. **Magic-byte detection** — known binary signatures (ZIP `PK\x03\x04`, PDF `%PDF`, GZIP `\x1f\x8b`, plus internal ZIP structure checks for Excel/DOCX)
2. **`Content-Disposition: attachment`** — `attachment` or `filename=` in this header forces file treatment
3. **`application/octet-stream`** — explicit octet-stream MIME catches unlabeled binary payloads
4. **25MB size fallback** — only when byte detection returned `RAW`, the response exceeds 25MB, and `Content-Type` is not text-like (`text/*`, `application/json`, `*+json`, `application/xml`)

File server `get` operations always produce files regardless of detected type.

### Classification

| Classification      | Types                       | Destination                                                    |
| ------------------- | --------------------------- | -------------------------------------------------------------- |
| **Binary**          | PDF, Excel, DOCX, ZIP, GZIP | `producedFiles` + `data` (extracted/parsed content)            |
| **Structured text** | JSON, XML, CSV, YAML, HTML  | `data` only (parsed to JS objects)                             |
| **RAW**             | Unrecognized                | File if attachment/octet-stream/25MB fallback, else raw string |

Binary responses expose `stepFileKeys` and populate `sourceData.__files__`. Structured text responses only populate `sourceData.stepId.data`.

### Auto-Parsing

| Type  | Parsed result                                                  |
| ----- | -------------------------------------------------------------- |
| JSON  | Native JS object/array                                         |
| CSV   | Array of objects (header row = keys)                           |
| XML   | JS object tree                                                 |
| HTML  | JS object tree                                                 |
| YAML  | Native JS object                                               |
| Excel | Object keyed by sheet name, each value is array of row objects |
| PDF   | `{ textContent, structuredContent: [{ page, text }] }`         |
| DOCX  | Markdown string                                                |
| ZIP   | Object keyed by entry filename, each value recursively parsed  |
| GZIP  | Recursively parsed inner content                               |
| RAW   | UTF-8 string fallback                                          |

**Excel rules:**

- Excel is never a flat array. It is always `{ "SheetName": [ {row}, ... ] }` — even for single-sheet files
- Access rows via `extracted.SheetName` or `extracted["Sheet1"]`, never `extracted[0]`
- When producing xlsx, use namespace `http://schemas.openxmlformats.org/spreadsheetml/2006/main` (not the truncated path)

### File Aliasing

When a step produces files, the runtime assigns an alias:

| Scenario                    | Alias format                |
| --------------------------- | --------------------------- |
| Single file, non-loop       | `stepId`                    |
| Single file, loop iteration | `stepId[N]`                 |
| Multiple files, non-loop    | `stepId["filename.ext"]`    |
| Multiple files, loop        | `stepId[N]["filename.ext"]` |

Loop steps always use numeric indices — never filenames — even when each iteration fetches a named file. Filename brackets only appear when a single step or iteration returns multiple files in one response.

These aliases are used both in `file::` references and as keys in `sourceData.__files__`.

### stepFileKeys

Each step result exposes `stepFileKeys` — an array of runtime aliases for files produced by that step:

```javascript
sourceData.downloadStep.stepFileKeys; // ["downloadStep"]
sourceData.batchDownload[0].stepFileKeys; // ["batchDownload[0]"]
```

### Accessing Files in Transforms

Inside `transformCode` and `outputTransform`, use `sourceData.__files__` with the runtime alias. Treat `sourceData.__files__` as read-only — the runtime rebuilds it after every step.

```javascript
sourceData.__files__.downloadStep; // single-file step
sourceData.__files__["stepId[0]"]; // loop iteration
```

Available properties on each file object: `filename`, `contentType`, `size`, `raw`, `extracted`, `fileType`, `parseError`.

**base64 access:** `base64` is a lazy getter — it is not stored on the file object by default. Access it directly:

```javascript
sourceData.__files__.myStep.base64; // computes and returns base64 string on first access
```

The base64 value is computed on first access and cached for subsequent reads. It will not appear in `Object.keys()` or `JSON.stringify()` output (non-enumerable). Throws if the file exceeds 500MB — use `.raw` for large files.

Prefer discovering aliases dynamically via `stepFileKeys`:

```javascript
(sourceData) => {
  return (sourceData.fetchThreeFiles.stepFileKeys || []).map(function (alias) {
    var f = sourceData.__files__[alias];
    return { alias: alias, filename: f ? f.filename : null, size: f ? f.size : null };
  });
};
```

### Producing Files From Transforms

Return a `__files__` key from a transform to produce new files. The **key name is the filename** — content type is inferred from the extension. Values can be plain strings, bytes, or full file objects:

```javascript
// Simplest: key = filename, value = string content (auto-encoded to bytes)
(sourceData) => ({
  __files__: {
    "report.csv": Papa.unparse(sourceData.step1.data),
  },
})

// Multiple files with different types
(sourceData) => ({
  __files__: {
    "data.csv": Papa.unparse(sourceData.step1.data),
    "config.yaml": yaml.dump(sourceData.step1.data),
  },
  summary: { rowCount: sourceData.step1.data.length },
})
```

Supported value types for `__files__` entries:

- **String** — auto-encoded to UTF-8 bytes. Filename and content type from the key.
- **Uint8Array / ArrayBuffer** — used as-is. Filename and content type from the key.
- **Object with `raw`** — `raw` is normalized (string/bytes/array), `filename` defaults to key if missing, `contentType` inferred from key extension if missing.
- **Full file object** — `{ filename, contentType, raw }` for explicit control (backwards compatible).

Everything except `__files__` becomes the step's `data`. Single-file transforms get the step ID as alias; multi-file transforms use bracket notation.

**Available libraries in transforms:** The following libraries are available for file generation in any transform code (step transforms and output transforms):

- `Papa` — [papaparse](https://www.papaparse.com/). Use `Papa.unparse(rows)` to generate CSV from an array of objects. Handles quoting, escaping, and special characters automatically.
- `XLSX` — [SheetJS](https://sheetjs.com/). Use `XLSX.utils.json_to_sheet(data)` + `XLSX.write(wb, { type: "array", bookType: "xlsx" })` to generate Excel files.
- `yaml` — [js-yaml](https://github.com/nodeca/js-yaml). Use `yaml.dump(obj)` to generate YAML.

Example — CSV with Papa:

```javascript
(sourceData) => ({
  __files__: { "report.csv": Papa.unparse(sourceData.step1) },
});
```

**Auto-parsing of transform-produced files:** if `extracted` is omitted from the file object, the runtime runs the full detection and parsing pipeline on the raw bytes (same as for HTTP/file server responses). This means a CSV file produced with `raw: "a,b\n1,2"` will automatically get `extracted: [{a: "1", b: "2"}]`. To skip auto-parsing and keep the raw content as-is, set `extracted` explicitly (e.g. `extracted: null`).

**`raw` field rules:**

- `Uint8Array` / `ArrayBuffer` / typed arrays — used as-is for binary content
- String — UTF-8 encoded. Pass a JSON string for structured data: `raw: JSON.stringify(data)`
- Object / array — auto JSON-stringified to UTF-8 bytes. Prefer explicit `JSON.stringify` with an appropriate `contentType` for clarity
- `null` / `undefined` — produces an empty file (0 bytes)
- For binary formats (xlsx, zip, pdf): pass through original bytes via `sourceData.__files__.stepId.raw` — never construct the internal file structure as a JS object

### Returning Files as Tool Output

To make files downloadable from the tool's API response, set `outputFile: true` on the step that produces the file. The output transform is only for shaping JSON data — it has nothing to do with files.

```json
{
  "steps": [
    {
      "id": "generateReport",
      "config": {
        "type": "transform",
        "transformCode": "(sourceData) => ({ __files__: { \"report.csv\": Papa.unparse(sourceData.step1.data) } })"
      },
      "outputFile": true
    }
  ],
  "outputTransform": "(sourceData) => ({ rowCount: sourceData.generateReport.data.length })"
}
```

Only steps with `outputFile: true` have their files stored to S3 and returned as downloadable artifacts. Steps without the flag keep their files internal (for inter-step passing only).

This works on any step type — transform steps, HTTP steps, SFTP/FTP steps. Just set `outputFile: true`.

Use `sg run download <runId>` to download file artifacts from the CLI.

## Common Pitfalls

- Using bare `file::<key>` without `.raw`, `.base64`, or `.extracted` suffix — causes a runtime error
- Placing file references in headers or query params instead of body/content fields — they only resolve in body
- Expecting Excel parsed output to be a flat array — it is always `{ "SheetName": [...] }` even for single-sheet files
- Hardcoding bracket aliases like `sourceData.__files__["step[\"file.csv\"]"]` — prefer `stepFileKeys` or `Object.keys(sourceData.__files__)` to discover aliases dynamically
- Trying to construct binary file internals (xlsx, zip) as JS objects — always pass through original bytes via `.raw`
- Accessing `sourceData.__files__` in step configs — `file::` syntax is for step configs, `sourceData.__files__` is for transform code
- Manually base64-encoding file content with `btoa()` — never do this. Return raw bytes (Uint8Array) or strings directly. The runtime handles encoding automatically. Use `XLSX.write(wb, { type: "array" })` not `type: "buffer"` followed by manual btoa.
- Putting file logic in the output transform — the output transform is for JSON data only. Use `outputFile: true` on the step instead.

## Error Recovery

When a file-related step fails:

1. **File input failure** - Ask the user whether the file is present in the session state and verify whether you can access the file at all
2. **Check the file:: reference** — verify the alias matches a step that actually produces files. Use `stepFileKeys` on the producing step's result to see available aliases.
3. **Verify the suffix** — bare `file::<key>` without `.raw`, `.base64`, or `.extracted` always fails. Choose the suffix based on how the consuming step needs the data.
4. **Check the producing step** — if `stepFileKeys` is empty or undefined, the producing step may not have returned a file. Verify the response is binary or has `Content-Disposition: attachment` (for HTTP), or that the operation is `get` (for file servers).
5. **Check aliasing for loops** — loop iterations use numeric indices (`stepId[0]`), not filenames. If the alias doesn't match, run the producing step and inspect the result to see the actual aliases assigned.
