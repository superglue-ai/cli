# superglue CLI

[![npm](https://img.shields.io/npm/v/@superglue/cli?style=flat-square&logo=npm)](https://www.npmjs.com/package/@superglue/cli)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

Build, test, and manage superglue tools from the command line.

## Installation

### As npm package

```bash
npm install -g @superglue/cli
sg --help
```

### As AI Agent Skill

Install the superglue skill for any supported AI agent ([35+ agents supported](https://skills.sh)):

```bash
npx skills add superglue-ai/cli
```

Or target a specific agent:

```bash
npx skills add superglue-ai/cli -g -a claude-code
npx skills add superglue-ai/cli -g -a codex
npx skills add superglue-ai/cli -g -a cursor
```

### As Claude Code Plugin

Load from local install:

```bash
claude --plugin-dir $(npm root -g)/@superglue/cli
```

## Quick Start

```bash
sg login                       # browser setup
sg system list                 # verify connection
sg tool build --config '...'   # build a tool
sg tool run --draft <id>       # test it
sg tool save --draft <id>      # save it
sg schedule create --tool <toolId> --cron "0 9 * * *"
sg mcp create --name my-mcp --tool <toolId>  # expose saved tools through MCP
```

Pass `--timezone UTC` to `sg schedule create` when you want to set the schedule timezone explicitly.

The CLI needs authentication and the target superglue API endpoint. Use `sg login` for browser
OAuth setup. For headless/API-key auth, use `SUPERGLUE_API_KEY` /
`SUPERGLUE_API_ENDPOINT`, `--api-key` / `--endpoint`, or an existing `config.json`.
For self-hosted instances, use that instance's API endpoint and pass `--web-endpoint` to `sg login`
when the web app URL differs from the API URL. Add `--save-config` to persist those non-secret
endpoint settings in `config.json`.

## Commands

### Tools

- `sg tool build` — Build a tool from config
- `sg tool run` — Run a draft or saved tool
- `sg tool edit` — Edit via JSON Patch
- `sg tool save` — Save a draft
- `sg tool list` — List saved tools
- `sg tool find` — Search tools

### Systems

- `sg system create` — Create a system
- `sg system edit` — Edit system config
- `sg system list` — List systems
- `sg system find` — Search systems
- `sg system call` — Make authenticated system calls
- `sg system oauth` — Authenticate via OAuth
- `sg system search-docs` — Search system documentation

### Runs

- `sg run list` — List execution runs
- `sg run get` — Get run details

### Schedules

- `sg schedule list` — List saved tool schedules
- `sg schedule create` — Create a cron schedule for a saved tool
- `sg schedule edit` — Edit, enable, or disable a schedule

### MCP Servers

- `sg mcp list` — List named MCP servers
- `sg mcp find` — Search MCP servers
- `sg mcp create` — Create a named MCP server for selected tools
- `sg mcp edit` — Edit a named MCP server and its exposed tools

### Other

- `sg login` — Browser OAuth setup
- `sg logout` — Remove the stored OAuth session
- `sg whoami` — Show the authenticated user and organization
- `sg update` — Update CLI to latest version

## Documentation

- [CLI + Skills](https://superglue.ai/docs/getting-started/cli-skills/) — Skill installation and agent setup
- [Full CLI Reference](./skills/superglue/SKILL.md) — Complete command documentation
- [superglue Docs](https://superglue.ai/docs/) — Platform documentation
- [API Reference](https://superglue.ai/docs/api/) — REST API docs

## Related

- [superglue Web App](https://app.superglue.cloud) — Visual tool builder
- [@superglue/client](https://www.npmjs.com/package/@superglue/client) — TypeScript SDK
- [superglue-client](https://pypi.org/project/superglue-client/) — Python SDK

## License

MIT
