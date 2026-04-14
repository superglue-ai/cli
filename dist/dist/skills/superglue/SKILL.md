---
name: superglue
description: "Build, test, deploy and integrate superglue tools via the sg CLI and superglue SDKs. IMPORTANT — you MUST invoke this skill and read the full reference BEFORE running ANY sg command or writing ANY superglue SDK/REST/webhook integration code. Before using the sg CLI, first check that it is installed (run sg --version; if not found, install with npm install -g @superglue/cli), then verify it is configured (check that sg init has been run or that SUPERGLUE_API_KEY and SUPERGLUE_API_ENDPOINT environment variables are set). If not, guide the user through setup first. After reading the SKILL.md file, also read the relevant references/ files for the specific topic (databases, file servers, transforms, integration/SDK)."
---

# superglue CLI (`sg`) — Agent Reference

## CRITICAL RULES — READ FIRST

**Pre-requisites for using the CLI**

1. **Check CLI exists**: Run `sg --version`. If it fails with `command not found`, install it: `npm install -g @superglue/cli`
2. **Check superglue CLI config exists**: Run `sg system list`. If it fails with `fetch failed` or auth errors, the CLI needs configuration via `sg init` (see below).

**Calling systems and running tools**

1. ALWAYS make sure you pull the relevant system context using `sg system find` before calling system endpoints and running inline JSON tools or building new tools.
2. Use `sg system search-docs` to do a targeted keyword search of system docs if you're unsure about how a system works.

**Authentication & Credentials:**

- **Auth headers MUST be set explicitly** — credentials are NEVER auto-injected into requests or tool steps
- Every request step (in tools AND `sg system call`) must include the appropriate auth header using `<<systemId_credentialKey>>` syntax
- OAuth systems also require explicit headers — only token refresh is automatic

**Saving Tools:**

- **Don't save a tool without explicit user confirmation** — always ask "Should I save this tool?" first
- After `sg tool build` + `sg tool run`, present results to the user and wait for approval
- Only run `sg tool save --draft <id>` after the user explicitly confirms

**Credentials in Non-Interactive Environments (AI Agents, CI):**

- **Pass ALL credentials (including secrets) directly via `--credentials` JSON** — do NOT use `--sensitive-credentials` (it requires an interactive TTY which agents don't have)
- Ask the user to provide secret values, then pass them in `--credentials '{"api_key":"sk-xxx"}'`

---

## Installation & Setup

### Installing the CLI

```bash
npm install -g @superglue/cli
```

After installation, the `sg` command is available globally.

### Initialization (REQUIRED before first use)

The CLI **will not work** until configured with an API key. The endpoint defaults to `https://api.superglue.cloud` if not specified.

**Option A: Interactive setup (recommended for humans)**

```bash
sg init
```

This prompts for:

1. **API Key** (required) — get one at https://app.superglue.cloud/admin?view=api-keys
2. **API Endpoint** — defaults to `https://api.superglue.cloud`
3. **Web Endpoint** — for OAuth callbacks, auto-derived from API endpoint
4. **Output mode** — `stdout` (default) or `stdout+file`
5. **Config location** — project-local (`.superglue/config.json`) or global (`~/.superglue/config.json`)

It verifies the connection before saving. On success it creates the config file, a `drafts/` directory, and updates `.gitignore` if using local config.

**Option B: Environment variables (recommended for CI and AI agents)**

If `sg init` is not practical (non-interactive environments, CI, AI agents), set these env vars instead:

```bash
export SUPERGLUE_API_KEY="your-api-key"
export SUPERGLUE_API_ENDPOINT="https://api.superglue.cloud"  # optional, this is the default
```

With these set, all `sg` commands work without a config file.

**Option C: CLI flags (per-command override)**

```bash
sg system list --api-key "your-key" --endpoint "https://api.superglue.cloud"
```

### Config Resolution Order

CLI flags > environment variables > config file (local `.superglue/config.json` > global `~/.superglue/config.json`).

### Verifying Setup

After configuring, verify the connection works:

```bash
sg system list    # should return a list (possibly empty) without errors
```

---

## Quick Start

```bash
sg system list
sg tool build --config '{"id":"...","instruction":"...","steps":[...]}'
sg tool run --draft <draftId>
sg tool save --draft <draftId>
```

## Global Flags

| Flag               | Description                                 |
| ------------------ | ------------------------------------------- |
| `--json`           | Force JSON output (auto-enabled in non-TTY) |
| `--api-key <key>`  | Override API key                            |
| `--endpoint <url>` | Override API endpoint                       |

## Command Reference

### `sg init`

Interactive setup — API key, endpoint, output mode. Creates `.superglue/`.

### Tool Commands

**`sg tool build`** — Register a tool config. Returns a `draftId`. Not AI-powered — you provide the full config.

```bash
sg tool build --config '{"id":"...","steps":[...]}'  # inline JSON
sg tool build --id my-tool --instruction "..." --steps steps.json --payload '{"key":"val"}'
sg tool build --config tool.json                    # from file
```

| `--config <file-or-json>` | Full JSON config (file path or inline JSON string) |
| `--id <id>` | Tool ID (kebab-case) |
| `--instruction <text>` | Human-readable description |
| `--steps <file>` | JSON file with steps array |
| `--payload <json>` | Sample payload |
| `--file <key=path>` | Attach file reference |

**`sg tool run`** — Execute a draft or saved tool. Streams live execution logs to the terminal.

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
sg tool edit --tool my-tool --patches patches.json
```

| `--patches <json-or-file>` | JSON Patch array (inline or file) |

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

**Required flags:**

- `--name <name>` — Human-readable display name
- `--url <url>` — API base URL (auto-filled when using `--template`)

**Optional:**

- `--id <id>` — System ID (lowercase, underscores only, no hyphens). Derived from `--name` if omitted.
- `--template <id>` — Pre-configured template (auto-fills name and url if not provided)

**Example with credentials (non-interactive — use this in AI agent / CI contexts):**

```bash
sg system create --name "My API" --url https://api.example.com \
  --credentials '{"api_key":"sk-xxx"}'
```

**With template:**

```bash
sg system create --name "Slack" --template slack
```

**Full flag reference:**

| Flag                               | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| `--name <name>`                    | Human-readable name — **REQUIRED**                                           |
| `--id <id>`                        | System ID (lowercase, underscores only) — derived from name if omitted       |
| `--url <url>`                      | API base URL — **REQUIRED** (auto-filled by `--template`)                    |
| `--template <id>`                  | Template ID (stripe, shopify, slack, etc.)                                   |
| `--credentials <json>`             | Credentials JSON (use for ALL creds in non-interactive mode)                 |
| `--sensitive-credentials <fields>` | Comma-separated fields for masked input (TTY only — do NOT use in AI agents) |
| `--docs-url <url>`                 | Documentation URL to scrape                                                  |
| `--openapi-url <url>`              | OpenAPI spec URL                                                             |
| `--env <environment>`              | Environment: `dev` or `prod` (default: prod)                                 |

**`sg system edit`** — Update system config or credentials. Supports `--env dev|prod`.
**`sg system list` / `sg system find`** — List or search systems. `find` supports `--env dev|prod`.

**`sg system call`** — **CRITICAL for tool building.** Make authenticated calls to APIs, databases, and file servers. Use this to:

- Explore API endpoints and response structures
- Verify field names and data shapes BEFORE building tools

```bash

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

# Redis command
sg system call --url "redis://<<my_redis_host>>:6379/0" \
  --system-id my_redis \
  --body '{"command":"HGETALL","args":["user:123"]}'

# File server (SFTP)
sg system call --url "sftp://<<my_sftp_host>>:22/data" \
  --system-id my_sftp \
  --body '{"operation":"list","path":"/"}'
```

| Flag                | Description                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `--url <url>`       | Full URL with protocol (http/https/postgres/postgresql/mssql/sqlserver/redis/rediss/sftp/ftp/smb) |
| `--system-id <id>`  | System ID for credential injection                                                                |
| `--method <method>` | HTTP method (GET, POST, PUT, DELETE, PATCH)                                                       |
| `--headers <json>`  | HTTP headers JSON with credential placeholders                                                    |
| `--body <string>`   | Request body (JSON string)                                                                        |
| `--env <env>`       | Environment: `dev` or `prod`                                                                      |
| `--file <key=path>` | File references (repeatable)                                                                      |

**`sg system search-docs`** — Search system documentation.

```bash
sg system search-docs --system-id slack -k "send message channels"
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
        "systemId": "example_system",
        "url": "https://api.example.com/endpoint?param=<<payload_field>>",
        "method": "GET",
        "headers": {
          "Authorization": "Bearer <<example_system_access_token>>"
        },
        "queryParams": { "limit": "10" },
        "body": "{ \"key\": \"<<payload_field>>\" }"
      },
      "dataSelector": "(sourceData) => sourceData.previousStep.data.items",
      "failureBehavior": "fail"
    }
  ],
  "outputTransform": "(sourceData) => sourceData.stepId.data",
  "outputSchema": { "type": "object", "properties": {} },
  "inputSchema": { "type": "object", "properties": {} }
}
```

### Step Config Fields (Request Steps)

| Field         | Type   | Description                                  |
| ------------- | ------ | -------------------------------------------- |
| `type`        | string | `"request"` (default, can be omitted)        |
| `systemId`    | string | System whose credentials to use              |
| `url`         | string | Full URL with `<<variable>>` placeholders    |
| `method`      | string | HTTP method                                  |
| `headers`     | object | HTTP headers with credential placeholders    |
| `queryParams` | object | URL query parameters                         |
| `body`        | string | Request body (JSON string with placeholders) |
| `pagination`  | object | Auto-pagination config (see below)           |

### Step Config Fields (Transform Steps)

| Field           | Type   | Description                                      |
| --------------- | ------ | ------------------------------------------------ |
| `type`          | string | `"transform"` — **REQUIRED** for transform steps |
| `transformCode` | string | JS function: `(sourceData) => transformedData`   |

### Step Behavior Fields

| Field             | Type   | Description                                      |
| ----------------- | ------ | ------------------------------------------------ |
| `dataSelector`    | string | JS function controlling step input and loop mode |
| `failureBehavior` | string | `fail` (default) or `continue`                   |

---

## Credential Placeholders

System credentials are namespaced as `<<systemId_credentialKey>>` and resolved server-side at execution time. **You MUST explicitly reference them in headers.**

### Auth Header Patterns

```json
{"Authorization": "Bearer <<stripe_api_key>>"}
{"Authorization": "Bearer <<gmail_access_token>>"}
{"X-API-Key": "<<my_api_api_key>>"}
{"Authorization": "Basic <<my_api_username>>:<<my_api_password>>"}
```

Basic auth is auto-encoded: if the value after `Basic ` isn't already base64, the engine encodes it automatically.

### Credential Lifecycle

- Non-sensitive creds (`client_id`, `auth_url`, etc.) are stored via `--credentials`
- Sensitive creds (`api_key`, `client_secret`) — in non-interactive mode (AI agents, CI), pass via `--credentials` JSON. In interactive TTY, use `--sensitive-credentials` for masked input, or set `SUPERGLUE_CRED_<FIELD>` env vars.
- OAuth tokens (`access_token`, `refresh_token`) are auto-refreshed before each step execution

---

## Variables and Data Flow

### Variable Syntax

All step config fields support `<<variable>>` placeholders:

| Syntax                     | Resolves to                 |
| -------------------------- | --------------------------- |
| `<<fieldName>>`            | Payload field or credential |
| `<<systemId_credKey>>`     | System credential           |
| `<<sg_auth_email>>`        | Email of authenticated user |
| `<<(sourceData) => expr>>` | JavaScript expression       |

**CRITICAL**: Simple `<<varName>>` only works for **top-level keys**. No dots, no nesting.

- VALID: `<<userId>>`, `<<currentItem>>`, `<<stripe_api_key>>`, `<<sg_auth_email>>`
- INVALID: `<<currentItem.id>>`, `<<sourceData.userId>>` — these FAIL at runtime

For nested access, use arrow functions: `<<(sourceData) => sourceData.currentItem.id>>`

### Context Variables

Context variables provide information about the execution environment:

- `<<sg_auth_email>>` — Email of the authenticated user who triggered the tool

**Use case**: Personalize tool outputs based on who runs the tool (e.g., user-specific permissions, account lookups, audit logging).

**Important**: `sg_auth_email` is NOT available in scheduled executions. Tools using `<<sg_auth_email>>` will fail if run via scheduler.

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
```

### Data Selectors

Control what a step receives as input and whether it loops:

| Return type        | Behavior                            |
| ------------------ | ----------------------------------- |
| Single object      | Step runs once with that object     |
| Array              | Step runs once per item (loop mode) |
| `undefined`/`null` | Step receives full sourceData       |

In loop mode, `sourceData.currentItem` is set to the current array element.

Empty arrays are valid — the step simply skips execution.

### Two Step Types

**Request step** (HTTP, PostgreSQL, MSSQL, Redis, FTP/SFTP/SMB) — makes an API call:

```json
{
  "id": "get-users",
  "config": {
    "type": "request",
    "systemId": "my_api",
    "url": "https://api.example.com/users",
    "method": "GET",
    "headers": { "Authorization": "Bearer <<my_api_access_token>>" }
  }
}
```

**Transform step** — pure JavaScript, no API call. Use when a subsequent request step needs reshaped data:

```json
{
  "id": "format-data",
  "config": {
    "type": "transform",
    "transformCode": "(sourceData) => sourceData.getUsers.data.map(u => ({ id: u.id, name: u.fullName }))"
  }
}
```

Transform steps do NOT have: `systemId`, `url`, `method`, `headers`, `body`, `queryParams`, or `pagination`. The `transformCode` function receives `sourceData` (same object available everywhere) and its return value becomes `.data` in the step envelope.

**When to use each:**

| Need                                              | Use                                                                                                 |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Filter/reshape data for a SUBSEQUENT request step | Transform step (`config.type: "transform"`)                                                         |
| Shape the final tool output                       | `outputTransform` (runs after all steps, has a slightly different schema than transform only steps) |
| Select input / control looping for a step         | `dataSelector` on the step                                                                          |
| Inline data computation in URL/body/headers       | `<<(sourceData) => ...>>` expressions                                                               |

### Execution Pipeline

For each step in order:

1. Build `sourceData`: `{ ...originalPayload, ...previousStepResults, ...credentials }`
2. Run `dataSelector(sourceData)` → determines single vs loop execution
3. For each item: merge `currentItem` into `sourceData`, resolve `<<>>` variables, execute step
   - **Request step**: makes the HTTP/DB/FTP call, raw response becomes `.data`
   - **Transform step**: runs `transformCode(sourceData)`, return value becomes `.data`
4. Wrap result: `{ currentItem, data, success }` and store in `sourceData[stepId]`
5. After all steps: run `outputTransform(sourceData)` to shape final output

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

## Systems

### Credential Model

- `credentials` — all credentials passed as JSON via `--credentials`
- `sensitiveCredentials` — interactive masked prompt for secrets (TTY only, NOT for AI agents or CI)
- **For AI agents / non-interactive use:** pass ALL credentials (including secrets like api_key, client_secret) directly via `--credentials '{"api_key":"..."}'`. Ask the user to provide the secret values, then include them in the JSON.
- **For human interactive use:** use `--sensitive-credentials` for masked input of secrets

### Templates

Templates auto-populate endpoints and OAuth config. Use `sg system find` to discover available templates.

**Preconfigured OAuth** (no user client_id/secret needed): slack, salesforce, asana, notion, airtable, jira, confluence

### OAuth Flow

**IMPORTANT:** For OAuth systems, prefer `--template` when available because it auto-configures OAuth URLs and defaults. OAuth also works without a template if you provide required credentials (for example `client_id`, `auth_url`, and `token_url`) manually.

If you don't know the template ID, the CLI auto-detects it from the URL — but using `--template` explicitly is more reliable.

**Step 1: Create the system with template and credentials**

```bash
# Best: explicit template (auto-fills URL and OAuth config)
sg system create --name "Gmail" --template gmail \
  --credentials '{"client_id":"...","client_secret":"..."}'

# Also works: URL-based auto-detection (template inferred from googleapis.com)
sg system create --name "Gmail" --url https://gmail.googleapis.com \
  --credentials '{"client_id":"...","client_secret":"..."}'
```

**Step 2: Authenticate via OAuth**

```bash
sg system oauth --system-id gmail --scopes "https://www.googleapis.com/auth/gmail.readonly"
```

**Step 3:** User authenticates in browser → tokens saved automatically

**Common OAuth templates:** gmail, googleDrive, googleCalendar, googleSheets, slack, salesforce, github, jira, confluence, notion, airtable, hubspot, shopify, dropbox, zoom, microsoft

### System IDs

- Lowercase letters, numbers, underscores only — **no hyphens**
- Used for credential namespacing: `<<systemId_credKey>>`

---

## Debugging Failed Tools

### Debug Workflow

1. Run with `--include-step-results` to see raw step responses
2. Check each step's `data` field — is the API returning what you expect?
3. Verify credential placeholders match `sg system find --id <systemId>` placeholder list
4. **Test API calls directly with `sg system call`** — isolate whether the issue is auth, endpoint, or transform

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
configure({ apiKey: process.env.SUPERGLUE_API_KEY!, baseUrl: "https://api.superglue.cloud/v1" });
const response = await runTool("my-tool-id", { inputs: { userId: "123" } });
// response.data is a Run object: { runId, toolId, status, data, error, metadata }
```

### Python SDK

```python
import os
from superglue_client import AuthenticatedClient
from superglue_client.api.tools import run_tool
from superglue_client.models.run_request import RunRequest
from superglue_client.models.run_request_inputs import RunRequestInputs

client = AuthenticatedClient(base_url="https://api.superglue.cloud/v1", token=os.environ["SUPERGLUE_API_KEY"])
with client as c:
    result = run_tool.sync("my-tool-id", client=c, body=RunRequest(inputs=RunRequestInputs.from_dict({"userId": "123"})))
```

---

## Reference Files

For detailed documentation on specific topics, read these files in the `references/` directory:

| File                                  | When to read                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `references/integration.md`           | **READ THIS** when deploying tools to production - SDK usage, REST API, webhooks, error handling |
| `references/databases.md`             | Building tools that query PostgreSQL or Microsoft SQL Server (Azure SQL) databases               |
| `references/redis.md`                 | Building tools that interact with Redis (commands, pipelines, data types)                        |
| `references/file-servers.md`          | Building tools that interact with FTP/SFTP/SMB file servers                                      |
| `references/transforms-and-output.md` | Complex data transformations, output shaping, JS sandbox constraints                             |

**Important:** When the user asks about integrating superglue into their codebase, deploying tools, using the SDK, or calling tools from code, you MUST read `references/integration.md` for complete examples.

---

## Draft Management

Drafts live in `.superglue/drafts/<draftId>.json`. Created by `build`, updated by `edit`, deleted by `save`. Ephemeral — not persisted across sessions.

## File References

Attach files with `--file key=path`. Reference in payloads with `file::<key>`. Auto-parsed to JSON.

```bash
sg tool run --draft <id> --payload '{"data": "file::mysheet"}' --file mysheet=data.xlsx
```
