# HTTP APIs

Covers REST APIs, GraphQL, webhooks, and any HTTP-based service.

## Step Configuration

```typescript
{
  type: "request",
  systemId: "my_api",
  url: "<<my_api_url>>/v1/users",              // RECOMMENDED: use system URL variable for base URL
  method: "GET",                               // GET, POST, PUT, DELETE, PATCH
  headers: { "Authorization": "Bearer <<my_api_access_token>>" }, // supports <<variables>> and JS expressions
  queryParams: { "limit": "<<limit>>", "status": "active" }, // supports <<variables>> and JS expressions
  body: '{"name": "<<(sourceData) => sourceData.currentItem.name>>"}', // supports <<variables>> and JS expressions
  pagination: { ... }  // optional
}
```

### URL Best Practices

**Prefer system URL variables over hardcoded URLs:**

```typescript
// RECOMMENDED: Environment-agnostic (works with dev/prod switching)
{ "url": "<<salesforce_url>>/services/data/v58.0/sobjects/Account" }

// ACCEPTABLE: When URL differs significantly from system base URL
{ "url": "https://api.stripe.com/v1/customers" }

// AVOID: Hardcoding URLs that match the system's base URL
{ "url": "https://mycompany.salesforce.com/services/data/v58.0/sobjects/Account" }
```

Using `<<systemId_url>>` enables the same tool to work across different environments (dev/prod) without modification. The URL resolves dynamically based on execution mode.

## Authentication Patterns

```javascript
// Bearer token
{ "Authorization": "Bearer <<systemId_access_token>>" }

// API key in header
{ "X-API-Key": "<<systemId_api_key>>" }

// Basic Auth — auto-encoded to Base64, do NOT manually encode
{ "Authorization": "Basic <<systemId_username>>:<<systemId_password>>" }

// Runtime credentials from payload
{ "Authorization": "Bearer <<(sourceData) => sourceData.user_access_token>>" }
```

Headers starting with `x-` are treated as custom headers.
Modern APIs expect auth in headers, NOT query parameters, unless docs explicitly say otherwise.

## Request Behavior

- **GET, HEAD, DELETE, OPTIONS**: Body is always stripped
- **POST, PUT, PATCH**: Body with leading `{` is JSON-parsed; empty body becomes undefined
- Default headers: `Accept: */*`, Chrome-like `User-Agent`
- HTTPS: `rejectUnauthorized: false` (accepts self-signed certs)

### Response Handling

All HTTP responses are read as raw bytes, then classified by `detectFileType` (byte-level detection). See the file-handling skill for the full detection logic and file type reference.

- **Binary types** (PDF, Excel, DOCX, ZIP, GZIP): treated as files. Parsed content also becomes `data`. Later steps can reference the file via `file::<stepId>.raw/base64/extracted`.
- **`application/octet-stream`**: always treated as a file, even if byte-level detection falls back to `RAW`.
- **Large responses over 25 MB**: treated as files as a safety fallback so the runtime does not try to parse a huge unknown blob as RAW text/JSON.
- **RAW + Content-Disposition attachment**: treated as a file.
- **Smaller structured/text responses** (JSON, XML, CSV, YAML, HTML, plain text under the size limit): parsed inline to `data` only.

This means an HTTP step downloading a PDF or large `.bin` file will expose `stepFileKeys` and populate `sourceData.__files__`, while an ordinary JSON API response will usually just populate `sourceData.stepId.data`.

### Body Resolution Order

For HTTP request steps, the runtime processes the body in this order:

1. `<<>>` template variables are resolved via `replaceVariables`
2. The resulting body string is JSON-parsed when possible
3. `file::...` references are resolved on the parsed body object
4. The HTTP strategy decides how to send the final body:
   - raw bytes for `file::<key>.raw` when the **entire body** is a file ref
   - base64 string content for `file::<key>.base64` when the API expects base64 inside JSON/XML
   - `multipart/form-data` when the `Content-Type` header requests it and the body resolves to an object
   - plain string body for strings
   - `JSON.stringify(...)` for ordinary objects

File references are resolved **only in the body**, not in headers, query params, or URLs.

**Avoiding double-encoding:** The runtime stringifies objects at both step 1 (expression → template) and step 4 (object → fetch body). When the body contains nested JSON (e.g. LLM APIs), have `<<>>` expressions return a string via `JSON.stringify(...)`, or use a preceding transform step.

### File Uploads

#### Raw Body Uploads

If the endpoint expects the file as the entire HTTP body, use:

```typescript
{
  method: "PUT",
  headers: { "Content-Type": "application/pdf" },
  body: "file::document.raw"
}
```

This sends the exact original file bytes as the request body.

#### Base64-In-JSON/XML Uploads

If the endpoint expects the file encoded as base64 inside a structured payload, use:

```typescript
{
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: '{"fileBase64":"file::document.base64"}'
}
```

This resolves the file bytes to a base64 string before the final `JSON.stringify(...)`.

#### Automatic Multipart Uploads

If the endpoint expects `multipart/form-data`, set the header and make the body a JSON object of form fields:

```typescript
{
  method: "POST",
  headers: { "Content-Type": "multipart/form-data" },
  body: '{"file":"file::report.raw","description":"monthly export"}'
}
```

The runtime will:

- build a real `FormData` request
- turn `file::...raw` values into file parts using the stored filename and content type
- turn scalar values into text parts
- JSON-stringify non-file objects/arrays into text parts
- remove the user-supplied `Content-Type` header and let `fetch` set the multipart boundary automatically

Restrictions:

- the multipart body must resolve to an object of top-level form fields
- nested file refs inside objects are not supported
- do **not** manually include a multipart boundary in the header
- use `.raw` for file parts, `.base64` for base64 text fields, and `.extracted` only for text fields that should contain parsed content

## Error Detection

### HTTP Status Errors

Non-2xx responses throw with: method, URL, response body preview (1000 chars), masked config, retry count.

### Smart Error Detection in 2xx Responses

Even successful responses are scanned for error indicators:

- `response.code` or `response.status` is 400-599 → throws
- Keys matching `error`, `errors`, `error_message`, `failure_reason`, `failure`, `failed` (up to depth 2) with non-empty values → throws
- Error message includes: _"To prevent this from happening, enable 'Continue on failure' in the step's Advanced Settings."_

Bypass: `failureBehavior: "continue"` skips all error checking. Can be set in the tool playground.

## Retry Logic

### Connection/Server Errors

- Default 1 retry (3 if keep-alive disabled), capped at server max
- Only retries if response was fast (under quick-retry threshold)
- Configurable delay between retries

### Rate Limiting (429)

- Respects `Retry-After` header (seconds or date)
- Without header: exponential backoff `10^n * 1000ms + jitter` (max 1hr per wait)
- Total wait capped at `MAX_RATE_LIMIT_WAIT_MS`
- Separate from general retry count

## Pagination

Makes multiple requests in a loop, merging results. Only configure if you've verified the exact API pagination mechanism from docs.

### Configuration

```typescript
pagination: {
  type: "offsetBased" | "pageBased" | "cursorBased",
  pageSize: "50",
  cursorPath: "meta.next_cursor",   // cursorBased only — JSONPath to cursor
  stopCondition: "(response, pageInfo) => !response.data.meta.next_cursor"
}
```

### Variables (auto-injected)

| Type        | Variable                     | Starts at | Increments by            |
| ----------- | ---------------------------- | --------- | ------------------------ |
| pageBased   | `<<page>>`                   | 1         | 1                        |
| offsetBased | `<<offset>>`                 | 0         | pageSize                 |
| cursorBased | `<<cursor>>`                 | null      | extracted via cursorPath |
| all         | `<<limit>>` / `<<pageSize>>` | pageSize  | —                        |

**CRITICAL**: The matching pagination variable MUST appear in the request (URL, queryParams, headers, or body). Throws if missing.

### Stop Conditions

JS expression evaluated in sandbox. Receives `(response, pageInfo)`:

- `response.data` = parsed API response body
- `response.headers` = response headers
- `pageInfo = { page, offset, cursor, totalFetched }`
- Return `true` to **STOP**

Examples:

```javascript
"!response.data.meta.next_cursor"; // no next cursor
"response.data.items.length === 0"; // empty page
"response.data.hasMore === false"; // explicit flag
"pageInfo.totalFetched >= 1000"; // item cap
```

### Safety Checks (only when stopCondition is set)

1. **Identical pages 1 & 2** (both with data): Throws — pagination params aren't being applied
2. **Both pages empty + stop didn't trigger**: Throws — broken stop condition
3. **Duplicate consecutive response (after page 2)**: Auto-stops

### Without stopCondition (fallback)

- Array shorter than pageSize → stop
- Duplicate response hash (against any previously seen page) → stop
- Non-array response → stop after first request
- Max 500 requests (vs 1000 max with a stopCondition)

### Cursor Extraction

`cursorPath` is a JSONPath expression (auto-prefixed with `$.` if needed). Extracted via `jsonpath-plus`. Null cursor → stop.

**Special characters in cursorPath:** For property names containing `@` (e.g. OData's `@odata.nextLink`), use the property name directly as the cursorPath: `cursorPath: "@odata.nextLink"`. The engine handles `@`-prefixed paths automatically.

## Output

Paginated steps merge all pages into a **single** result object. The step result is always accessed via `sourceData.stepId.data` — it is NOT an array of per-page results. Do NOT call `.map()` on a paginated step result.

Returns single object if one result, array if multiple (unwrapped from single-element array).
