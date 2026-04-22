# File Handling

How the runtime detects, parses, and exposes files across all protocol strategies (HTTP, FTP, SFTP, SMB).

## When Does a Response Become a File?

Every response is read as raw bytes. The runtime decides whether it routes to `producedFiles` (i.e. `sourceData.__files__`) or inline `data` using a priority chain — **not** based on size alone:

1. **Magic-byte detection** (primary) — the raw bytes are inspected for known binary signatures (ZIP `PK\x03\x04`, PDF `%PDF`, GZIP `\x1f\x8b`, plus internal ZIP structure checks for Excel/DOCX). If matched, the response is a file regardless of size or HTTP headers. A 1KB ZIP and a 500MB ZIP both go to `__files__`.
2. **`Content-Disposition: attachment`** — any response with `attachment` or `filename=` in this header becomes a file, even if byte detection found structured text.
3. **`application/octet-stream`** — explicit octet-stream MIME becomes a file, catching binary payloads whose bytes don't match a known signature.
4. **25MB size fallback** (last resort) — only applies when byte detection returned `RAW` (unrecognized format), the response is larger than 25MB, **and** the `Content-Type` is not clearly text-like (`text/*`, `application/json`, `*+json`, `application/xml`, etc.). This is the only path where size matters.

Structured text responses (JSON, XML, CSV, YAML, HTML) that pass none of the above checks go to `data` only — no file entry.

| Classification      | Types                       | Where result lives                                             |
| ------------------- | --------------------------- | -------------------------------------------------------------- |
| **Binary**          | PDF, Excel, DOCX, ZIP, GZIP | `producedFiles` + `data` (extracted/parsed content)            |
| **Structured text** | JSON, XML, CSV, YAML, HTML  | `data` only (parsed to JS objects)                             |
| **RAW**             | Unrecognized                | File if attachment/octet-stream/25MB fallback, else raw string |

Binary responses expose `stepFileKeys` and populate `sourceData.__files__`. Structured text responses only populate `sourceData.stepId.data`.

File server `get` operations always produce files regardless of detected type — content goes into both `data` and `producedFiles`.

## Auto-Parsing

| Type  | Parsed result                                                 |
| ----- | ------------------------------------------------------------- |
| JSON  | Native JS object/array                                        |
| CSV   | Array of objects (header row = keys)                          |
| XML   | JS object tree                                                |
| HTML  | JS object tree                                                |
| YAML  | Native JS object                                              |
| Excel | Object keyed by sheet name → array of row objects (see below) |
| PDF   | `{ textContent, structuredContent: [{ page, text }] }`        |
| DOCX  | Markdown string                                               |
| ZIP   | Object keyed by entry filename, each value recursively parsed |
| GZIP  | Recursively parsed inner content                              |
| RAW   | UTF-8 string fallback                                         |

Detection is heuristic for text formats. YAML requires `---`, `%YAML`, or multiple `key: value` lines to be recognized. Short or ambiguous YAML can fall through to RAW and appear as a plain string instead of a parsed object — both in `.data` and `.extracted`.

### Excel rules

- Excel is NEVER a flat array. It is always `{ "SheetName": [ {row}, ... ] }` — even for single-sheet files.
- Access rows via `extracted.SheetName` or `extracted["Sheet1"]`, never `extracted[0]`.
- When producing xlsx, use namespace `http://schemas.openxmlformats.org/spreadsheetml/2006/main` (not the truncated path).

## file:: Reference Syntax

Use `file::<alias>.<suffix>` in step config `body` / `content` fields:

| Suffix       | Returns                     | Use case                                |
| ------------ | --------------------------- | --------------------------------------- |
| `.raw`       | Original bytes (Uint8Array) | SFTP/FTP put, HTTP raw body upload      |
| `.base64`    | Base64-encoded string       | APIs expecting base64 inside JSON/XML   |
| `.extracted` | Parsed content              | Text fields needing parsed file content |

Rules:

- Bare `file::<key>` without a suffix is **NOT valid** — causes a runtime error
- File references are resolved **only in body/content fields**, not in headers, query params, or URLs
- For multi-file steps, use bracket notation: `file::stepId["report.csv"].raw`
- For loop iterations: `file::stepId[0].raw`
- Important: base64 access in transforms is capped at 500MB by design, so base64 encoded binary in transform steps is only available for files smaller than this

## Using file:: with sg system call / inline runs

`file::` is a body/content token, not a URL scheme — inline runs route by `url` protocol, so passing `file::<alias>` as the URL fails with `Unsupported URL protocol`. Put `file::<alias>.raw/.base64/.extracted` in `body` only, with a real protocol URL. To preview an uploaded file, build a transform-only inline tool that returns `sourceData.__files__.<alias>.extracted` as `data`, or echo it through `https://httpbin.org/anything`.

## File Aliasing

When a step produces files, the runtime first chooses a **root alias**:

- non-loop step: `stepId`
- loop iteration: `stepId[N]`

Then it decides whether that root needs a filename suffix:

- if that step/iteration produced **exactly one file**, the alias is just the root
- if that step/iteration produced **multiple files**, append `["filename.ext"]` to distinguish them

Examples:

- one direct download: `downloadReport`
- one loop iteration download: `downloadReport[0]`
- one batch step returning multiple files: `downloadReport["summary.csv"]`
- one loop iteration returning multiple files: `downloadReport[0]["summary.csv"]`

This is about **one file vs many files at that step/iteration**, not about whether the runtime knows the filename. File server `get` operations know the filename, but single-file outputs still use the plain step ID (or `stepId[N]`) alias.

Loop steps (those with a `dataSelector` that iterates) always use numeric indices — never filenames — even when each iteration fetches a named file. Filename brackets only appear when a single step or iteration returns multiple files in one response.

These aliases are used both in `file::` references and as keys in `sourceData.__files__`.

## Accessing Files in Transforms

Inside `transformCode` and `outputTransform`, use `sourceData.__files__` with the **runtime alias**:

```javascript
sourceData.__files__.downloadStep; // correct (step ID for single file)
sourceData.__files__["doubled.csv"]; // wrong (local filename)
```

For multi-file aliases with bracket notation, prefer discovering aliases from `stepFileKeys` or
`Object.keys(sourceData.__files__)` instead of hardcoding quoted alias strings inside the transform
code string. This avoids JSON/JS escaping mistakes like:

```javascript
sourceData.__files__['fetchThreeFiles[".bashrc"]']; // brittle inside JSON-encoded transform strings
```

Prefer:

```javascript
(sourceData) => {
  return (sourceData.fetchThreeFiles.stepFileKeys || []).map(function (alias) {
    var f = sourceData.__files__[alias];
    return {
      alias: alias,
      filename: f ? f.filename : null,
      size: f ? f.size : null,
    };
  });
};
```

`sourceData.__files__` is **read-only**. To produce new files from a transform, return them via a `__files__` key:

```javascript
(sourceData) => ({
  summary: "processed",
  __files__: {
    "output.csv": {
      filename: "output.csv",
      contentType: "text/csv",
      raw: new TextEncoder().encode("a,b\n1,2\n"),
    },
  },
});
```

Everything except `__files__` becomes the step's `data`. Single-file transforms get the step ID as alias; multi-file transforms use bracket notation.

### `raw` rules

- `raw` accepts: `Uint8Array | ArrayBuffer | number[] | string | object | null`.
  - **String** → UTF-8 encoded. Pass a JSON string for structured data: `raw: JSON.stringify(data)`.
  - **Object / array of objects** → automatically JSON-stringified to UTF-8 bytes. Works, but prefer explicit `JSON.stringify` with a `text/csv` or `application/json` contentType for clarity.
  - **`null` / `undefined`** → produces an empty file (0 bytes).
  - **`Uint8Array` / `ArrayBuffer` / `number[]`** → used as-is for binary content.
- For binary formats (xlsx, zip, pdf): pass through original bytes via `sourceData.__files__.stepId.raw` — never construct the internal file structure as a JS object.

## stepFileKeys

Each step result exposes `stepFileKeys` — an array of runtime aliases for files produced by that step:

```javascript
sourceData.downloadStep.stepFileKeys; // ["downloadStep"]
sourceData.batchDownload[0].stepFileKeys; // ["batchDownload[0]"]
```

Use `stepFileKeys` to dynamically discover which file aliases are available from a step.
