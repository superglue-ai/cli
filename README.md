# superglue CLI

[![npm](https://img.shields.io/npm/v/@superglue/cli?style=flat-square&logo=npm)](https://www.npmjs.com/package/@superglue/cli)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

Build, test, and manage superglue API integration tools from the command line.

## What is superglue?

- AI-powered tool builder that works with any API, database or file storage server
- Abstracts away authentication, documentation handling and data mapping between systems
- Self-heals tools: when steps fail due to upstream API changes, superglue can auto-repair failures

## Installation

### As npm package

```bash
npm install -g @superglue/cli
sg --help
```

### As Claude Code Plugin

```
/plugin install github:superglue-ai/cli
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
- `sg system call` — Make authenticated API calls
- `sg system oauth` — Authenticate via OAuth
- `sg system docs` — Search system documentation

### Runs

- `sg run list` — List execution runs
- `sg run get` — Get run details

## Documentation

- [Full CLI Reference](./skills/superglue/SKILL.md) — Complete command documentation
- [superglue Docs](https://docs.superglue.cloud) — Platform documentation
- [API Reference](https://docs.superglue.cloud/api-reference/) — REST API docs

## Related

- [superglue Web App](https://app.superglue.cloud) — Visual tool builder
- [@superglue/client](https://www.npmjs.com/package/@superglue/client) — TypeScript SDK
- [superglue-client](https://pypi.org/project/superglue-client/) — Python SDK

## License

MIT
