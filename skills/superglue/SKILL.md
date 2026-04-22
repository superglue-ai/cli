---
name: superglue
description: "Build, test, deploy and integrate superglue tools via the sg CLI and superglue SDKs. IMPORTANT — you MUST invoke this skill and read the full reference BEFORE running ANY sg command or writing ANY superglue SDK/REST/webhook integration code. Before using the sg CLI, first check that it is installed (run sg --version; if not found, install with npm install -g @superglue/cli), then verify it is configured (check that sg init has been run or that SUPERGLUE_API_KEY and SUPERGLUE_API_ENDPOINT environment variables are set). If not, guide the user through setup first. After reading the SKILL.md file, also read the relevant references/ files for the specific topic (databases, file servers, transforms, integration/SDK)."
---

# superglue CLI (`sg`) — Agent Reference

## CRITICAL RULES — READ FIRST

**Pre-requisites for using the CLI**

1. **Check CLI exists**: Run `sg --version`. If it fails with `command not found`, install it: `npm install -g @superglue/cli`
2. **Keep CLI and SDK up to date**: Always use the latest versions. Run `sg update` to update the CLI. For the SDK, run `npm install @superglue/client@latest` (JS) or `pip install --upgrade superglue-client` (Python). Older versions may have known bugs.
3. **Check superglue CLI config exists**: Run `sg system list`. If it fails with `fetch failed` or auth errors, the CLI needs configuration via `sg init` (see below).

**Calling systems and running tools**

1. ALWAYS make sure you pull the relevant system context using `sg system find` before calling system endpoints and running inline JSON tools or building new tools.
2. Use `sg system search-docs` to do a targeted keyword search of system docs if you're unsure about how a system works.

**Authentication & Credentials:**

- **Authentication must always be explicitly configured** — nothing is injected automatically in any protocol
- For HTTP: include auth headers using `<<systemId_credentialKey>>` syntax (e.g., `"Authorization": "Bearer <<systemId_access_token>>"`)
- For databases/Redis/file servers: embed credential placeholders in the connection URL (e.g., `postgres://<<sys_user>>:<<sys_pass>>@host/db`)
- OAuth systems also require explicit headers — only token refresh is automatic

**Saving Tools:**

- **Don't save a tool without explicit user confirmation** — always ask "Should I save this tool?" first
- After `sg tool build` + `sg tool run`, present results to the user and wait for approval
- Only run `sg tool save --draft <id>` after the user explicitly confirms

**Credentials in Non-Interactive Environments (AI Agents, CI):**

- **Pass ALL credentials (including secrets) directly via `--credentials` JSON**
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

**Option B: Non-interactive init (recommended for CI and AI agents)**

Pass the global `--api-key` flag to skip interactive prompts and save a config file:

```bash
sg init --api-key "your-api-key" --global
sg init --api-key "your-api-key" --endpoint "https://custom.endpoint.com" --global
```

> **Note:** `--api-key` and `--endpoint` are global flags (not shown in `sg init --help`). They work on all subcommands including `init`.

**Option C: Environment variables (no config file)**

If you don't need a persistent config file, set these env vars instead:

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
| `--table`          | Human-readable table output (default: JSON) |
| `--full`           | Disable truncation of large fields          |
| `--api-key <key>`  | Override API key                            |
| `--endpoint <url>` | Override API endpoint                       |

## Capability Presets

The CLI supports three capability presets that control which commands are available. Set during `sg init` or via `SUPERGLUE_CLI_PRESET` env var. Stored in `config.json` as `"preset"`.

| Preset    | Description                                                        |
| --------- | ------------------------------------------------------------------ |
| `runner`  | Run saved tools by ID only. Read-only lookups. No building/editing |
| `builder` | Runner + build/edit/save tools, call systems. No system CRUD       |
| `admin`   | Full access (default)                                              |

### Preset-to-Command Matrix

```
Command                  runner   builder   admin
─────────────────────────────────────────────────
sg init                    x         x        x
sg update                  x         x        x
sg skill                   x         x        x
sg tool build              -         x        x
sg tool run --tool         x         x        x
sg tool run --config/etc   -         x        x
sg tool edit               -         x        x
sg tool save               -         x        x
sg tool find / list        x         x        x
sg system create           -         -        x
sg system edit             -         -        x
sg system oauth            -         -        x
sg system call             -         x        x
sg system search-docs      -         x        x
sg system find / list      x         x        x
sg run list                x         x        x
sg run get                 x         x        x
```

### Setting the Preset

```bash
# During init (interactive or non-interactive)
sg init --preset runner --api-key "..." --global

# Via environment variable (overrides config.json)
export SUPERGLUE_CLI_PRESET=builder

# Manually edit .superglue/config.json
{ "preset": "runner", "apiKey": "...", ... }
```

Blocked commands print a clear error with the current preset name and how to change it.

## Command Reference

### `sg init`

Interactive setup — API key, endpoint, output mode, capability preset. Creates `.superglue/`.

Non-interactive: `sg init --api-key "..." --preset runner --global`

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

| Flag                   | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `--name <name>`        | Human-readable name — **REQUIRED**                                     |
| `--id <id>`            | System ID (lowercase, underscores only) — derived from name if omitted |
| `--url <url>`          | API base URL — **REQUIRED** (auto-filled by `--template`)              |
| `--template <id>`      | Template ID (stripe, shopify, slack, etc.)                             |
| `--credentials <json>` | Credentials JSON (all fields including secrets)                        |
| `--docs-url <url>`     | Documentation URL to scrape                                            |
| `--openapi-url <url>`  | OpenAPI spec URL                                                       |
| `--env <environment>`  | Environment: `dev` or `prod` (default: prod)                           |

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
- Sensitive creds (`api_key`, `client_secret`) — pass via `--credentials` JSON: `--credentials '{"client_secret":"..."}'`
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
- **Pass ALL credentials** (including secrets like api_key, client_secret) directly via `--credentials '{"api_key":"..."}'`. Ask the user to provide the secret values, then include them in the JSON.
- OAuth tokens (`access_token`, `refresh_token`) are auto-refreshed before each step execution

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

**For custom OAuth systems without a template**, you must include `client_id`, `client_secret`, `auth_url`, and `token_url` in the credentials at create time — or add them later with `sg system edit` before running `sg system oauth`:

```bash
sg system create --name "My API" --url https://api.example.com \
  --credentials '{"client_id":"...","client_secret":"...","auth_url":"https://example.com/oauth/authorize","token_url":"https://example.com/oauth/token"}'

# Or add credentials to an existing system:
sg system edit --id my_api \
  --credentials '{"client_id":"...","client_secret":"...","auth_url":"https://...","token_url":"https://..."}'
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

## Tool Building Guide

### Build Recipe

Before producing a tool config:

1. Load relevant skills: data-handling and protocol skill(s) for the involved systems
2. Use `sg system find` for every involved system — note `storedCredentials` and URL
3. Use `sg system search-docs` for each system — look up endpoints, auth patterns, pagination, response structure
4. Use `sg system call` to test 1-2 primary endpoints — verify response structure and field names before building
5. Only then call `sg tool build --config '...'` with the full tool config

### Planning Steps

- Fetch prerequisites: available projects, entity types, categories, etc.
- Each step = one API call, one DB query, one file operation, or a transform step (no compound ops)
- Final aggregation/filtering/sorting should happen in the `outputTransform`, not in a step
- Step instructions: 2-3 sentences describing the goal and expected data
- `instruction`: Write a 1-2 sentence summary of the tool's purpose. Never leave empty.

### Step Result Envelopes

Every step result is wrapped — you MUST account for this in dataSelectors and outputTransform.

- **Object selector (or none)** — access via `sourceData.stepId.data`
- **Array selector** — access via `sourceData.stepId.map(i => i.data)`
- **Paginated step** — access via `sourceData.stepId.data` (pages are merged server-side into a single envelope — do NOT `.map()` over it)

NEVER access step results without `.data` — `sourceData.stepId.results` will fail because you're hitting the envelope, not the API response.

### modify Flag

Set `modify: true` only when the step writes, updates, or deletes live data. Don't rely on HTTP method alone — a POST that only reads (e.g., GraphQL query) should be `modify: false`. Default is false.

### Validation Rules

- Tool must have a valid `id` string
- Tool must have a `steps` array
- `systemId` is optional on request steps. Setting it makes that system's credentials available as `<<systemId_credKey>>` template variables, and enables `<<systemId_url>>` for the base URL. Omit for public APIs.
- Every request step must have a non-empty `url`
- Transform steps must have `transformCode`

### Key Pitfalls

- NEVER guess API endpoints — always verify with `sg system search-docs` or `sg system call` first
- NEVER put `systemId` on the step object — it belongs inside `step.config.systemId`
- NEVER use `<<(sourceData) => sourceData.payload.X>>` — payload fields are at root level of sourceData
- NEVER use `<<currentItem.id>>` — use arrow function syntax: `<<(sourceData) => sourceData.currentItem.id>>`
- NEVER hardcode pagination params — use `<<page>>`, `<<offset>>`, `<<cursor>>`, `<<limit>>`
- NEVER add an `outputSchema` unless the user explicitly requested a specific response structure
- NEVER leave instructions empty
- ALWAYS explicitly configure authentication in every step — credentials are never automatically included in any protocol
- PREFER system URL variables (`<<systemId_url>>`) over hardcoded base URLs
- Check `sg system find` output for `storedCredentials` to know the exact variable names available
- `outputTransform` must be a single-line JS string (no literal newlines or tabs)
- NEVER use regex literals with `/` or complex escapes in transforms — they corrupt during serialization. Use `new URL()`, `.split()`, or `new RegExp()` instead. See data-handling reference "Serialization Safety".
- For complex request bodies, use a preceding transform step — don't put multi-statement logic inside `<<>>` expressions
- When the body contains nested/stringified JSON (e.g. LLM APIs): have `<<>>` expressions return a string via `JSON.stringify(...)`, and use a single expression for the whole body rather than mixing `<<>>` expressions with static JSON

### Complex Body Construction

When a request body needs data from multiple steps or requires aggregation, use a preceding transform step:

```javascript
// Step: prepareBody (transform)
transformCode: "(sourceData) => { var items = sourceData.step1.data.results; return { data: items.filter(function(i) { return i.active; }), count: items.length }; }";

// Step: submitData (request)
body: "<<(sourceData) => JSON.stringify(sourceData.prepareBody.data)>>";
```

---

## Tool Editing Guide

Edit tools using RFC 6902 JSON Patch operations via `sg tool edit`.

### Patch Format

Each operation:

```typescript
{
  op: "add" | "remove" | "replace" | "move" | "copy" | "test",
  path: string,      // JSON Pointer (e.g., "/steps/0/config/url")
  value?: any,       // required for add, replace, test
  from?: string      // required for move, copy
}
```

### Key Paths

- `/instruction` — tool description
- `/steps/N` — step at index N
- `/steps/N/config/url`, `/steps/N/config/method`, `/steps/N/config/headers`, etc.
- `/steps/N/dataSelector` — JS function controlling input + loop mode
- `/outputTransform` — final output shaping function
- `/outputSchema` — optional JSON schema for output

### Operations

- **`replace`** — Change an existing value. **Path must exist** — if the field is `null` or absent, `replace` fails. Use `add` instead for optional fields.
- **`add`** — Creates the field if missing, overwrites if it exists. **Prefer `add` over `replace`** when the field might be null or absent. Append to array with `/steps/-`.
- **`remove`** — Delete field or array element.
- **`move`** — Reorder or relocate.

### Validation Rules

- Never patch `id` — tool IDs and draft IDs are immutable when editing
- `op` and `path` are required on every patch; `path` must start with `/`
- Patches are applied **sequentially** — later patches see effects of earlier ones
- After patches, same validation rules as building apply (valid id, steps array, URLs present)

### Principles

- **Check result wrapping** — before writing any dataSelector or outputTransform patch, determine whether the upstream step used an object or array selector, and access `.data` accordingly
- **Don't forget downstream** — if you change a step's output shape, check if later dataSelectors and outputTransform need updating
- **Index shifts** — when removing array elements, subsequent indices shift down. Account for this in multi-patch operations.

---

## Systems Handling Guide

Systems are reusable building blocks that store configuration details and credentials.

### Credential Use in Tool Configurations

For every `systemId` referenced in a tool, credentials are namespaced as `<<systemId_credentialKey>>` and must be explicitly placed in the step config. For HTTP: in headers. For databases/Redis/file servers: in the connection URL. Nothing is injected automatically.

```
System id="stripe", storedCredentials: api_key → "sk_proj****"
→ Available as: <<stripe_api_key>>
```

OAuth tokens (`access_token`, `refresh_token`) are auto-refreshed before each step execution. Access tokens must also be explicitly referenced in step headers.

### System URL Variables

System URLs are available as `<<systemId_url>>` and should be used instead of hardcoding base URLs:

```
System id="salesforce", url="https://mycompany.salesforce.com"
→ Available as: <<salesforce_url>>

Step config: { "url": "<<salesforce_url>>/services/data/v58.0/sobjects/Account" }
```

### Dev/Prod Environments

`environment` is `"dev"` or `"prod"` (or unset for legacy systems). Set at creation only — immutable afterward. Two systems with the same ID but different environments are automatically linked. Dev systems inherit documentation from their linked prod system. When creating a dev system, always ask for new credentials — never copy from prod.

Tools reference systems by ID only. Execution mode determines which environment is used (dev mode falls back to prod if no dev system exists).

### System-Specific Instructions

Systems may include `specificInstructions` from the user (visible in `sg system find` output). Follow them when present. These capture API constraints, rate limits, special endpoints, auth requirements, or usage patterns.

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

| File                          | When to read                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------ |
| `references/integration.md`   | **READ THIS** when deploying tools to production - SDK usage, REST API, webhooks, error handling |
| `references/databases.md`     | Building tools that query PostgreSQL or Microsoft SQL Server (Azure SQL) databases               |
| `references/redis.md`         | Building tools that interact with Redis (commands, pipelines, data types)                        |
| `references/file-servers.md`  | Building tools that interact with FTP/SFTP/SMB file servers                                      |
| `references/data-handling.md` | Variables, selectors, result envelopes, transforms, JS sandbox constraints                       |
| `references/file-handling.md` | File detection, parsing, producedFiles, file references, aliasing rules                          |
| `references/http-apis.md`     | HTTP step config — auth patterns, pagination, retries, error detection                           |
| `references/access-rules.md`  | RBAC roles, tool/system permissions, custom rules, mutation detection (enterprise only)          |

**Important:** When the user asks about integrating superglue into their codebase, deploying tools, using the SDK, or calling tools from code, you MUST read `references/integration.md` for complete examples.

---

## Draft Management

Drafts live in `.superglue/drafts/<draftId>.json`. Created by `build`, updated by `edit`, deleted by `save`. Ephemeral — not persisted across sessions.

## File References

Attach files with `--file key=path`. Reference in payloads with `file::<key>`. Auto-parsed to JSON.

```bash
sg tool run --draft <id> --payload '{"data": "file::mysheet"}' --file mysheet=data.xlsx
```
