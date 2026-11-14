# Agents

## What an agent is

Every session is an agent at work. In a chat, the agent works with the user and acts as the user. A saved agent on the Agents page works on its own and starts its own sessions for tickets and checks. Each saved agent has its own principal user. Its runs act as that principal, so it can use only the connections, tools, playbooks, and files shared with it. It never uses the access of the person who set it up.

- `sg agents get <agentId>` returns `agent` (settings, `principalUserId`, `destinations`, `standingPermissions`), `triggers`, and `access` (the resources shared with the agent). Webhook trigger URLs show only to editors of the agent.
- `sg agents tickets list <agentId>` returns the tickets with status (`open`, `started`, `done`, `dismissed`), the run `sessionId`, and `waitingFor` (`input` for an approval, answer, or sign-in, `handoff` after a handoff, `failure` when the run failed or was stopped, otherwise null) and `waitingSummary`, what the person needs to act on.
- The creator owns the agent. Editors of an agent can change it, give it resources, open tickets, open and answer its ticket sessions, and cancel its runs. Making someone an editor gives them use of everything shared with the agent.
- Admins have no automatic access to agents, because an agent carries the access of its connections.

The only kind today is `support`: the agent takes tickets from clients and works on each one in its own run. A run that resolves its ticket marks it done; a run that hands it off or ends without saying keeps it in progress. A later update from the requester opens a closed ticket again.

## Commands

| Command                                                       | Result                                                                          |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `sg agents list`                                              | The agents you can view. `--full` includes instructions and the lists.          |
| `sg agents get <agentId>`                                     | The agent, its triggers, and the resources shared with it.                      |
| `sg agents create --kind support --name <name>`               | Creates an agent. You become its owner. It gets its own principal user.         |
| `sg agents update <agentId> ...`                              | Changes only the given fields. File flags replace the desired lists.            |
| `sg agents delete <agentId>`                                  | Deletes the agent and its principal user. Resources the agent owns move to you. |
| `sg agents share <agentId> --connection <id>`                 | Shares a connection, playbook, or file with the agent as viewer. See below.     |
| `sg agents tickets list <agentId>`                            | Tickets with `statusCounts`. Filter with `--status`; `--full` includes bodies.  |
| `sg agents tickets create <agentId> --subject <s> --body <b>` | Opens a ticket by hand and starts a run. Use it to test an agent.               |

Field flags on `create` and `update`: `--name`, `--instructions` or `--instructions-file`, `--approval-mode ask|act`, `--destinations-file`, `--triggers-file`. `update` also takes `--enabled true|false` and `--standing-permissions-file`. Ticket flags: `--requester-name`, `--requester-email`, `--external-id`.

The CLI validates each file before it calls the API. A validation error exits with code 1 and prints `{ "success": false, "error": "--triggers-file: 0.timezone: ...", "details": { "code": "invalid_input" } }` on stderr. API errors print the server message and `details.status`.

## Share resources with an agent

`sg agents share <agentId> --connection <connectionId> | --playbook <playbookId> | --file <fileId> [--revoke]` shares one resource with the agent's principal user as viewer. `--revoke` removes that share. Give exactly one resource flag; otherwise the command exits with `details.code: "invalid_input"` before it calls the API. You need share access to the resource.

The output is `{ success, agent: { id, name }, resource: { kind, id }, shared, access }`. `resource.kind` is `credential` for a connection. `access` is the agent's access list after the change, the same list as in `sg agents get`.

## Set up an agent

1. `sg agents create --kind support --name <name> --instructions-file <path>`. Keep `--approval-mode ask`.
2. `sg agents share <agentId> --connection <connectionId>` for each connection the agent reads or writes. Share playbooks and files the same way with `--playbook` and `--file`.
3. `sg agents update <agentId> --triggers-file <path>` to add schedule or webhook triggers.
4. `sg agents tickets create <agentId> --subject <s> --body <b>` to test a run, then read it in `sg agents tickets list <agentId>`.
5. After the user saw correct writes, add `--standing-permissions-file` with `sg agents update`.

## Settings

| Field                 | Meaning                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `instructions`        | Standing instructions for every run: the client, their system version, conventions, what to never touch. |
| `approvalMode`        | `ask` (default): writes wait for approval. `act`: writes run without approval.                           |
| `standingPermissions` | Writes the agent may do without asking in `ask` mode. See below.                                         |
| `destinations`        | People who hear from the agent: `{ target: { kind: "user", userId }, purposes: [...] }`.                 |
| `enabled`             | `false` stops new tickets and stops its triggers.                                                        |
| `triggers`            | Desired triggers, schedule or webhook. See below.                                                        |

Purposes, each sent by Teams card or by email when the person has no Teams link:

- `approval`: a ticket run waits for approval or asks a question. Only editors of the agent receive it. A check for new requests that waits for an answer notifies once per outage of its trigger.
- `report`: a ticket run closed the ticket and left a next step for a person, such as forwarding the reply. A ticket the agent closed with nothing left sends nothing.
- `failure`: a ticket run failed again after one automatic retry, once per ticket until a run of it works. For triggers: a schedule after 2 failed checks in a row, a webhook after 1, once per outage, and once more when checks work again.
- `handoff`: the run hands the ticket to a person, or ends without saying how the ticket ends. The ticket stays in progress, and no report goes out for that run.

A new agent without destinations gets its creator for every purpose. Recommend `ask` until the user has seen the agent work on real tickets.

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

A trigger starts a check run of the agent. The check run reads the source its `prompt` names, decides which items are requests, and opens one ticket per request. Each request gets a stable `externalId` that names its source, such as `acumatica:CASE-001234` or `slack:C01ABC:1700000000.0001`: the same ID never opens a second ticket, and changed content sends the new text to the ticket's run. Every ticket then gets its own run.

`--triggers-file` holds the desired list, like grants on a role. Read `triggers` from `sg agents get`, change the list, and write it back with `sg agents update`:

- Omit `--triggers-file` to leave the triggers unchanged; a file with `[]` removes all.
- A trigger with `id` updates that trigger, one without `id` adds a trigger, and existing triggers not in the list are removed.
- A trigger cannot change its type. Remove it and add a new one.
- When the agent saves but its triggers fail, the error says `Saved agent <agentId>, but not its triggers: ...`. Fix the file and run `sg agents update` again.

Two types:

- `{ type: "schedule", prompt, cronExpression, timezone, enabled? }` runs a check on a cron schedule. Every check is a full agent run that costs compute even when nothing is new, so use hourly or slower, and a webhook trigger when the source can call a URL. Confirm the interval and the timezone with the user; do not assume UTC.
- `{ type: "webhook", prompt, enabled?, verification? }` gives the agent a URL. `sg agents create` and `sg agents update` return the `triggers` with the URL when the command had `--triggers-file`; `sg agents get` also shows it. Each request to the URL starts a check run with the request body as data and returns 202 at once. The URL answers Slack, Microsoft Graph, and Meta verification challenges. The URL contains its secret: give it only to the user who sets up the sending system, and remove and add the trigger to change it. With `verification: { type: "slack", signingSecret }`, the URL accepts only requests that Slack signed with that secret (`x-slack-signature`, at most 5 minutes old) and answers others with 401. Ask the user for the signing secret from the Slack app's Basic Information page. On update, omit `verification` to keep the saved secret and pass `null` to remove it; reads show only `verification: { type: "slack" }`.

Write the prompt as the check itself: the source, what counts as a request, what to skip, and how to build `externalId`. Leave the ticket fields to the check run: do not say how to write `subject` or `body`; the run writes a short subject of its own.

```json
[
  {
    "type": "schedule",
    "prompt": "Check the Contoso Acumatica cases changed in the last two hours and open a ticket for each open one.",
    "cronExpression": "0 * * * *",
    "timezone": "America/Chicago"
  },
  { "type": "webhook", "prompt": "Open a ticket for this Slack message if it asks for help." }
]
```

## Sources

- **Acumatica:** share the Acumatica connection with the agent. A schedule check reads the `Case` entity filtered on `LastModifiedDateTime`. With Acumatica push notifications, point them at a webhook trigger.
- **Slack:** share the Slack connection with the agent and add the Slack app's bot user to the channel. A schedule check reads `conversations.history`; with the Events API, use a webhook trigger. Replies in the thread need the `chat:write` scope.
- **Email:** share the mailbox connection with the agent. A schedule check reads new threads.

## Ticket runs

Each ticket run is its own session that acts as the agent. Its approvals reach the agent's approval recipients, and editors can open the session from the card or email link to answer there. In `ask` mode, a ticket run investigates with reads, then sends one proposal with the diagnosis, every write as an exact call, and the reply to the requester. Recipients approve all, some, or none of it from the card or email; each approved item covers only its exact call, and later items can use values from earlier responses. `sessionId` in `sg agents tickets list` names the run session.
