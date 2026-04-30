---
name: superglue
description: "Build, test, deploy and integrate superglue tools via the sg CLI and superglue SDKs. IMPORTANT — you MUST invoke this skill and read the full reference BEFORE running ANY sg command or writing ANY superglue SDK/REST/webhook integration code. Before using the sg CLI, first check that it is installed (run sg --version; if not found, install with npm install -g @superglue/cli), then verify it is configured (check that sg init has been run or that SUPERGLUE_API_KEY and SUPERGLUE_API_ENDPOINT environment variables are set). If not, guide the user through setup first. After reading SKILL.md, also read the relevant references/ files for the specific protocols and topics involved."
---

# superglue CLI (`sg`) — Agent Reference

This file is the entry point for operating superglue via the `sg` CLI. It covers setup, tool building, tool editing, system management, running tools, and deployment via SDK/REST/webhooks.

For protocol-specific details (HTTP, databases, Redis, file servers, GraphQL), file handling, access rules, SDK integration, and general superglue information, read the corresponding file in `references/` (linked throughout and listed at the bottom).

## Reference Files

Read these on demand — they are authoritative for their topic and kept in sync with the web agent's skill references.

| File                           | When to read                                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `references/superglue-info.md` | Company info, interfaces (SDK, REST API, MCP, Web), web UI layout, execution pipeline, internals     |
| `references/integration.md`    | Deploying tools — SDK (TS/Python) usage, REST API calls, webhook triggers, retry patterns            |
| `references/http.md`           | HTTP step configuration, auth patterns, file uploads, response handling, pagination, error detection |
| `references/graphql.md`        | GraphQL step config, schema introspection, error recovery                                            |
| `references/postgres.md`       | PostgreSQL connection URLs, SSL/TLS handling, schema introspection, parameterized queries            |
| `references/mssql.md`          | MSSQL / Azure SQL connection URLs, schema introspection, parameterized queries                       |
| `references/redis.md`          | Redis command syntax, connection URLs, key type handling                                             |
| `references/sftp-smb.md`       | SFTP, FTP, and SMB operations, file upload/download semantics, path handling                         |
| `references/file-handling.md`  | File detection, parsing, `file::` reference syntax, lazy base64 access, transform-produced files     |
| `references/access-rules.md`   | RBAC roles, tool/system permissions, mutation detection, custom rules (enterprise only)              |

## CRITICAL RULES — READ FIRST

**Pre-requisites for using the CLI**

1. **Check CLI exists**: Run `sg --version`. If it fails with `command not found`, install: `npm install -g @superglue/cli`.
2. **Keep CLI and SDK up to date**: Always use the latest versions. Run `sg update` to update the CLI. For the SDK, run `npm install @superglue/client@latest` (JS) or `pip install --upgrade superglue-client` (Python).
3. **Verify configuration**: Run `sg system list`. If it fails with `fetch failed` or auth errors, the CLI needs configuration via `sg init` (see Setup below).

**Calling systems and running tools**

1. ALWAYS pull the relevant system context using `sg system find` before calling system endpoints and before building tools.
2. Use `sg system search-docs` for a targeted keyword search of system docs when unsure how a system works.

**Authentication & Credentials**

- Authentication must ALWAYS be explicitly configured — nothing is injected automatically in any protocol.
- HTTP: include auth headers using `<<systemId_credentialKey>>` (e.g. `"Authorization": "Bearer <<my_api_access_token>>"`).
- Databases/Redis/file servers: embed credential placeholders in the connection URL (e.g. `postgres://<<sys_user>>:<<sys_pass>>@host/db`).
- OAuth: token refresh is automatic, but the header must still be explicit.

**Saving tools**

- Never save a tool without explicit user confirmation. Build + run, present results, then save with `sg tool save --draft <id>` only after the user approves.

**Non-interactive environments (AI agents, CI)**

- Pass ALL credentials (including secrets) directly via `--credentials '{"api_key":"sk-xxx"}'`. Ask the user for secret values, then include them in the JSON.

---

## Setup

### Installing the CLI

```bash
npm install -g @superglue/cli
```

After installation the `sg` command is available globally.

### Initialization

The CLI will not work until configured with an API key. The endpoint defaults to `https://api.superglue.cloud`.

**Interactive (humans):**

```bash
sg init
```

Prompts for: API key (required — get one at https://app.superglue.cloud/admin?view=api-keys), API endpoint, web endpoint (for OAuth callbacks), output mode (`stdout` or `stdout+file`), and config location (project-local `.superglue/config.json` vs global `~/.superglue/config.json`). Verifies the connection before saving.

**Non-interactive (CI, agents):**

```bash
sg init --api-key "your-api-key" --global
sg init --api-key "your-api-key" --endpoint "https://custom.endpoint.com" --global
```

`--api-key` and `--endpoint` are global flags and work on all subcommands.

**Environment variables (no config file):**

```bash
export SUPERGLUE_API_KEY="your-api-key"
export SUPERGLUE_API_ENDPOINT="https://api.superglue.cloud"   # optional, this is the default
```

**Config resolution order:** CLI flags > environment variables > local `.superglue/config.json` > global `~/.superglue/config.json`.

Verify with `sg system list` — should return a list (possibly empty) without errors.

### Capability Presets

Set during `sg init` or via `SUPERGLUE_CLI_PRESET` env var. Stored in `config.json` as `"preset"`.

| Preset    | Description                                                        |
| --------- | ------------------------------------------------------------------ |
| `runner`  | Run saved tools by ID only. Read-only lookups. No building/editing |
| `builder` | Runner + build/edit/save tools, call systems. No system CRUD       |
| `admin`   | Full access (default)                                              |

Blocked commands print a clear error showing the current preset and how to change it.

### Global Flags

| Flag               | Description                                 |
| ------------------ | ------------------------------------------- |
| `--table`          | Human-readable table output (default: JSON) |
| `--full`           | Disable truncation of large fields          |
| `--api-key <key>`  | Override API key                            |
| `--endpoint <url>` | Override API endpoint                       |

---

## Workflow

### Building a Tool

1. **Load relevant protocol references** from `references/` based on the systems involved (http, postgres, graphql, etc.)
2. Use `sg system find` for every involved system — note `storedCredentials` and the system URL
3. Use `sg system search-docs` for each system — look up endpoints, auth patterns, pagination, response structure
4. Use `sg system call` to test 1-2 primary endpoints — verify response structure and field names before building
5. Call `sg tool build --config '{...}'` with the full tool config (see Reference → Tool Config Schema)
6. Test with `sg tool run --draft <draftId>`. Use `--include-step-results` to inspect raw step data
7. Iterate using `sg tool edit --draft <draftId> --patches '[...]'` (see Reference → Tool Editing)
8. Present results to the user and ask for approval. Only then run `sg tool save --draft <draftId>`

### Editing a Tool

1. Use `sg tool find --id <toolId>` or `sg tool find <query>` to locate the tool and inspect its current config
2. Determine whether upstream steps use object or array selectors so you reference `.data` correctly in downstream code
3. Plan the JSON Patch operations (RFC 6902)
4. Apply with `sg tool edit --tool <toolId> --patches '[...]'` (or `--draft <draftId>` for drafts)
5. Re-run to verify behavior

### Creating/Editing a System

1. Search for an existing system first: `sg system find <query>`
2. If creating: `sg system create --name "..." --url "..." --credentials '{...}'`. Prefer `--template <id>` when one exists — it auto-fills URL and OAuth config
3. For OAuth: `sg system oauth --system-id <id> --scopes "..."` opens a browser flow. User approves → tokens saved automatically
4. Verify connectivity with `sg system call`
5. For updates: `sg system edit --id <id>` with the fields to change

### Running a Tool (Ad-hoc)

```bash
sg tool run --tool <toolId> --payload '{"userId":"123"}'
sg tool run --draft <draftId> --payload-file payload.json
```

Streams live execution logs to the terminal. Use `--include-step-results` for raw per-step responses and `--include-config` for the full config dump.

---

## Reference

### Tool Translation (web agent tool → CLI command)

Agents familiar with the web tool names can map them directly to CLI commands:

| Web agent tool               | CLI command                                   | Notes                                                              |
| ---------------------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| `build_tool`                 | `sg tool build --config '{...}'`              | CLI is not AI-powered — you provide the full JSON config           |
| `edit_tool`                  | `sg tool edit --tool <id> --patches '[...]'`  | JSON Patch (RFC 6902). Use `--draft <id>` for drafts               |
| `run_tool`                   | `sg tool run --tool <id>` / `--draft <id>`    | Add `--include-step-results` to inspect per-step data              |
| `save_tool`                  | `sg tool save --draft <draftId>`              | Persists a draft to the database                                   |
| `inspect_tool` / `find_tool` | `sg tool find --id <id>` / `sg tool find <q>` | Full config with `--id`, compact search with a query string        |
| `create_system`              | `sg system create --name "..." --url "..."`   | Use `--template <id>` when available                               |
| `edit_system`                | `sg system edit --id <id> ...`                | Supports `--env dev\|prod`                                         |
| `find_system`                | `sg system find <query>` / `--id <id>`        | Returns `storedCredentials` and system URL                         |
| `call_system`                | `sg system call --url "..." --system-id <id>` | Authenticated ad-hoc calls for testing / schema introspection      |
| `search_documentation`       | `sg system search-docs --system-id <id> -k`   | Targeted keyword search over ingested system docs                  |
| `authenticate_oauth`         | `sg system oauth --system-id <id> --scopes`   | Opens browser flow. Supports `--grant-type client_credentials` too |
| `get_runs`                   | `sg run list` / `sg run get <runId>`          | Filter `list` by `--tool`, `--status`, `--source`, `--limit`       |
| (no direct equivalent)       | `sg init`, `sg update`, `sg skill`            | CLI-specific setup, updater, and this reference system             |

Web-agent-only concepts with no CLI equivalent: `load_skill` (references are accessed via `sg skill <topic>` instead), `create_schedule`/`edit_schedule`/`find_schedule` (manage schedules via web app or REST API), `authenticate_oauth`'s dedicated MCP `authenticate` tool (CLI uses `sg system oauth`).

### Command Reference

**`sg init`** — Interactive or non-interactive setup. Creates `.superglue/` config. Flags: `--api-key`, `--endpoint`, `--preset`, `--global`.

**Tool commands:**

```bash
sg tool build --config '{"id":"...","steps":[...]}'       # inline JSON
sg tool build --config tool.json                          # from file
sg tool build --id my-tool --instruction "..." --steps steps.json --payload '{...}'
sg tool run --draft <draftId> --payload '{"userId":"123"}'
sg tool run --tool my-tool --payload-file payload.json --include-step-results
sg tool edit --draft <draftId> --patches '[{"op":"replace","path":"/steps/0/config/url","value":"..."}]'
sg tool edit --tool my-tool --patches patches.json
sg tool save --draft <draftId>
sg tool list
sg tool find "shopify orders"       # keyword search (compact results)
sg tool find --id my-tool           # exact lookup (full config)
```

**System commands:**

```bash
sg system create --name "My API" --url https://api.example.com --credentials '{"api_key":"sk-xxx"}'
sg system create --name "Slack" --template slack
sg system edit --id my_api --credentials '{...}'
sg system list
sg system find slack
sg system find --id my_api --env dev
sg system call --url https://api.example.com/users --system-id my_api --method GET \
  --headers '{"Authorization":"Bearer <<my_api_access_token>>"}'
sg system search-docs --system-id slack -k "send message channels"
sg system oauth --system-id gmail --scopes "https://www.googleapis.com/auth/gmail.readonly"
sg system oauth --system-id my_api --grant-type client_credentials --scopes "read write"
```

**Run commands:**

```bash
sg run list --tool my-tool --status failed --limit 20
sg run get <runId> --fetch-results
```

**File attachments:**

```bash
sg tool run --draft <id> --payload '{"data":"file::mysheet"}' --file mysheet=data.xlsx
```

Attach files with repeatable `--file key=path`. Reference in payloads with `file::<key>`. Auto-parsed to JSON where applicable. See `references/file-handling.md` for the full reference syntax including `.raw`, `.base64`, and `.extracted` suffixes.

### Tool Config Schema

```json
{
  "id": "kebab-case-tool-name",
  "instruction": "Brief 1-2 sentence description of what this tool does and returns",
  "steps": [
    {
      "id": "unique-step-id",
      "config": {
        "type": "request",
        "systemId": "example_system",
        "url": "<<example_system_url>>/endpoint?param=<<payload_field>>",
        "method": "GET",
        "headers": { "Authorization": "Bearer <<example_system_access_token>>" },
        "queryParams": { "limit": "10" },
        "body": "{ \"key\": \"<<payload_field>>\" }"
      },
      "dataSelector": "(sourceData) => sourceData.previousStep.data.items",
      "failureBehavior": "fail",
      "modify": false
    }
  ],
  "outputTransform": "(sourceData) => sourceData.stepId.data",
  "outputSchema": { "type": "object", "properties": {} },
  "inputSchema": { "type": "object", "properties": {} }
}
```

**Request step fields** (HTTP, Postgres, MSSQL, Redis, FTP/SFTP, SMB) — see protocol-specific references for full details:

| Field         | Type   | Description                                                              |
| ------------- | ------ | ------------------------------------------------------------------------ |
| `type`        | string | `"request"` (default, can be omitted)                                    |
| `systemId`    | string | Optional. Links system credentials for `<<systemId_credKey>>` resolution |
| `url`         | string | Full URL with `<<variable>>` placeholders. Required.                     |
| `method`      | string | HTTP method (HTTP only)                                                  |
| `headers`     | object | HTTP headers with credential placeholders (HTTP only)                    |
| `queryParams` | object | URL query parameters (HTTP only)                                         |
| `body`        | string | Request body / DB query / Redis command / file operation                 |
| `pagination`  | object | Auto-pagination config (HTTP only, see `references/http.md`)             |

**Transform step fields:**

| Field           | Type   | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| `type`          | string | `"transform"` — required for transform steps       |
| `transformCode` | string | `(sourceData) => transformedData` — single-line JS |

Transform steps do NOT have `systemId`, `url`, `method`, `headers`, `body`, `queryParams`, or `pagination`.

**Step behavior fields:**

| Field             | Type    | Description                                          |
| ----------------- | ------- | ---------------------------------------------------- |
| `dataSelector`    | string  | JS function controlling step input and loop mode     |
| `failureBehavior` | string  | `fail` (default) or `continue`                       |
| `modify`          | boolean | Set `true` only when the step writes/updates/deletes |

### Expression Syntax (`<<>>`)

All step config fields (url, headers, body, queryParams) support `<<expression>>` placeholders.

**Simple top-level keys** — only these work without arrow functions:

```
<<userId>>             payload inputs
<<currentItem>>        whole current loop item
<<page>> <<offset>> <<cursor>> <<limit>> <<pageSize>>   pagination variables
<<systemId_api_key>>   system credentials (namespaced: systemId_credKey)
<<systemId_url>>       system base URLs (namespaced: systemId_url)
<<sg_auth_email>>      email of the authenticated user (NOT available in scheduled runs)
```

Simple `<<varName>>` only works for top-level keys. No dots, no nesting. `<<currentItem.id>>`, `<<sourceData.userId>>`, `<<user.name>>` all FAIL at runtime.

**Arrow function expressions** — for everything else:

```
<<(sourceData) => sourceData.currentItem.player_id>>
<<(sourceData) => sourceData.getUsers.data.map(u => u.id)>>
<<(sourceData) => JSON.stringify({ ids: sourceData.fetchUsers.data.map(u => u.id) })>>
```

Object/array return values are `JSON.stringify`'d automatically when spliced into strings.

### sourceData Object

`sourceData` is the cumulative state available to every JS expression, data selector, and transform:

```javascript
sourceData = {
  // Payload fields at ROOT level (NEVER use sourceData.payload.*)
  userId: "123",
  date: "2024-01-15",

  // Previous step results, keyed by step ID
  getUsers: { currentItem: {}, data: { users: [...] }, success: true },   // object selector
  fetchDetails: [                                                           // array selector
    { currentItem: "id1", data: { name: "Alice" }, success: true },
    { currentItem: "id2", data: { name: "Bob" }, success: true }
  ],

  // Current loop item (only set inside a looping step's config)
  currentItem: { id: 1 },

  // Credentials (flattened, namespaced)
  my_api_access_token: "...",
  my_api_api_key: "..."
}
```

### Step Result Envelopes

**Every** step result is wrapped in `{ currentItem, data, success }`. You MUST account for this when writing data selectors or transforms.

- **Object selector (or none)** — access via `sourceData.stepId.data`
- **Array selector (loop)** — array of envelopes: `sourceData.stepId.map(i => i.data)`
- **Paginated step** — all pages merged into a single `.data` field: access via `sourceData.stepId.data`. Do NOT `.map()` over it — returns a single object if one result, array if multiple (unwrapped from single-element array).

NEVER access step results without `.data`. `sourceData.stepId.results` hits the envelope, not the API response.

### Data Selectors

Control what a step receives as input and whether it loops:

| Return type        | Behavior                            |
| ------------------ | ----------------------------------- |
| Single object      | Step runs once with that object     |
| Array              | Step runs once per item (loop mode) |
| `undefined`/`null` | Step receives full sourceData       |

In loop mode, `sourceData.currentItem` is set to the current array element. Empty arrays are valid — the step skips execution.

### Transform Steps vs outputTransform

| Need                                        | Use                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| Reshape data for a SUBSEQUENT request step  | Transform step (`config.type: "transform"`)                            |
| Shape the final tool output                 | `outputTransform` (runs after all steps; slightly different signature) |
| Control input / looping for a step          | `dataSelector` on the step                                             |
| Inline data computation in URL/body/headers | `<<(sourceData) => ...>>` expressions                                  |

`outputTransform` must be a single-line JS string (no literal newlines or tabs).

**Complex request bodies** — when a body needs data from multiple steps or aggregation, use a preceding transform step:

```javascript
// Step: prepareBody (transform)
transformCode: "(sourceData) => { var items = sourceData.step1.data.results; return { data: items.filter(function(i) { return i.active; }), count: items.length }; }";

// Step: submitData (request)
body: "<<(sourceData) => JSON.stringify(sourceData.prepareBody.data)>>";
```

### Execution Pipeline

For each step in order:

1. Build `sourceData`: `{ ...originalPayload, ...previousStepResults, ...credentials }`
2. Run `dataSelector(sourceData)` → determines single vs loop execution
3. For each item: merge `currentItem` into `sourceData`, resolve `<<>>` variables, execute step
   - **Request step**: makes the HTTP/DB/FTP/Redis call, raw response becomes `.data`
   - **Transform step**: runs `transformCode(sourceData)`, return value becomes `.data`
4. Wrap result: `{ currentItem, data, success }` and store in `sourceData[stepId]`
5. After all steps: run `outputTransform(sourceData)` to shape final output

All user-provided JS runs in an isolated Deno sandbox.

### Credentials and Systems

Credentials are namespaced as `<<systemId_credentialKey>>` and resolved server-side at execution time. You MUST explicitly reference them:

```
System id="stripe", storedCredentials: api_key → "sk_proj****"
→ Available as: <<stripe_api_key>>
```

**Auth header patterns:**

```json
{"Authorization": "Bearer <<stripe_api_key>>"}
{"Authorization": "Bearer <<gmail_access_token>>"}
{"X-API-Key": "<<my_api_api_key>>"}
{"Authorization": "Basic <<my_api_username>>:<<my_api_password>>"}
```

Basic auth auto-encodes: if the value after `Basic ` isn't already base64, the engine encodes it.

**System URL variables** — use these instead of hardcoding base URLs. They switch automatically between dev/prod environments:

```json
{ "url": "<<salesforce_url>>/services/data/v58.0/sobjects/Account" }
```

**Credential lifecycle:**

- Pass ALL credentials (including secrets) via `--credentials '{"api_key":"...","client_secret":"..."}'` on create/edit
- OAuth tokens (`access_token`, `refresh_token`) auto-refresh before each step execution
- Non-sensitive fields (`client_id`, `auth_url`, `token_url`) are stored alongside secrets in the same `--credentials` JSON

**System IDs:** lowercase letters, numbers, underscores only — no hyphens. Used for credential namespacing.

**Templates:** auto-populate endpoints and OAuth config. `sg system find` lists available templates.

- **Preconfigured OAuth** (no user `client_id`/`client_secret` needed): slack, salesforce, asana, notion, airtable, jira, confluence
- **Common OAuth templates:** gmail, googleDrive, googleCalendar, googleSheets, slack, salesforce, github, jira, confluence, notion, airtable, hubspot, shopify, dropbox, zoom, microsoft

**Custom OAuth (no template):** must include `client_id`, `client_secret`, `auth_url`, `token_url` in credentials at create time — or add later with `sg system edit`:

```bash
sg system create --name "My API" --url https://api.example.com \
  --credentials '{"client_id":"...","client_secret":"...","auth_url":"https://example.com/oauth/authorize","token_url":"https://example.com/oauth/token"}'
```

**Dev/Prod environments:** `--env dev|prod` at creation (immutable afterward). Two systems with the same ID but different environments are automatically linked. Dev systems inherit documentation from their linked prod system. When creating a dev system, always ask for new credentials — never copy from prod.

**System-specific instructions:** systems may include `specificInstructions` from the user (visible in `sg system find` output). Follow them when present — they override general patterns.

### Tool Editing (JSON Patch)

`sg tool edit` applies RFC 6902 JSON Patch operations. Each operation:

```typescript
{
  op: "add" | "remove" | "replace" | "move" | "copy" | "test",
  path: string,   // JSON Pointer, e.g. "/steps/0/config/url"
  value?: any,    // required for add, replace, test
  from?: string   // required for move, copy
}
```

**Key paths:**

- `/instruction` — tool description
- `/steps/N` — step at index N
- `/steps/N/config/url`, `/steps/N/config/method`, `/steps/N/config/headers`, etc.
- `/steps/N/dataSelector` — JS function controlling input + loop mode
- `/outputTransform` — final output shaping function
- `/outputSchema` — optional JSON schema for output

**Operations:**

- `replace` — Change an existing value. **Path must exist** — if the field is `null` or absent, `replace` fails. Prefer `add` when the field might be absent.
- `add` — Creates if missing, overwrites if present. Append to array with `/steps/-`.
- `remove` — Delete field or array element.
- `move` — Reorder or relocate.

**Validation:**

- Never patch `id` — tool IDs and draft IDs are immutable
- `op` and `path` required; `path` must start with `/`
- Patches applied **sequentially** — later patches see effects of earlier ones
- After patches, same validation as building (valid id, steps array, URLs on request steps, transformCode on transform steps)

**Downstream shape changes:** if you change a step's output shape, check if later dataSelectors and `outputTransform` need updating. When removing array elements, subsequent indices shift down.

### Draft Management

Drafts live in `.superglue/drafts/<draftId>.json`. Created by `sg tool build`, updated by `sg tool edit`, deleted by `sg tool save`. Ephemeral — not persisted across sessions.

### Deployment

After building and saving, tools can be invoked from code via REST API, SDK, or webhook. See `references/integration.md` for complete SDK (TypeScript/Python), REST API, and webhook examples including retry patterns.

**IP whitelisting:** if a customer's system requires IP whitelisting (firewall rules, security groups, etc.), superglue's outbound IPs are `34.234.12.178` and `18.198.191.215`.

Quick reference:

```bash
# REST (sync)
curl -X POST "https://api.superglue.cloud/v1/tools/{toolId}/run" \
  -H "Authorization: Bearer $SUPERGLUE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"inputs":{"userId":"123"}}'

# Webhook trigger (async, fire-and-forget)
curl -X POST "https://api.superglue.cloud/v1/hooks/{toolId}?token=$SUPERGLUE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"userId":"123"}'
```

---

## Common Pitfalls

- **Guessing API endpoints** — always verify with `sg system search-docs` or `sg system call` first
- **`systemId` in the wrong place** — it belongs inside `step.config.systemId`, not on the step object
- **`<<(sourceData) => sourceData.payload.X>>`** — payload fields are at root level of `sourceData`, not under `.payload`
- **`<<currentItem.id>>`** — must use arrow function syntax: `<<(sourceData) => sourceData.currentItem.id>>`
- **Hardcoded pagination params** — use `<<page>>`, `<<offset>>`, `<<cursor>>`, `<<limit>>`
- **Missing auth headers** — credentials are never automatically included in any protocol, including for OAuth systems (only token refresh is automatic)
- **Hardcoded base URLs** — prefer system URL variables (`<<systemId_url>>`) for environment portability
- **Empty `instruction`** — never leave the tool-level `instruction` blank
- **Adding `outputSchema` unsolicited** — only add when the user explicitly requests a specific response structure
- **Multi-line `outputTransform`** — must be a single-line JS string (no literal newlines or tabs)
- **Regex literals in transforms** — `/.../ ` literals and complex escapes corrupt during serialization. Use `new RegExp()`, `.split()`, or `new URL()` instead
- **Complex bodies inline** — for bodies built from multiple steps, use a preceding transform step rather than stuffing multi-statement logic into `<<>>` expressions
- **Double-encoded JSON** — when the body contains nested/stringified JSON (e.g. LLM APIs), have `<<>>` expressions return a string via `JSON.stringify(...)`, and use a single expression for the whole body rather than mixing `<<>>` with static JSON
- **POST for read-only ops** — GraphQL queries via POST should have `modify: false`. Don't rely on HTTP method alone
- **Saving without approval** — always present `sg tool run` results and ask before `sg tool save`
- **`sg_auth_email` in scheduled runs** — not available in scheduler-triggered executions. Tools using `<<sg_auth_email>>` will fail

---

## Error Recovery

For protocol-specific error recovery (HTTP, Postgres, MSSQL, Redis, GraphQL, SFTP/SMB), read the matching reference file in `references/`. General strategies below.

### Tool build fails validation

`sg tool build` returns a validation error. Read the message, fix the config, and re-run. Common causes: missing `id`, empty `steps`, missing `url` on request steps, missing `transformCode` on transform steps, `systemId` on the step object instead of `step.config.systemId`.

### Tool runs but a step fails

1. Re-run with `--include-step-results` to see raw per-step responses and `data` fields
2. Use `sg system call` to test the failing endpoint directly — isolates step config vs system/auth issues
3. Use `sg system find --id <systemId>` to verify `storedCredentials` keys match what the step references
4. For HTTP: load `references/http.md` and follow the error recovery section (endpoint vs system isolation, credential scopes, rate limiting)
5. For databases: load `references/postgres.md` or `references/mssql.md` — SSL/TLS and schema issues are common causes
6. Use `sg system search-docs` and web search to verify the current API shape. APIs change across versions

### Authentication failures

1. Run `sg system find --id <systemId>` → check `storedCredentials` for masked but present values
2. For OAuth: re-run `sg system oauth` if tokens are missing or expired
3. For custom OAuth: verify `client_id`, `client_secret`, `auth_url`, `token_url` are all present. Confirm the redirect URI is registered on the provider's OAuth app
4. Check scopes — 403 / empty responses often mean the token lacks required scopes

### System creation fails

1. Check for an existing system with the same ID — use `sg system edit` to update instead
2. Ensure `id` uses only lowercase letters, numbers, and underscores (no hyphens)
3. For templated systems, verify the template ID is correct (`sg system find` lists available templates)

### Data selector / transform returns wrong data

1. Confirm whether the upstream step used an object selector (access `.data` directly) or an array selector (access via `.map(i => i.data)`)
2. Re-run with `--include-step-results` to see the exact envelope shape
3. Paginated steps merge into a single `.data` field — do not `.map()` over them
4. Verify `sourceData.currentItem` is only referenced inside looping steps (set by the step's own `dataSelector`, not upstream)

### Persistent failures

After 3-5 unsuccessful iterations on the same step, stop and ask the user for clarification or additional context (credentials, docs, expected payload shape). Don't keep guessing — gather evidence first.
