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

From the official Anthropic marketplace:

```
/plugin install superglue@claude-plugins-official
```

Or load from local install for development:

```bash
claude --plugin-dir $(npm root -g)/@superglue/cli
```

## Quick Start

```bash
sg init                        # guided setup
sg system list                 # verify connection
sg tool build --config '...'   # build a tool
sg tool run --draft <id>       # test it
sg tool save --draft <id>      # save it
```

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

### Other

- `sg init` — Interactive setup (API key, endpoint, output mode)
- `sg update` — Update CLI to latest version

## Documentation

- [CLI + Skills](https://docs.superglue.cloud/getting-started/cli-skills) — Skill installation and agent setup
- [Full CLI Reference](./skills/superglue/SKILL.md) — Complete command documentation
- [superglue Docs](https://docs.superglue.cloud) — Platform documentation
- [API Reference](https://docs.superglue.cloud/api-reference/) — REST API docs

## Related

- [superglue Web App](https://app.superglue.cloud) — Visual tool builder
- [@superglue/client](https://www.npmjs.com/package/@superglue/client) — TypeScript SDK
- [superglue-client](https://pypi.org/project/superglue-client/) — Python SDK

## License

MIT
