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

## Authentication

API, SDK, CLI, and webhook usage require an **API key**. MCP clients can use OAuth when supported, or API keys for non-interactive setup. Self-hosted deployments also need the API/MCP endpoint URL. There are no workspace IDs, project IDs, or other identifiers.

MCP authentication is separate from API/SDK/CLI setup. For MCP OAuth, dynamic client registration, Langdock setup, and named server permissions, use the MCP documentation.

Users can generate and manage API keys in **My Credentials -> superglue API keys**. The API endpoint is displayed on the same page.

## Interfaces

- **Web app** — primary UI for building, testing, and managing tools and systems
- **TypeScript/Python SDK** — https://docs.superglue.cloud/sdk/overview
- **REST API** — https://docs.superglue.cloud/api-reference/
- **MCP Server** — https://docs.superglue.cloud/mcp/using-the-mcp
- **CLI** — `npm install -g @superglue/cli` — https://docs.superglue.cloud/getting-started/cli-skills

### Webhook Triggers

Tools can be triggered via webhook: `POST {apiEndpoint}/v1/hooks/{toolId}?token={apiKey}`

On superglue Cloud, the API endpoint is `https://api.superglue.cloud`. Self-hosted and enterprise deployments use their own API endpoint — users can find theirs under My Credentials -> superglue API keys.

### OAuth Callback URL

OAuth flows require a callback URL: `{appEndpoint}/api/auth/callback`

On superglue Cloud, the app endpoint is `https://app.superglue.cloud`. Self-hosted and enterprise deployments use their own app URL. If a user doesn't know their endpoints, they can check the browser URL bar for the app endpoint, and My Credentials -> superglue API keys for the API endpoint.

## Web App UI Layout

Use this section as the source of truth for high-level web app navigation. Do not invent UI locations that are not listed here.

The persistent left sidebar contains these top-level items:

- **Agent** (`/`) — primary AI chat assistant for building and debugging tools and systems.
- **Landscape** (`/landscape`) — graph overview of tools, systems, and their connections.
- **Tools** (`/tools`, detail at `/tools/{toolId}`) — saved tools; opens the tool playground for editing, testing, and running.
- **Systems** (`/systems`, detail at `/systems/{systemId}`) — connected external systems with credentials and documentation.
- **My Credentials** (`/credentials`) — credential management. The **My Credentials** section is for personal user-owned system credentials; the **superglue API keys** section is for API keys. Admins and members open it inside the normal app shell from the sidebar.
- **Runs** (`/runs`, detail at `/runs/{runId}`) — execution history for full, draft, and single-step tool runs. Runs is a top-level sidebar item, not a Control Panel sub-item.
- **Control Panel** (`/admin`) — expandable group for organization and account administration:
  - **Overview** (`/admin`) — dashboard summary, including failed-run and schedule summaries.
  - **Schedules** (`/admin?view=schedules`) — scheduled and recurring tool runs.
  - **Access Rules** (`/admin/access`) — role and access-rule configuration; visible to admins on paid tiers. Use the access-rules reference for RBAC behavior, base roles, and personal roles.
  - **Organization** (`/admin?view=organization`) — organization members, invites, and org-level settings; visible on paid tiers. Member management actions are admin-gated.
  - **MCP Servers** (`/admin?view=mcp-servers`) — manage and export named MCP server endpoints. Use the MCP documentation for behavior, permissions, and client setup.
  - **Notifications** (`/admin?view=notifications`) — user notification preferences and failure-alert channels.

Below the navigation, the sidebar shows the organization switcher and Sign Out. Depending on the plan, it also shows **Upgrade Plan** or **Subscription**; Subscription opens the external Stripe billing portal. There is no standalone Settings, Profile, or in-app Billing page.

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
