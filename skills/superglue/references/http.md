# HTTP

## Step Configuration

```typescript
{
  type: "request",
  systemId: "my_api",
  url: "<<my_api_url>>/v1/users",
  method: "GET",
  headers: { "Authorization": "Bearer <<my_api_access_token>>" },
  queryParams: { "limit": "<<limit>>", "status": "active" },
  body: '{"name": "<<(sourceData) => sourceData.currentItem.name>>"}',
  pagination: { ... }
}
```

All fields support `<<variable>>` and `<<(sourceData) => ...>>` expressions.

### Fields

| Field         | Required | Notes                                                                                                        |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `url`         | yes      | Use `<<systemId_url>>` for the base; join with exactly one `/` (the system's `url` may or may not end in `/` |
| `method`      | yes      | `GET`, `POST`, `PUT`, `DELETE`, `PATCH`                                                                      |
| `headers`     | no       | Auth headers, content type, custom headers                                                                   |
| `queryParams` | no       | Key-value pairs appended to URL                                                                              |
| `body`        | no       | Stripped for GET/HEAD/DELETE/OPTIONS                                                                         |
| `pagination`  | no       | See Pagination section                                                                                       |
| `systemId`    | no       | Links system credentials and URL. Omit for public APIs                                                       |

For APIs that require the same query key multiple times, use an array value:
`{ metadataHeaders: ["From", "Subject"] }` -> `?metadataHeaders=From&metadataHeaders=Subject`.

## Authentication

Credentials are never injected automatically. You must place auth headers explicitly using `<<systemId_credentialKey>>` syntax.

```javascript
// Bearer token (including OAuth — token refresh is automatic, header is not)
{ "Authorization": "Bearer <<systemId_access_token>>" }

// API key
{ "X-API-Key": "<<systemId_api_key>>" }

// Basic Auth — auto-encoded to Base64, do NOT manually encode
{ "Authorization": "Basic <<systemId_username>>:<<systemId_password>>" }

// Runtime credentials from payload
{ "Authorization": "Bearer <<(sourceData) => sourceData.user_access_token>>" }
```

### SOAP Authentication

Some APIs (e.g. Salesforce) use SOAP XML login where credentials are embedded in the request body, not in headers. Multiple `<<>>` placeholders can appear adjacent — each is resolved independently and the results are concatenated.

```typescript
{
  method: "POST",
  url: "https://test.salesforce.com/services/Soap/u/59.0",
  headers: {
    "Content-Type": "text/xml; charset=UTF-8",
    "SOAPAction": "login"
  },
  body: '<?xml version="1.0" encoding="utf-8"?><env:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/"><env:Body><n1:login xmlns:n1="urn:partner.soap.sforce.com"><n1:username><<systemId_username>></n1:username><n1:password><<systemId_password>><<systemId_security_token>></n1:password></n1:login></env:Body></env:Envelope>'
}
```

`<<systemId_password>><<systemId_security_token>>` resolves to the password and token concatenated — no separator needed. This works in URL, headers, and body fields.

### Parsing XML responses

XML responses (SOAP and other XML APIs) are auto-parsed to an object on `sourceData.stepId.data`. The parser has quirks you MUST account for in transforms and stopConditions — probe the real response with a small page before writing selectors:

- **Every tag name is UPPERCASED.** `<response><record>` becomes `RESPONSE.RECORD`, regardless of the source casing. Always select uppercase keys.
- **Single vs multiple children collapse.** One child element parses to an object; multiple with the same tag parse to an array. Normalize before mapping: `const rows = Array.isArray(x) ? x : (x ? [x] : [])`.
- **Element attributes become keys on the element object** (also uppercased). `<data count="2" total="127">` gives `DATA.COUNT` and `DATA.TOTAL` alongside the child records.
- **Text with attributes goes to `_TEXT`.** An element with both attributes and text content stores the text under a `_TEXT` key. Empty elements (`<field></field>`) become `{}`.
- **Numbers and booleans are strings.** Everything is a string; wrap with `Number(...)` where you need arithmetic.

## HTTP Runtime Details

### Request Behavior

- **GET, HEAD, DELETE, OPTIONS**: body is always stripped
- **POST, PUT, PATCH**: body with leading `{` is JSON-parsed; empty body becomes undefined
- Default headers: `Accept: */*`, Chrome-like `User-Agent`
- HTTPS: `rejectUnauthorized: false` (accepts self-signed certs)

### Body Resolution

The runtime processes the body in this order:

1. `<<>>` template variables are resolved — object/array returns are `JSON.stringify`'d before splicing
2. The resulting string is JSON-parsed when possible
3. `file::` references are resolved on the parsed object
4. Final send format is determined:
   - raw bytes when the entire body is `file::<key>.raw`
   - base64 string for `file::<key>.base64`
   - `multipart/form-data` when the `Content-Type` header requests it and body resolves to an object
   - `JSON.stringify(...)` for objects
   - plain string for everything else

File references resolve only in the body, not in headers, query params, or URLs.

**Double-encoding risk:** the runtime stringifies at both step 1 (expression into template) and step 4 (object into fetch body). When the body contains nested JSON (e.g. LLM APIs), have `<<>>` expressions return a string via `JSON.stringify(...)`, or use a preceding transform step.

### File Uploads

**Raw body** — send a file as the entire HTTP body:

```typescript
{
  method: "PUT",
  headers: { "Content-Type": "application/pdf" },
  body: "file::document.raw"
}
```

**Base64-in-JSON** — embed a base64-encoded file inside a structured payload:

```typescript
{
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: '{"fileBase64":"file::document.base64"}'
}
```

**Multipart form** — set the `Content-Type` header and provide a JSON object of form fields:

```typescript
{
  method: "POST",
  headers: { "Content-Type": "multipart/form-data" },
  body: '{"file":"file::report.raw","description":"monthly export"}'
}
```

The runtime builds a real `FormData` request: `file::...raw` values become file parts, scalars become text parts, non-file objects/arrays are JSON-stringified into text parts. The user-supplied `Content-Type` header is removed so `fetch` sets the boundary automatically.

Multipart restrictions:

- Body must resolve to a flat object of form fields
- Nested file refs inside objects are not supported
- Do not manually set a multipart boundary
- Use `.raw` for file parts, `.base64` for base64 text fields, `.extracted` for parsed content fields

### Response Handling

All HTTP responses are read as raw bytes, then classified by byte-level detection (see `file-handling.md` for the full detection logic).

- **File responses**: formats classified as files by `file-handling.md` are stored as files, and parsed content populates `data` when extraction is available. Later steps can reference them via `file::<stepId>.raw/base64/extracted`.
- **`application/octet-stream`**: always treated as a file.
- **Responses over 25 MB**: treated as files as a safety fallback.
- **RAW + `Content-Disposition: attachment`**: treated as a file.
- **Inline responses**: formats classified as structured or plain text by `file-handling.md` populate `data` without producing a stored file unless another file rule applies.

### XML Response Casing

XML responses are parsed into a JSON tree with ALL tag names normalized to UPPERCASE — the parsed keys will not match the raw document's casing. This applies identically to `sg system call` and to request steps in tools. A raw `fetch()` inside a transform step is the exception: it returns the original document with its real casing (often lowercase envelope tags with uppercase field tags). Never write string-level XML parsing logic in a transform from memory of what `sg system call` showed — capture a raw probe first (e.g. return `{ rawXml: xml.slice(0, 1500) }`), and guard against self-closing empty containers (`<data/>` has no closing tag) and repeated sibling result blocks.

### Error Detection

Non-2xx responses throw with method, URL, response body preview (1000 chars), masked config, and retry count. Any response with status in the 2xx range is treated as success and returned to the step as-is — the runtime does not scan successful response bodies for error fields, so APIs that return HTTP 200 with `{ "error": "..." }` must be handled by your transform or by setting a `stopCondition`/assertion at the step level.

Bypass: set `failureBehavior: "continue"` to skip the non-2xx throw and return the response anyway.

### Retry Behavior

**Connection/server errors:**

- Default 5 retries, configurable via `retries` on the step
- Retries on fetch-level errors (network/DNS/abort except timeout) and on 5xx responses
- Fixed delay between retries (default 1000ms, configurable via `retryDelay`)

**Rate limiting (429):**

- Counts against the same retry budget as 5xx/network errors
- Respects `Retry-After` header (seconds or HTTP-date)
- Without header: exponential backoff `10^n * 1000ms + jitter` (capped at 1hr per wait)
- Total wait across all 429 retries capped at `MAX_RATE_LIMIT_WAIT_MS` (1hr)

**Timeouts:** Request timeout aborts the fetch and throws immediately — timeouts are not retried.

### Pagination

Makes multiple requests in a loop, merging results. Only configure after verifying the exact API pagination mechanism from docs.

**Configuration:**

```typescript
pagination: {
  type: "offsetBased" | "pageBased" | "cursorBased",
  pageSize: "50",
  cursorPath: "meta.next_cursor",   // cursorBased only — dot-path to cursor
  stopCondition: "(response, pageInfo) => !response.data.meta.next_cursor"
}
```

**Variables** — the matching variable MUST appear in the request (URL, queryParams, headers, or body). Throws if missing.

| Type        | Variable                     | Starts at | Increments by            |
| ----------- | ---------------------------- | --------- | ------------------------ |
| pageBased   | `<<page>>`                   | 1         | 1                        |
| offsetBased | `<<offset>>`                 | 0         | pageSize                 |
| cursorBased | `<<cursor>>`                 | null      | extracted via cursorPath |
| all         | `<<limit>>` / `<<pageSize>>` | pageSize  | —                        |

**Stop conditions** — JS expression evaluated in sandbox. Receives `(response, pageInfo, sourceData)`:

- `response.data` = parsed API response body
- `response.headers` = response headers
- `pageInfo = { page, offset, cursor, totalFetched, mergedResult }`
- `pageInfo.totalFetched` counts the merged paginated result including the current page
- `pageInfo.mergedResult` is the accumulated paginated result including the current page
- `sourceData` contains the current step input data, with payload fields at the root plus previous step results
- Return `true` to STOP

```javascript
"!response.data.meta.next_cursor";
"response.data.items.length === 0";
"response.data.hasMore === false";
"pageInfo.totalFetched >= 1000";
"pageInfo.totalFetched >= sourceData.maxResults";
```

**Cursor extraction:** `cursorPath` is a simple dot-separated property path (e.g. `meta.next_cursor`, `data.0.id`) resolved against the parsed response body. It is not a JSONPath expression — wildcards, filters, and `$.` prefixes are not supported. For property names containing `@` (e.g. OData `@odata.nextLink`), use the name directly as the path. Null/undefined cursor stops pagination.

**Safety checks (when stopCondition is set):**

1. Identical pages 1 and 2 (both with data): throws — pagination params are not being applied
2. Both pages empty + stop did not trigger: throws — broken stop condition
3. Duplicate consecutive response after page 2: auto-stops

**Without stopCondition (fallback):**

- Array shorter than pageSize: stop
- Duplicate response hash against any previously seen page: stop
- Non-array response: stop after first request
- Max 500 requests (vs 1000 max with a stopCondition)

**Paginated step results:** all pages merge into a single result. Access via `sourceData.stepId.data` — it is NOT an array of per-page results. Do not call `.map()` on a paginated step result. Returns single object if one result, array if multiple (unwrapped from single-element array).

### File Output

When an HTTP step downloads a file (PDF, CSV, binary response), set `outputFile: true` on the step to make it downloadable by the user. Without the flag, downloaded files stay internal (only accessible to subsequent steps via `file::` references).

## Common Pitfalls

- Hardcoding base URLs instead of using `<<systemId_url>>`.
- Wrong slash at the `<<systemId_url>>` join. The placeholder resolves to the system's `url` exactly as stored, which may or may not end in `/`. Read the `url` shown by `sg system find` and write the path so there is exactly one `/` between base and path: against a base with no trailing slash, `<<systemId_url>>crm/v3/...` becomes a broken host (`https://api.hubapi.comcrm/...`) that silently hits the wrong server; against a base ending in `/`, a leading `/` produces `//`.
- Forgetting auth headers entirely — nothing is injected automatically, including for OAuth systems (only token refresh is automatic)
- Forgetting `outputFile: true` on steps that download files the user wants
- Putting pagination variables in the config but not setting a `pagination` block, or vice versa
- Using `<<currentItem.id>>` — must use arrow function syntax: `<<(sourceData) => sourceData.currentItem.id>>`
- Mixing multiple `<<>>` expressions in one body string when the API expects nested JSON — use a transform step instead
- Setting `method: "POST"` for GraphQL queries without `modify: false` — POST that only reads should not be marked as modifying

## Error Recovery

When an HTTP step fails and the cause is not immediately clear:

1. **Isolate endpoint vs system-level issues** — use `sg system call` to test a different endpoint on the same system. If multiple endpoints fail, the issue is likely global authentication or system configuration. If only one fails, the issue is endpoint-specific (wrong URL, missing params, incorrect method or authentication scopes).

2. **Check credential scopes and system-side configuration** — a 403 or empty response often means the API key or OAuth token lacks required scopes, or the resource is restricted server-side. Use `sg system search-docs` or a web search to look up required scopes/permissions for the endpoint.

3. **Verify request shape against API docs** — use `sg system search-docs` and web search to confirm the endpoint URL, required headers, query parameters, body format, and expected method. APIs change across versions. Search for the error message and the endpoint in docs and online.

4. **Check for rate limiting** — 429 errors are retried automatically with backoff, but persistent 429s may mean the API key has hit a quota. Check API dashboard or docs for rate limit details.
