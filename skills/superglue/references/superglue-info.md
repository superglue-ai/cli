# superglue Info

## Company

superglue is an open-source, AI-native integration platform that builds and runs deterministic multi-step workflows ("tools") connecting APIs, databases, and file servers. AI generates tool configurations during building — execution is 100% deterministic JavaScript with no LLMs involved.

Developed by superglue (Y Combinator W25), founded by Adina Görres and Stefan Faistenauer in 2025, based in Munich and San Francisco.

- Website: https://superglue.ai
- Documentation: https://superglue.ai/docs/
- GitHub: https://github.com/superglue-ai/superglue

If the user is asking general questions (not building):

- Company/team/pricing → https://superglue.ai/
- Product/features → https://superglue.ai/docs/getting-started/introduction/
- Open-source/code → https://github.com/superglue-ai/superglue

## Cloud Usage Tiers

- Cloud tiers are **Trial**, **Pro**, **Team**, and **Enterprise**; billing-enabled apps expose upgrades through the in-app **Upgrade Plan** button, not a separate Billing page.
- **Trial** includes 1M input tokens and 100 runs lifetime; **Pro** is €59/$69 per month with 3M input tokens/user/month and 3,000 runs/user/month.
- **Team** is €99/$119 per seat/month with 5M input tokens/user/month and 5,000 runs/user/month; Team includes organization management, activity tracking, and custom MCP servers.
- **Enterprise** is custom-priced with unlimited usage limits by default, enterprise access controls, and self-hosting/on-prem options.
- These cloud tier details do not apply to self-hosted or enterprise deployment setups.

## Authentication

API, SDK, and webhook usage require an **API key**. The CLI should use browser OAuth via `sg login`; headless/API-key CLI auth is available through environment variables, flags, or `config.json` for CI and legacy automation. MCP clients can use OAuth when supported, or API keys for non-interactive setup. Self-hosted deployments also need the API/MCP endpoint URL. There are no workspace IDs, project IDs, or other identifiers.

MCP authentication is separate from API/SDK/CLI setup. For MCP OAuth, dynamic client registration, Langdock setup, and named server permissions, use the MCP documentation.

Users can generate and manage API keys on the standalone **API Keys** page (`/api-keys`).

Each key carries an access scope, set at creation and editable later. A scope is a surface plus an action: the surfaces are **API & CLI** (everything except MCP, including the agent and the CLI) and **MCP** (assistants connected over MCP), and the actions are **read**, **write**, and **execute**. Writing covers creating, changing, and deleting. Executing covers running tools and talking to the agent, so a key with only read and write cannot run anything. MCP requests are always tool calls, so that surface only takes execute. Keys created before scoping keep full access. A scope only narrows a key; it never grants more than the owner's role permissions. A scoped key cannot reach the API keys endpoints at all, so it can neither widen itself nor read another key's value. Full access is therefore its own choice at creation, not the result of selecting every surface: a key that holds every scope is still a scoped key and still cannot manage API keys. A request outside the scope returns 403.

Two limits are worth stating plainly. Execute reaches the agent, and the agent's own tools create and edit systems, credentials, and roles, so an execute scope is not a run-only scope — only the owner's role permissions bound it. And scopes apply to API keys alone: an MCP client that connects through OAuth instead of a key is unscoped and carries the user's full authority.

## Interfaces

- **Web app** — primary UI for building, testing, and managing tools and systems
- **TypeScript/Python SDK** — https://superglue.ai/docs/sdk/overview/
- **REST API** — https://superglue.ai/docs/api/
- **MCP Server** — https://superglue.ai/docs/mcp/using-the-mcp/
- **CLI** — `npm install -g @superglue/cli` — https://superglue.ai/docs/getting-started/cli-skills/

### Webhook Triggers

Tools can be triggered via webhook: `POST {apiEndpoint}/v1/hooks/{toolId}?token={apiKey}`

On superglue Cloud, the API endpoint is `https://api.superglue.cloud`. Self-hosted and enterprise deployments use their own API endpoint from deployment configuration.

### OAuth Callback URL

OAuth flows require a callback URL: `{appEndpoint}/api/auth/callback`

On superglue Cloud, the app endpoint is `https://app.superglue.cloud`. Self-hosted and enterprise deployments use their own app URL. If a user doesn't know their endpoints, they can check the browser URL bar for the app endpoint and deployment configuration for the API endpoint.

### Cloud Networking

If a customer's system requires IP allowlisting for firewall rules, security groups, or vendor access controls, superglue Cloud outbound requests come from `34.234.12.178` and `18.198.191.215`. These IPs apply to superglue Cloud only; self-hosted and enterprise deployments use deployment-specific networking.

## Web App UI Layout

Use this section as the source of truth for high-level web app navigation. Do not invent UI locations that are not listed here.

Brain contains projects, playbooks, artifacts, and uploaded files. Capabilities contains project-attachable systems and tools. Credentials, MCP servers, and schedules configure execution but are not project members. Projects group selected Brain items and capabilities for focused work without changing RBAC. The organization workspace is the virtual default containing all visible resources.

The persistent left sidebar contains these top-level items:

- **Agents** — primary AI chat assistant. Selecting it only expands or collapses the project-thread tree. `/` starts an empty workspace chat. Selecting a project expands or collapses its threads; its plus control opens a reusable empty project-scoped draft. Drafts appear as thread rows only after they persist. Selecting a persisted thread opens `/agents/{sessionId}`. Controls reveal older chats or projects in groups of three and collapse them again.
- **Brain** — expandable group for context and focused work:
  - **Projects** (`/projects`) — organization workspace and custom project folders.
  - **Playbooks** (`/playbooks`, detail at `/playbooks/{playbookId}`) — reusable guidance for recurring work. Built-in and custom playbooks share one grid; built-ins are labeled and can be duplicated.
  - **Artifacts** (`/artifacts`, detail at `/artifacts/{artifactId}`) — interactive outputs.
  - **Files** (`/files`) — uploaded source material.
- **Capabilities** — expandable group for connected and executable resources:
  - **Tools** (`/tools`, detail at `/tools/{toolId}`) — saved tools; opens the tool playground for editing, testing, and running.
  - **Systems** (`/systems`, detail at `/systems/{systemId}`) — connected external systems with credentials and documentation.
  - **Credentials** (`/credentials`) — manage the credentials you own for each system, and the credentials shared with you. Admins and members open it inside the normal app shell from the sidebar. API keys are not managed here.
  - **MCP Servers** (`/mcp-servers`) — manage and export named MCP server endpoints. Use the MCP documentation for behavior, permissions, and client setup.
  - **Schedules** (`/schedules`) — scheduled and recurring tool runs.
- **Control Panel** (`/admin`) — expandable group for organization and account administration:
  - **Runs** (`/runs`, detail at `/runs/{runId}`) — execution history for full, draft, and single-step tool runs.
  - **Activity Tracker** (`/admin`) — organization activity summary for resource creation, shares, and tool runs.
  - **Access Rules** (`/admin/access`) — role and access-rule configuration; visible to admins on paid tiers. Use the access-rules reference for RBAC behavior, base roles, and personal roles.
  - **Organization** (`/organization`) — visible on paid tiers as a standalone page without tabs. It shows members, invitations, role assignment, and member-management actions; management actions are admin-gated.

Below the navigation, the sidebar shows the current organization menu. Opening it shows the signed-in user email and menu items for **API Keys** (`/api-keys`), **Settings** (`/settings`, admin-only), **Switch organization**, and **Sign Out**. When billing is enabled, the sidebar also shows **Upgrade Plan** for non-enterprise organizations; it opens the in-app upgrade flow. There is no separate in-app Billing page.

**API Keys** (`/api-keys`) is a standalone page with a simple own-key editor for superglue API keys used by API, SDK, CLI headless/API-key auth, webhook, and non-OAuth MCP clients. Org users can create, copy, delete, and re-scope their own keys.

**Settings** (`/settings`) is an admin-only standalone page with distinct sections:

- **Organization** — organization name and organization logo settings.
- **Run Settings** — run preferences: draft/single-step run visibility, run result storage, member run visibility, and delete-all-runs.
- **Notifications** — failure-alert channels for Slack and email. Slack setup opens `/settings/notifications/slack`; email setup opens `/settings/notifications/email`.

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
6. MongoDB → URL starts with `mongodb://` or `mongodb+srv://`
7. FTP/SFTP → URL starts with `ftp://`, `ftps://`, or `sftp://`
8. SMB → URL starts with `smb://`

All user-provided JS (data selectors, transforms, stop conditions) runs in an isolated Deno sandbox.
