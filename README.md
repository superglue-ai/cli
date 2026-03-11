# superglue CLI

Build, test, and manage superglue API integration tools from the command line.

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

## Documentation

See the [SKILL.md](./skills/superglue/SKILL.md) for complete CLI reference.

## License

MIT
