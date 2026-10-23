# superglue Info

## Company

superglue builds AI agents for enterprise implementations. The agents connect, migrate, and implement enterprise systems. They learn how systems work from the company's own knowledge and do the implementation work that otherwise needs human coordination and engineering.

Main use cases:

- **ERP implementation**: implement NetSuite, Sage Intacct, SAP, Business Central, or Acumatica. Agents map and migrate legacy data, configure the system, and keep data in sync after go-live.
- **AI rollout**: connect ERP, CRM, databases, and internal systems to AI platforms such as Claude, with governed data access and tracking of data usage across the organization.
- **Customer onboarding**: connect customer systems, import historical data, and run the implementation end to end.

Agents build deterministic multi-step workflows ("tools") that connect APIs, databases, and file servers. AI generates tool configurations during building; saved tools execute deterministic JavaScript with no LLM calls.

superglue runs on superglue Cloud (EU and US regions) or self-hosted on the customer's own infrastructure. It is SOC 2 Type II compliant and an official Sage Intacct Tech Marketplace Partner.

Developed by superglue (Y Combinator W25), founded by Adina Görres and Stefan Faistenauer in 2025, based in Munich and San Francisco.

- Website: https://superglue.ai
- Documentation: https://superglue.ai/docs/
- GitHub: https://github.com/superglue-ai/superglue

If the user is asking general questions (not building):

- Company/team → https://superglue.ai/
- Product/features → https://superglue.ai/docs/getting-started/introduction/
- Open-source/code → https://github.com/superglue-ai/superglue

## Cloud Usage Tiers

- Cloud tiers are **Trial**, **Pro**, **Team**, and **Enterprise**. Plan controls are described under Web App UI Layout.
- **Trial** includes 1M input tokens and 100 runs lifetime; **Pro** includes 3M input tokens/user/month and 3,000 runs/user/month.
- **Team** includes 5M input tokens/user/month and 5,000 runs/user/month; Team includes organization management, activity tracking, and custom MCP servers.
- **Enterprise** has unlimited usage limits by default, enterprise access controls, and self-hosting/on-prem options.
- These cloud tier details do not apply to self-hosted or enterprise deployment setups.

## Authentication

API, SDK, and webhook usage require an **API key**. The CLI should use browser OAuth via `sg login`; headless/API-key CLI auth is available through environment variables, flags, or `config.json` for CI and legacy automation. MCP clients can use OAuth when supported, or API keys for non-interactive setup. Self-hosted deployments also need the API/MCP endpoint URL. There are no workspace IDs, project IDs, or other identifiers.

MCP authentication is separate from API/SDK/CLI setup. For MCP OAuth, dynamic client registration, Langdock setup, and named server permissions, use the MCP documentation.

Users can generate and manage API keys on the standalone **API Keys** page (`/api-keys`).

Each key carries an access scope, set at creation and editable later. A scope is a surface plus an action: the surfaces are **API & CLI** (everything except MCP, including the agent and the CLI) and **MCP** (assistants connected over MCP), and the actions are **read**, **write**, and **execute**. Writing covers creating, changing, and deleting. Executing covers running tools and talking to the agent, so a key with only read and write cannot run anything. MCP requests are always tool calls, so that surface only takes execute. Keys created before scoping keep full access. A scope only narrows a key; it never grants more than the owner's role permissions. A scoped key cannot reach the API keys endpoints at all, so it can neither widen itself nor read another key's value. Full access is therefore its own choice at creation, not the result of selecting every surface: a key that holds every scope is still a scoped key and still cannot manage API keys. A request outside the scope returns 403.

Two limits are worth stating plainly. Execute reaches the agent, and the agent's own tools create and edit connections, tools, and roles, so an execute scope is not a run-only scope — only the owner's role permissions bound it. And scopes apply to API keys alone: an MCP client that connects through OAuth instead of a key is unscoped and carries the user's full authority.

## Interfaces

- **Web app** — primary UI for building, testing, and managing tools and connections
- **TypeScript/Python SDK** — https://superglue.ai/docs/sdk/overview/
- **REST API** — https://superglue.ai/docs/api/
- **MCP Server** — https://superglue.ai/docs/mcp/using-the-mcp/
- **Microsoft Teams app** — available when the deployment has a Teams bot. Users chat with superglue, approve agent actions in cards, and mention @superglue in project channels. A Teams administrator uploads the app package from the web app URL plus `/teams/superglue-teams.zip`. Each user connects in a personal chat with superglue or under **Brain** → **Setup**.
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

Brain contains context-source setup, project folders, playbooks, and files. Files include uploads and the artifacts and spreadsheets that agents write; a file can belong to several projects. Capabilities contains tools, connections, MCP servers, and schedules; tools can be linked to projects, the others configure execution. A system is only the system ID that groups connections and tool steps. Projects are managed separately; a project links brain files and tools, and people with project access get the same access to them; playbooks are org-wide.

The persistent left sidebar contains these top-level items:

- The project switcher and session list — always visible at the top. The switcher selects one project or **All projects**, which scopes the session list and new sessions; `/` starts a session and `/agents/{sessionId}` opens a saved one. New projects are planned with the agent.
- **Brain** (`/brain`) — a file drive: the managed **Documentation** (system documentation and scraped pages) and **Playbooks** folders, one folder per project (`/brain/projects/{projectId}`), and files in no project. Files open at `/brain/files/{fileId}` and playbooks at `/brain/playbooks/{playbookId}`. Word, PowerPoint, and uploaded Excel files open read-only and look as they do in Office. Users upload files and drag them onto project folders to link them. **Setup** on Brain pages opens a dialog that connects context sources with the user's own credentials.
- **Capabilities** — expandable group for connected and executable resources:
  - **Tools** (`/tools`, detail at `/tools/{toolId}`) — saved tools; opens the tool playground for editing, testing, and running.
  - **Connections** (`/connections`, detail at `/connections/{connectionId}`) — connections to external services, grouped by system id, with secret status per connection; yours and the ones shared with you. A system ID is a namespace derived from existing connections; no system record is created. API keys are not managed here.
  - **MCP Servers** (`/mcp-servers`) — manage and export named MCP server endpoints. Use the MCP documentation for behavior, permissions, and client setup.
  - **Schedules** (`/schedules`) — scheduled and recurring tool runs.
- **Control Panel** (`/admin`) — expandable group for organization and account administration:
  - **Runs** (`/runs`, detail at `/runs/{runId}`) — execution history for full, draft, and single-step tool runs.
  - **Activity** (`/admin`) — organization activity summary for resource creation, shares, and tool runs; admin-only and requires Team or Enterprise.
  - **Access Rules** (`/admin/access`) — role and access-rule configuration; admin-only and requires Enterprise. Use the access-rules reference for RBAC behavior, base roles, and personal roles.
  - **Organization** (`/organization`) — a standalone page without tabs that requires Team or Enterprise. It shows members, invitations, role assignment, and member-management actions; management actions are admin-gated.
  - **API Keys** (`/api-keys`) — API key management.
  - **Settings** (`/settings`) — appearance and agent memory notes for every user; organization settings for admins.

The right panel's **Project plan** tab shows the selected project's tasks; with a project selected, `/projects` opens it. **New project** in the project switcher starts agent-assisted project planning; projects are created only through the agent. A project's page is its Brain folder (`/brain/projects/{projectId}`), showing the project brief, a status box with task progress and **Open plan**, and the project's **Files**. **Open plan** shows every task on a board or table and filters by label and assignee; each project has its own task labels. Projects support sharing, archive, and deletion; people with project access get the same access to its linked files.

Below the navigation, the sidebar shows the current organization menu. Opening it shows the signed-in user's name and email, lists the user's organizations and pending invitations, and contains **Sign Out**. Selecting an organization switches to it.

While a brain setup step is open, the **Set up brain** button on Brain pages shows the progress and opens the setup dialog.

When cloud billing is enabled, Trial organizations see **Upgrade Plan** in the sidebar, which opens a 15-minute call booking page. The app shows no pricing. For Pro and Team organizations, admins see **Manage Plan** in the organization menu, which opens the Stripe portal. Enterprise organizations see neither. Do not quote prices. For pricing questions, point users to **Upgrade Plan** to book a call. There is no separate Billing page.

**API Keys** (`/api-keys`) is a standalone page with a simple own-key editor for superglue API keys used by API, SDK, CLI headless/API-key auth, webhook, and non-OAuth MCP clients. Org users can create, copy, delete, and re-scope their own keys.

**Settings** (`/settings`) is a standalone page with distinct sections. Every user sees **Appearance** and **Agent memory**; the other sections are admin-only:

- **Appearance** — light, dark, or system theme.
- **Organization** — organization name.
- **Design system** (`/settings/design-system`) — the brand every document follows: colors, fonts, logos, guidelines, HTML, Word, and PowerPoint templates, reference documents, and an import from the company website.
- **Run settings** — run preferences: draft/single-step run visibility, run result storage, member run visibility, and delete-all-runs.
- **Notifications** — run-alert channels for Slack and email (on failure, success, completion, or daily/weekly summaries). Slack setup opens `/settings/notifications/slack`; email setup opens `/settings/notifications/email`.
- **Agent memory** (`/settings#settings-memory`) — every user adds, edits, and deletes their personal and organization memory notes; admins also turn agent memory on or off.
- **Timeouts** — Enterprise only: organization-level execution, protocol, and connection timeouts.

## Internals

### Execution Pipeline

`ToolExecutor.execute({ payload, credentials, options })`:

1. **Validate** tool structure (id, steps array, URLs on request steps)
2. **For each step in order:**
   a. Build aggregated data: `{ ...originalPayload, ...previousStepResults }`
   b. Resolve connection secrets (refresh OAuth if needed), namespace as `systemId_secretName`
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
9. ODBC → URL starts with `odbc://`
10. Gateway scripts → URL starts with `script://` (Secure Gateway tunnels only)
11. NetSuite SuiteCloud → URL starts with `suitecloud://`

All user-provided JS (data selectors, transforms, stop conditions) runs in an isolated Deno sandbox.
