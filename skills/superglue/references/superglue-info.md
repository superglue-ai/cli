# superglue Info

## Company

superglue is an open-source, AI-native integration platform that builds and runs deterministic multi-step workflows ("tools") connecting APIs, databases, and file servers. AI generates tool configurations during building — execution is 100% deterministic JavaScript with no LLMs involved.

Developed by superglue (Y Combinator W25), founded by Adina Görres and Stefan Faistenauer in 2025, based in Munich and San Francisco.

- Website: https://superglue.ai
- Documentation: https://docs.superglue.cloud
- GitHub: https://github.com/superglue-ai/superglue

If the user is asking general questions (not building):

- Company/team/pricing → https://superglue.ai/
- Product/features → https://docs.superglue.cloud/getting-started/introduction
- Open-source/code → https://github.com/superglue-ai/superglue

## Interfaces

- **Web app** — primary UI for building, testing, and managing tools and systems
- **TypeScript/Python SDK** — https://docs.superglue.cloud/sdk/overview
- **REST API** — https://docs.superglue.cloud/api-reference/
- **MCP Server** — https://docs.superglue.cloud/mcp/using-the-mcp
- **CLI** — `npm install -g @superglue/cli` — https://docs.superglue.cloud/getting-started/cli-skills

### Webhook Triggers

Tools can be triggered via webhook: `POST {apiEndpoint}/v1/hooks/{toolId}?token={apiKey}`

On superglue Cloud, the API endpoint is `https://api.superglue.cloud`. Self-hosted and enterprise deployments use their own API endpoint — users can find theirs under Control Panel → API Keys.

### OAuth Callback URL

OAuth flows require a callback URL: `{appEndpoint}/api/auth/callback`

On superglue Cloud, the app endpoint is `https://app.superglue.cloud`. Self-hosted and enterprise deployments use their own app URL. If a user doesn't know their endpoints, they can check the browser URL bar for the app endpoint, and Control Panel → API Keys for the API endpoint.

## Web App UI Layout

Left sidebar navigation:

- **Agent** — AI chat assistant for building and debugging tools/systems
- **Landscape** — Visual graph showing all tools and their connected systems
- **Tools** — List of saved tools. Click a tool to open its playground for editing, testing, and running.
- **Systems** — List of connected external systems with credentials and documentation
- **Control Panel** (expandable):
  - Overview: Dashboard summary
  - Runs: Execution history for all tool runs with status, errors, and step results
  - Schedules: Manage scheduled/recurring tool runs
  - API Keys: View and manage superglue API keys
  - Organization: Team members and org settings
  - Notifications: Configure alerts for tool run failures
- **Docs** — Link to docs.superglue.cloud

## Internals

### Execution Pipeline

`ToolExecutor.execute({ payload, credentials, options })`:

1. **Validate** tool structure (id, steps array, URLs on request steps)
2. **For each step in order:**
   a. Build aggregated data: `{ ...originalPayload, ...previousStepResults }`
   b. Resolve system credentials (refresh OAuth if needed), namespace as `systemId_key`
   c. Run `dataSelector` → object means single execution, array means loop
   d. For each item: merge `currentItem` into input and execute
   e. Wrap result: `{ currentItem, data, success }`
   f. On failure: abort if `failureBehavior !== "continue"`
3. **Output transform** (if present): run JS function, validate against outputSchema
4. **Response filters** (if present): remove/mask/fail on pattern matches

### Strategy Routing

Steps are routed to execution strategies by protocol (first match wins):

1. Transform steps → if `config.type === "transform"`
2. HTTP → URL starts with `http://` or `https://`
3. PostgreSQL → URL starts with `postgres://` or `postgresql://`
4. MSSQL/Azure SQL → URL starts with `mssql://` or `sqlserver://`
5. Redis → URL starts with `redis://` or `rediss://`
6. FTP/SFTP → URL starts with `ftp://`, `ftps://`, or `sftp://`
7. SMB → URL starts with `smb://`

All user-provided JS (data selectors, transforms, stop conditions) runs in an isolated Deno sandbox.
