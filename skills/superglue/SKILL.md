---
name: superglue
description: Build, test, deploy, and integrate superglue API tools via the sg CLI. Use when working with superglue tools, systems, APIs, the sg command, or integrating tools into codebases (SDK, REST API, webhooks). Covers tool configuration, credential management, OAuth, pagination, multi-step workflows, and production deployment.
---

# superglue CLI (`sg`) — Agent Reference

## CRITICAL RULES — READ FIRST

**Authentication & Credentials:**

- **Auth headers MUST be set explicitly** — credentials are NEVER auto-injected into requests
- Every request step (in tools AND `sg system call`) must include the appropriate auth header using `<<systemId_credentialKey>>` syntax
- OAuth systems also require explicit headers — only token refresh is automatic

**Pre-Building Testing:**

- **ALWAYS use `sg system call` to test endpoints BEFORE building tools**
- Verify authentication works, understand response structure, confirm field names
- Never guess API responses — test them first
- This prevents 90% of tool failures

**Example - `sg system call` with auth:**

```bash
sg system call --system-id notion --url "https://api.notion.com/v1/search" \
  --method POST \
  --headers '{"Authorization":"Bearer <<notion_access_token>>","Notion-Version":"2022-06-28"}' \
  --body '{"filter":{"property":"object","value":"page"}}'
```

**Example - Tool step with auth:**

```json
{
  "headers": {
    "Authorization": "Bearer <<systemId_access_token>>"
  }
}
```

**Other Critical Rules:**

- `systemId` goes on each step's `config`, NOT at the tool level
- Steps execute sequentially; each step can reference previous step results
- `id` fields must be kebab-case for tools, snake_case for systems
- Simple `<<varName>>` only works for **top-level keys** (no dots, no nesting)
- For nested access use arrow functions: `<<(sourceData) => sourceData.currentItem.id>>`
- ALWAYS access step results via `.data`: `sourceData.stepId.data` not `.results`

---

## Quick Start

```bash
npm install -g @superglue/cli
sg init                        # guided setup
sg system list                 # verify connection
sg tool build --config '{"id":"...","instruction":"...","steps":[...]}'
sg tool run --draft <draftId>
sg tool save --draft <draftId>
```

**Config:** `SUPERGLUE_API_KEY` + `SUPERGLUE_API_ENDPOINT` env vars, or `.superglue/config.json` (created by `sg init`).
**Priority:** CLI flags > env vars > config file.

## Global Flags

| Flag               | Description                                 |
| ------------------ | ------------------------------------------- |
| `--json`           | Force JSON output (auto-enabled in non-TTY) |
| `-y, --yes`        | Auto-accept all confirmations               |
| `--api-key <key>`  | Override API key                            |
| `--endpoint <url>` | Override API endpoint                       |

---

## Command Reference

### `sg init`

Interactive setup — API key, endpoint, output mode, policies. Creates `.superglue/`.

### Tool Commands

**`sg tool build`** — Register a tool config. Returns a `draftId`. Not AI-powered — you provide the full config.

```bash
sg tool build --config tool.json                    # from file
sg tool build --config '{"id":"...","steps":[...]}'  # inline JSON
sg tool build --id my-tool --instruction "..." --steps steps.json --payload '{"key":"val"}'
```

| `--config <file-or-json>` | Full JSON config (file path or inline JSON string) |
| `--id <id>` | Tool ID (kebab-case) |
| `--instruction <text>` | Human-readable description |
| `--steps <file>` | JSON file with steps array |
| `--payload <json>` | Sample payload (generates inputSchema) |
| `--file <key=path>` | Attach file reference (repeatable) |

**`sg tool run`** — Execute a draft or saved tool.

```bash
sg tool run --draft <draftId> --payload '{"userId":"123"}'
sg tool run --tool my-tool --payload-file payload.json
```

| `--draft <id>` / `--tool <id>` | Draft ID or saved tool ID |
| `--payload <json>` / `--payload-file <path>` | Payload |
| `--include-step-results` | Include raw step results |
| `--include-config` | Include full tool config |

**`sg tool edit`** — Apply JSON Patch (RFC 6902) operations.

```bash
sg tool edit --draft <draftId> --patches '[{"op":"replace","path":"/steps/0/config/url","value":"..."}]'
sg tool edit --tool my-tool --patches patches.json --test --payload '{...}'
```

| `--patches <json-or-file>` | JSON Patch array (inline or file) |
| `--test` | Run patched tool after accepting |

**`sg tool save`** — Persist draft to database. Deletes draft file on success.

```bash
sg tool save --draft <draftId>
```

**`sg tool list` / `sg tool find`**

```bash
sg tool list                    # all non-archived tools
sg tool find "shopify orders"   # search (compact results)
sg tool find --id my-tool       # exact ID lookup (full config)
```

### System Commands

**`sg system create`**

```bash
sg system create --id slack --template slack --sensitive-credentials client_secret
sg system create --id my_api --url https://api.example.com --credentials '{"api_key":"..."}' --sensitive-credentials api_key
```

| `--id <id>` | System ID (lowercase, underscores only) |
| `--url <url>` | API base URL |
| `--template <id>` | Template ID (stripe, shopify, slack, etc.) |
| `--credentials <json>` | Non-sensitive credentials |
| `--sensitive-credentials <fields>` | Comma-separated fields to prompt for securely |
| `--docs-url <url>` | Documentation URL to scrape |

**`sg system edit`** — Update system config or credentials.
**`sg system list` / `sg system find`** — List or search systems.

**`sg system call`** — **CRITICAL for tool building.** Make authenticated calls to APIs, databases, and file servers. Use this to:

- Test system authentication works
- Explore API endpoints and response structures
- Verify field names and data shapes BEFORE building tools
- Debug failing tools by testing individual endpoints

```bash
# Include auth header with credential placeholder
sg system call --url https://api.example.com/users \
  --system-id my_api \
  --headers '{"Authorization":"Bearer <<my_api_access_token>>"}'

# POST request with auth and body
sg system call --url https://api.example.com/users \
  --system-id my_api \
  --method POST \
  --headers '{"Authorization":"Bearer <<my_api_access_token>>"}' \
  --body '{"name":"test"}'

# Database query (Postgres)
sg system call --url "postgres://<<my_db_host>>:5432/mydb" \
  --system-id my_db \
  --body '{"query":"SELECT * FROM users LIMIT 5"}'

# File server (SFTP)
sg system call --url "sftp://<<my_sftp_host>>:22/data" \
  --system-id my_sftp \
  --body '{"operation":"list","path":"/"}'
```

| Flag                | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `--url <url>`       | Full URL with protocol (http/https/postgres/sftp/ftp/smb) |
| `--system-id <id>`  | System ID for credential injection                        |
| `--method <method>` | HTTP method (GET, POST, PUT, DELETE, PATCH)               |
| `--headers <json>`  | HTTP headers JSON with credential placeholders            |
| `--body <string>`   | Request body (JSON string)                                |
| `--file <key=path>` | File references (repeatable)                              |

**`sg system docs`** — Search system documentation.

```bash
sg system docs --system-id slack --keywords "send message channels"
```

**`sg system oauth`** — Authenticate via OAuth.

```bash
sg system oauth --system-id gmail --scopes "https://www.googleapis.com/auth/gmail.readonly"
sg system oauth --system-id my_api --grant-type client_credentials --scopes "read write"
```

| `--system-id <id>` | Required |
| `--scopes <scopes>` | Space-separated OAuth scopes (required) |
| `--grant-type <type>` | `authorization_code` (default) or `client_credentials` |

### Run Commands

**`sg run list`** — List execution runs. Filter by `--tool`, `--status`, `--source`, `--limit`.
**`sg run get <runId>`** — Get run details. `--fetch-results` to include data.

---

## Tool Configuration — Full Schema

```json
{
  "id": "kebab-case-tool-name",
  "instruction": "Brief human-readable description of what this tool does",
  "steps": [
    {
      "id": "unique-step-id",
      "config": {
        "systemId": "system-id",
        "url": "https://api.example.com/endpoint?param=<<payload.field>>",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer <<system-id_access_token>>"
        },
        "queryParams": { "limit": "10" },
        "body": "{ \"key\": \"<<payload.field>>\" }"
      },
      "dataSelector": "(sourceData) => sourceData.previousStep.data.items",
      "transformCode": "(items) => items.map(i => ({ id: i.id, name: i.name }))",
      "failureBehavior": "abort"
    }
  ],
  "outputTransform": "(sourceData) => sourceData.stepId.data",
  "outputSchema": { "type": "object", "properties": {} },
  "inputSchema": { "type": "object", "properties": {} }
}
```

### Step Config Fields

| Field         | Type   | Description                                  |
| ------------- | ------ | -------------------------------------------- |
| `systemId`    | string | System whose credentials to use              |
| `url`         | string | Full URL with `<<variable>>` placeholders    |
| `method`      | string | HTTP method                                  |
| `headers`     | object | HTTP headers with credential placeholders    |
| `queryParams` | object | URL query parameters                         |
| `body`        | string | Request body (JSON string with placeholders) |
| `pagination`  | object | Auto-pagination config (see below)           |

### Step Behavior Fields

| Field             | Type   | Description                                      |
| ----------------- | ------ | ------------------------------------------------ |
| `dataSelector`    | string | JS function controlling step input and loop mode |
| `transformCode`   | string | JS function to transform the step's response     |
| `failureBehavior` | string | `abort` (default), `continue`, or `skip`         |

---

## Credential Placeholders

System credentials are namespaced as `<<systemId_credentialKey>>` and resolved server-side at execution time. **You MUST explicitly reference them in headers.**

### Auth Header Patterns

```json
{"Authorization": "Bearer <<stripe_api_key>>"}
{"Authorization": "Bearer <<gmail_access_token>>"}
{"X-API-Key": "<<my_api_api_key>>"}
{"Authorization": "Basic <<(sourceData) => Buffer.from(sourceData.my_api_username + ':' + sourceData.my_api_password).toString('base64')>>"}
```

### Credential Lifecycle

- Non-sensitive creds (`client_id`, `auth_url`, etc.) are stored via `--credentials`
- Sensitive creds (`api_key`, `client_secret`) use `--sensitive-credentials` for secure input
- OAuth tokens (`access_token`, `refresh_token`) are auto-refreshed before each step execution
- Placeholders like `<<gmail_access_token>>` always resolve to the current (refreshed) token

---

## Variables and Data Flow

### Variable Syntax

All step config fields support `<<variable>>` placeholders:

| Syntax                     | Resolves to                 |
| -------------------------- | --------------------------- |
| `<<fieldName>>`            | Payload field or credential |
| `<<systemId_credKey>>`     | System credential           |
| `<<stepId.data.field>>`    | Previous step result        |
| `<<(sourceData) => expr>>` | JavaScript expression       |

**CRITICAL**: Simple `<<varName>>` only works for **top-level keys**. No dots, no nesting.

- VALID: `<<userId>>`, `<<currentItem>>`, `<<stripe_api_key>>`
- INVALID: `<<currentItem.id>>`, `<<sourceData.userId>>` — these FAIL at runtime

For nested access, use arrow functions: `<<(sourceData) => sourceData.currentItem.id>>`

### sourceData Object

`sourceData` is the cumulative state available to all JS expressions (data selectors, transforms, variable expressions):

```javascript
sourceData = {
  // Payload fields at ROOT level (NEVER use sourceData.payload.*)
  userId: "123",
  date: "2024-01-15",

  // Previous step results, keyed by step ID
  // Object-selector step:
  getUsers: { currentItem: {}, data: { users: [...] }, success: true },
  // Array-selector (loop) step:
  fetchDetails: [
    { currentItem: "id1", data: { name: "Alice" }, success: true },
    { currentItem: "id2", data: { name: "Bob" }, success: true },
  ],

  // Current loop item (only set inside a looping step's config)
  currentItem: { id: 1 },

  // Credentials (flattened, namespaced)
  systemId_access_token: "...",
  systemId_api_key: "..."
}
```

### Step Result Envelope

**Every** step result is wrapped in an envelope — you MUST account for this.

**Object selector (or no selector)** — step runs once:

```javascript
sourceData.stepId = { currentItem: <selectorOutput>, data: <apiResponse>, success: true }
// Access the API response:
sourceData.stepId.data
sourceData.stepId.data.users
```

**Array selector** — step loops, result is an array of envelopes:

```javascript
sourceData.stepId = [
  { currentItem: <item1>, data: <response1>, success: true },
  { currentItem: <item2>, data: <response2>, success: true },
  ...
]
// Access all responses:
sourceData.stepId.map(item => item.data)
// Nested arrays:
sourceData.stepId.flatMap(item => item.data.results)
// Only successes:
sourceData.stepId.filter(item => item.success).map(i => i.data)
```

**NEVER** access step results without `.data` — `sourceData.stepId.results` hits the envelope, not the API response. Use `sourceData.stepId.data.results`.

### Data Selectors

Control what a step receives as input and whether it loops:

| Return type        | Behavior                            |
| ------------------ | ----------------------------------- |
| Single object      | Step runs once with that object     |
| Array              | Step runs once per item (loop mode) |
| `undefined`/`null` | Step receives full sourceData       |

In loop mode, `sourceData.currentItem` is set to the current array element.

Empty arrays are valid — the step simply skips execution.

### Step Result References (in `<<>>` placeholders)

```
<<stepId.data>>              — full response data (object-selector step)
<<stepId.data.field>>        — nested field
<<stepId.data.items[0].id>>  — array element
```

### Execution Pipeline

For each step in order:

1. Build `sourceData`: `{ ...originalPayload, ...previousStepResults, ...credentials }`
2. Run `dataSelector(sourceData)` → determines single vs loop execution
3. For each item: merge `currentItem` into `sourceData`, resolve `<<>>` variables, execute step
4. `transformCode` runs on the raw response → output becomes `.data` in the envelope
5. Wrap result: `{ currentItem, data, success }` and store in `sourceData[stepId]`
6. After all steps: run `outputTransform(sourceData)` to shape final output

### Complete Example: List-then-Detail Pattern

A tool that lists Gmail message IDs, then fetches details for each:

```json
{
  "id": "get-recent-emails",
  "instruction": "Fetches the 10 most recent Gmail emails with subject, sender, and snippet",
  "steps": [
    {
      "id": "list-messages",
      "config": {
        "systemId": "gmail",
        "url": "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10",
        "method": "GET",
        "headers": { "Authorization": "Bearer <<gmail_access_token>>" }
      }
    },
    {
      "id": "get-details",
      "dataSelector": "(sourceData) => sourceData[\"list-messages\"].data.messages.map(m => m.id)",
      "config": {
        "systemId": "gmail",
        "url": "https://gmail.googleapis.com/gmail/v1/users/me/messages/<<currentItem>>?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date",
        "method": "GET",
        "headers": { "Authorization": "Bearer <<gmail_access_token>>" }
      }
    }
  ],
  "outputTransform": "(sourceData) => sourceData[\"get-details\"].map(item => { var h = item.data.payload.headers; var get = function(n) { var f = h.find(function(x) { return x.name === n; }); return f ? f.value : null; }; return { id: item.data.id, subject: get(\"Subject\"), from: get(\"From\"), date: get(\"Date\"), snippet: item.data.snippet }; })"
}
```

What happens at runtime:

1. **list-messages** runs once (no dataSelector) → `sourceData["list-messages"] = { currentItem: {}, data: { messages: [{id: "abc"}, {id: "def"}, ...] }, success: true }`
2. **get-details** dataSelector returns `["abc", "def", ...]` (an array) → step loops over each ID
3. Each loop iteration sets `currentItem` to the string ID, which `<<currentItem>>` injects into the URL
4. Loop results stored as: `sourceData["get-details"] = [{ currentItem: "abc", data: {id, snippet, payload...}, success }, ...]`
5. **outputTransform** maps over the array of envelopes, extracting `.data` fields from each

---

## HTTP API Patterns

### Pagination

```json
{
  "pagination": {
    "type": "offset|cursor|page",
    "pageSize": 100,
    "cursorPath": "$.nextPageToken",
    "stopCondition": "(response) => !response.hasMore"
  }
}
```

| Type     | How it works                                                 |
| -------- | ------------------------------------------------------------ |
| `offset` | Increments `offset` param by `pageSize` each page            |
| `cursor` | Extracts next cursor from `cursorPath`, sends as query param |
| `page`   | Increments `page` query param                                |

All types stop when `stopCondition` returns true, response is empty, or max pages reached.

### Common Auth Patterns by Service Type

| Service                      | Header                                                |
| ---------------------------- | ----------------------------------------------------- |
| OAuth (Google, GitHub, etc.) | `"Authorization": "Bearer <<systemId_access_token>>"` |
| API Key (Stripe, etc.)       | `"Authorization": "Bearer <<systemId_api_key>>"`      |
| API Key in header            | `"X-API-Key": "<<systemId_api_key>>"`                 |

---

## Systems

### Credential Model

- `credentials` — non-sensitive config stored directly (client_id, auth_url, scopes, etc.)
- `sensitiveCredentials` — secrets requiring secure UI input (api_key, client_secret)
- **NEVER ask users to paste secrets in chat** — always use `--sensitive-credentials`

### Templates

Templates auto-populate endpoints and OAuth config. Use `sg system find` to discover available templates.

**Preconfigured OAuth** (no user client_id/secret needed): slack, salesforce, asana, notion, airtable, jira, confluence

### OAuth Flow

1. `sg system create --id gmail --url https://gmail.googleapis.com --credentials '{"auth_url":"...","token_url":"..."}' --sensitive-credentials client_id,client_secret`
2. `sg system oauth --system-id gmail --scopes "..."`
3. User authenticates in browser → tokens saved automatically

### System IDs

- Lowercase letters, numbers, underscores only — **no hyphens**
- Used for credential namespacing: `<<systemId_credKey>>`

---

## Debugging Failed Tools

### Common Errors and Fixes

| Error                 | Cause                              | Fix                                                                       |
| --------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| 401 Unauthorized      | Missing or invalid auth header     | Add `"Authorization": "Bearer <<systemId_access_token>>"` to step headers |
| 403 Forbidden         | Wrong scopes or permissions        | Check OAuth scopes, re-authenticate                                       |
| Empty `data: {}`      | No outputTransform or dataSelector | Add `outputTransform` to extract from step results                        |
| Variable not resolved | Wrong placeholder syntax           | Check `<<systemId_credKey>>` matches actual credential keys               |
| Step references empty | Wrong step ID in reference         | Verify `<<stepId.data.field>>` matches actual step IDs                    |

### Debug Workflow

1. Run with `--include-step-results` to see raw step responses
2. Check each step's `data` field — is the API returning what you expect?
3. Verify credential placeholders match `sg system find --id <systemId>` placeholder list
4. **Test API calls directly with `sg system call`** — isolate whether the issue is auth, endpoint, or transform:
   ```bash
   # Test the exact URL from your failing step
   sg system call --url "https://api.example.com/endpoint" \
     --system-id my_api \
     --headers '{"Authorization":"Bearer <<my_api_access_token>>"}'
   ```
5. Compare `sg system call` response to what your tool expects — fix transforms accordingly

### Self-Healing Pattern

When an outputTransform or dataSelector fails, the executor retries with an LLM-generated fix. To help this:

- Throw descriptive errors: `throw new Error("Expected array at data.items, got: " + typeof data.items)`
- Check for null/undefined with `?.` and defaults
- Validate arrays with `Array.isArray()` before calling array methods

---

## Workflow Guide

### Pre-Building: Test with `sg system call`

**ALWAYS test endpoints with `sg system call` before building tools.** This is the most important step to avoid broken tools.

1. **Verify authentication** — Test that credentials work:

   ```bash
   sg system call --url "https://api.example.com/me" \
     --system-id my_api \
     --headers '{"Authorization":"Bearer <<my_api_access_token>>"}'
   ```

2. **Explore response structure** — Understand what the API returns:

   ```bash
   sg system call --url "https://api.example.com/users?limit=2" \
     --system-id my_api \
     --headers '{"Authorization":"Bearer <<my_api_access_token>>"}'
   ```

   Look at the response to understand:
   - Where is the data array? (`data.users`, `data.items`, `data.results`?)
   - What fields are available? (exact field names matter!)
   - Is there pagination info? (`nextCursor`, `hasMore`, `total`?)

3. **Test the exact endpoints your tool will use** — Don't guess:
   ```bash
   # If your tool will fetch user details by ID:
   sg system call --url "https://api.example.com/users/123" \
     --system-id my_api \
     --headers '{"Authorization":"Bearer <<my_api_access_token>>"}'
   ```

### Full Workflow

1. **Create system** → `sg system create --id my_api --url ... --sensitive-credentials api_key`
2. **Authenticate** → `sg system oauth` (if OAuth) or credentials are already set
3. **Test auth** → `sg system call` to verify credentials work
4. **Explore API** → `sg system docs` + more `sg system call` to test endpoints
5. **Build tool** → Construct full config JSON, `sg tool build --config '...'`
6. **Test** → `sg tool run --draft <id> --include-step-results`
7. **Iterate** → `sg tool edit --draft <id> --patches '[...]' --test`
8. **Save** → `sg tool save --draft <id>`

---

## Deploying Tools to Production

After building and saving a tool, integrate it into your application:

### REST API (Any Language)

```bash
# Run a tool
curl -X POST "https://api.superglue.cloud/v1/tools/{toolId}/run" \
  -H "Authorization: Bearer $SUPERGLUE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"inputs": {"userId": "123"}}'

# Webhook trigger (async, fire-and-forget)
curl -X POST "https://api.superglue.cloud/v1/hooks/{toolId}?token=$SUPERGLUE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"userId": "123"}'
```

### TypeScript SDK

```typescript
import { configure, runTool } from "@superglue/client";
configure({ apiKey: process.env.SUPERGLUE_API_KEY });
const { data } = await runTool("my-tool-id", { inputs: { userId: "123" } });
```

### Python SDK

```python
import os
from superglue_client import SuperglueClient
from superglue_client.api.tools import run_tool
client = SuperglueClient(base_url="https://api.superglue.cloud/v1", token=os.environ["SUPERGLUE_API_KEY"])
result = run_tool.sync(client=client, tool_id="my-tool-id", body={"inputs": {"userId": "123"}})
```

**For complete integration patterns** (error handling, retries, webhooks, async execution), read `references/integration.md`.

---

## Reference Files

For detailed documentation on specific topics, read these files in the `references/` directory:

| File                                  | When to read                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `references/integration.md`           | **READ THIS** when deploying tools to production - SDK usage, REST API, webhooks, error handling |
| `references/databases.md`             | Building tools that query PostgreSQL/MySQL databases                                             |
| `references/file-servers.md`          | Building tools that interact with FTP/SFTP/SMB file servers                                      |
| `references/transforms-and-output.md` | Complex data transformations, output shaping, JS sandbox constraints                             |

**Important:** When the user asks about integrating superglue into their codebase, deploying tools, using the SDK, or calling tools from code, you MUST read `references/integration.md` for complete examples.

---

## Draft Management

Drafts live in `.superglue/drafts/<draftId>.json`. Created by `build`, updated by `edit`, deleted by `save`. Ephemeral — not persisted across sessions.

## File References

Attach files with `--file key=path`. Reference in payloads with `file::<key>`. Auto-parsed via `/v1/extract`.

```bash
sg tool run --draft <id> --payload '{"data": "file::mysheet"}' --file mysheet=data.xlsx
```

## Configuration

`.superglue/config.json`:

```json
{
  "apiKey": "...",
  "endpoint": "https://api.superglue.cloud",
  "output": { "mode": "stdout", "directory": ".superglue/output" },
  "policies": { "callSystem": "ask_every_time", "editTool": "confirm" }
}
```

**callSystem:** `ask_every_time` | `run_gets_only` | `run_everything`
**editTool:** `confirm` | `auto_accept`
