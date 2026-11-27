# Agents

## What an agent is

Every session is an agent at work. In a chat, the agent works with the user and acts as the user. A saved agent on the Agents page works on its own and starts its own sessions for items and checks. Each saved agent has its own principal user. Its runs act as that principal, so it can use only the connections, tools, playbooks, and files shared with it. It never uses the access of the person who set it up.

- `sg agents get <agentId>` returns `agent` (settings, `principalUserId`, `destinations`, `standingPermissions`), `triggers`, and `access` (the resources shared with the agent). Webhook trigger URLs show only to editors of the agent.
- `sg agents items list <agentId>` returns the items with status (`open`, `started`, `done`, `dismissed`), the run `sessionId`, and `waitingFor` (`input` for an approval, answer, or sign-in, `handoff` after a handoff, `failure` when the run failed or was stopped, otherwise null) and `waitingSummary`, what the person needs to act on.
- The creator owns the agent. Editors of an agent can change it, give it resources, open items, open and answer its item sessions, and cancel its runs. Making someone an editor gives them use of everything shared with the agent.
- Admins have no automatic access to agents, because an agent carries the access of its connections.

Every kind works on items: each item gets its own run. A run that resolves its item marks it done; a run that hands it off or ends without saying keeps it in progress. A later update from the requester opens a closed item again. The kind is fixed at creation and sets how a run works:

| `--kind`      | Does                                                                                                   | The web app calls an item |
| ------------- | ------------------------------------------------------------------------------------------------------ | ------------------------- |
| `support`     | Takes a client's requests and works on each one, with a reply to the requester.                        | ticket                    |
| `migration`   | Profiles, loads, or ties out one object per item and round, with exceptions and a tie-out.             | job                       |
| `integration` | Writes one digest of the runs of the tools shared with it per period.                                  | digest                    |
| `status`      | Writes one status report per client project and week.                                                  | status report             |
| `testing`     | Generates UAT scripts or compares configurations for one process area and environment.                 | test cycle                |
| `scope`       | Checks one meeting or mail thread against the SOW and design documents.                                | scope review              |
| `client`      | Answers the partner's client in Slack or a mailbox. A consultant approves every write and every reply. | request                   |
| `custom`      | Follows only its instructions.                                                                         | work item                 |

A migration, testing, or scope agent usually has no trigger or a rare one: open one item per object and round with `sg agents items create`, such as `--subject "Customers, trial round 1"`, with a body that names the job type, the object, the round, and any filter. An integration agent needs one daily schedule trigger, and a status agent one weekly schedule trigger. Their instructions name the systems, the rules, and what to never touch.

Kind rules:

- **integration, status, testing:** every resolved item sends its final answer to the `report` recipients, also without a next step. The other kinds send a report only when a person must act.
- **integration:** one digest item per period, with `externalId` `digest:<YYYY-MM-DD>`. An agent that an admin owns sees the runs and schedules of every tool shared with it, whoever ran them; any other agent sees only the runs it started and the schedules it created. It reports and never edits tools or schedules.
- **status:** one report per project and ISO week. Nothing goes to the client without a consultant's approval.
- **testing:** generates scripts and compares configurations. It does not run tests and never writes to production.
- **scope:** quiet when nothing is out of scope. Nothing goes to the client.
- **support, client:** a request to a host outside the agent's shared connections needs approval of the exact call.
- **client:** the agent always asks. Use `--approval-mode ask`; `act` and standing permissions are refused. A proposal holds only exact writes, and sending email is refused. Replies go to the source thread in the partner's name and never mention superglue. Payments, payee and bank-detail changes, and requests about another client or data outside its connections are a handoff with a holding reply. A mailbox sender is not verified: check unexpected senders. Give the agent one client, one channel, and a read-only role in the client's system.

## Commands

| Command                                                     | Result                                                                                                   |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `sg agents list`                                            | The agents you can view. `--full` includes the soul, instructions, and lists.                            |
| `sg agents get <agentId>`                                   | The agent, its triggers, and the resources shared with it.                                               |
| `sg agents create --kind <kind> --name <name>`              | Creates an agent. You become its owner. It gets its own principal user.                                  |
| `sg agents update <agentId> ...`                            | Changes only the given fields. File flags replace the desired lists.                                     |
| `sg agents delete <agentId>`                                | Deletes the agent and its principal user. Resources the agent owns move to you.                          |
| `sg agents share <agentId> --connection <id>`               | Shares a connection, playbook, or file with the agent as viewer. See below.                              |
| `sg agents items list <agentId>`                            | Items (tickets, jobs, work items) with `statusCounts`. Filter with `--status`; `--full` includes bodies. |
| `sg agents items create <agentId> --subject <s> --body <b>` | Opens an item by hand and starts a run. Use it to test an agent.                                         |

`sg agents tickets` is a deprecated alias of `sg agents items`. `create` returns the new or existing item under `item` (formerly `ticket`).

Field flags on `create` and `update`: `--name`, `--soul` or `--soul-file`, `--instructions` or `--instructions-file`, `--approval-mode ask|act`, `--destinations-file`, `--triggers-file`. `update` also takes `--enabled true|false` and `--standing-permissions-file`. Item flags: `--requester-name`, `--requester-email`, `--external-id`.

The CLI validates each file before it calls the API. A validation error exits with code 1 and prints `{ "success": false, "error": "--triggers-file: 0.timezone: ...", "details": { "code": "invalid_input" } }` on stderr. API errors print the server message and `details.status`.

## Share resources with an agent

`sg agents share <agentId> --connection <connectionId> | --playbook <playbookId> | --file <fileId> [--revoke]` shares one resource with the agent's principal user as viewer. `--revoke` removes that share. Give exactly one resource flag; otherwise the command exits with `details.code: "invalid_input"` before it calls the API. You need share access to the resource.

The output is `{ success, agent: { id, name }, resource: { kind, id }, shared, access }`. `resource.kind` is `credential` for a connection. `access` is the agent's access list after the change, the same list as in `sg agents get`.

## Set up an agent

1. `sg agents create --kind support|migration|integration|status|testing|scope|client|custom --name <name> --instructions-file <path>`. Keep `--approval-mode ask`.
2. `sg agents share <agentId> --connection <connectionId>` for each connection the agent reads or writes. Share playbooks and files the same way with `--playbook` and `--file`.
3. `sg agents update <agentId> --triggers-file <path>` to add schedule or webhook triggers.
4. `sg agents items create <agentId> --subject <s> --body <b>` to test a run, then read it in `sg agents items list <agentId>`.
5. After the user saw correct writes, add `--standing-permissions-file` with `sg agents update`.

## Settings

| Field                 | Meaning                                                                                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `soul`                | Who the agent is and how it speaks and acts, such as "You are Contoso's support consultant: calm, exact, no guesses." Sent to every run before the instructions. |
| `instructions`        | Standing instructions for every run: the client, their system version, conventions, what to never touch.                                                         |
| `approvalMode`        | `ask` (default): writes wait for approval. `act`: writes run without approval.                                                                                   |
| `standingPermissions` | Writes the agent may do without asking in `ask` mode. See below.                                                                                                 |
| `destinations`        | People who hear from the agent: `{ target: { kind: "user", userId }, purposes: [...] }`.                                                                         |
| `enabled`             | `false` stops new items and stops its triggers.                                                                                                                  |
| `triggers`            | Desired triggers, schedule or webhook. See below.                                                                                                                |

Purposes, each sent by Teams card or by email when the person has no Teams link:

- `approval`: an item run waits for approval or asks a question. Only editors of the agent receive it. A check for new requests that waits for an answer notifies once per outage of its trigger.
- `report`: an item run closed the item and left a next step for a person, such as forwarding the reply. An item the agent closed with nothing left sends nothing, except for `integration`, `status`, and `testing` agents: they send every final answer.
- `failure`: an item run failed again after one automatic retry, once per item until a run of it works. For triggers: a schedule after 2 failed checks in a row, a webhook after 1, once per outage, and once more when checks work again.
- `handoff`: the run hands the item to a person, or ends without saying how the item ends. The item stays in progress, and no report goes out for that run.

A new agent without destinations gets its creator for every purpose. Recommend `ask` until the user has seen the agent work on real items.

Example `--destinations-file`:

```json
[
  { "target": { "kind": "user", "userId": "<userId>" }, "purposes": ["approval", "failure"] },
  { "target": { "kind": "user", "userId": "<otherUserId>" }, "purposes": ["report", "handoff"] }
]
```

## Standing permissions

`--standing-permissions-file` holds the desired list of `{ summary, scope }`. Omit the flag to leave the list unchanged; a file with `[]` removes all.

- `{ type: "system_write", connectionId, operations }`: writes on one connection. `operations` lists the allowed operations, or `["*"]` for every write on that connection.

Share each connection with the agent first with `sg agents share`; a new agent starts without standing permissions, and `sg agents create` does not take them. Writes that need a preview, such as sending email, still ask. Add standing permissions only for writes the user saw the agent do correctly.

```json
[
  {
    "summary": "Update cases in Acumatica",
    "scope": { "type": "system_write", "connectionId": "<connectionId>", "operations": ["*"] }
  }
]
```

## Triggers

A trigger starts a check run of the agent. The check run reads the source its `prompt` names, decides which records are requests, and opens one item per request. Each request gets a stable `externalId` that names its source, such as `acumatica:CASE-001234` or `slack:C01ABC:1700000000.0001`: the same ID never opens a second item, and changed content sends the new text to the item's run. Every item then gets its own run.

`--triggers-file` holds the desired list, like grants on a role. Read `triggers` from `sg agents get`, change the list, and write it back with `sg agents update`:

- Omit `--triggers-file` to leave the triggers unchanged; a file with `[]` removes all.
- A trigger with `id` updates that trigger, one without `id` adds a trigger, and existing triggers not in the list are removed.
- A trigger cannot change its type. Remove it and add a new one.
- When the agent saves but its triggers fail, the error says `Saved agent <agentId>, but not its triggers: ...`. Fix the file and run `sg agents update` again.

Two types:

- `{ type: "schedule", prompt, cronExpression, timezone, enabled? }` runs a check on a cron schedule. Every check is a full agent run that costs compute even when nothing is new, so use hourly or slower, and a webhook trigger when the source can call a URL. Confirm the interval and the timezone with the user; do not assume UTC.
- `{ type: "webhook", prompt, enabled?, verification? }` gives the agent a URL. `sg agents create` and `sg agents update` return the `triggers` with the URL when the command had `--triggers-file`; `sg agents get` also shows it. Each request to the URL starts a check run with the request body as data and returns 202 at once. The URL answers Slack, Microsoft Graph, and Meta verification challenges. The URL contains its secret: give it only to the user who sets up the sending system, and remove and add the trigger to change it. With `verification: { type: "slack", signingSecret }`, the URL accepts only requests that Slack signed with that secret (`x-slack-signature`, at most 5 minutes old) and answers others with 401. Ask the user for the signing secret from the Slack app's Basic Information page. On update, omit `verification` to keep the saved secret and pass `null` to remove it; reads show only `verification: { type: "slack" }`.

Write the prompt as the check itself: the source, what counts as a request, what to skip, and how to build `externalId`. Leave the item fields to the check run: do not say how to write `subject` or `body`; the run writes a short subject of its own.

```json
[
  {
    "type": "schedule",
    "prompt": "Check the Contoso Acumatica cases changed in the last two hours and open an item for each open one.",
    "cronExpression": "0 * * * *",
    "timezone": "America/Chicago"
  },
  { "type": "webhook", "prompt": "Open an item for this Slack message if it asks for help." }
]
```

## Sources

- **Acumatica:** share the Acumatica connection with the agent. A schedule check reads the `Case` entity filtered on `LastModifiedDateTime`. With Acumatica push notifications, point them at a webhook trigger.
- **Slack:** share the Slack connection with the agent and add the Slack app's bot user to the channel. A schedule check reads `conversations.history`; with the Events API, use a webhook trigger. Replies in the thread need the `chat:write` scope.
- **Email:** share the mailbox connection with the agent. A schedule check reads new threads.
- **Zendesk, Freshdesk, Jira:** share the connection with the agent. A schedule check lists changed tickets. `externalId` is `zendesk:<id>`, `freshdesk:<id>`, or `jira:<key>`.

## Item runs

Each item run is its own session that acts as the agent. Its approvals reach the agent's approval recipients, and editors can open the session from the card or email link to answer there. In `ask` mode, an item run investigates with reads, then sends one proposal with the diagnosis, every write as an exact call, and for support and client agents the reply to the requester. Recipients approve all, some, or none of it from the card or email; each approved item covers only its exact call, and later items can use values from earlier responses. `sessionId` in `sg agents items list` names the run session.
