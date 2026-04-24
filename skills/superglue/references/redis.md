# Redis

## Step Configuration

```typescript
{
  type: "request",
  systemId: "my_redis",
  url: "redis://<<my_redis_username>>:<<my_redis_password>>@<<my_redis_host>>:<<my_redis_port>>/<<my_redis_database>>",
  body: '{"command": "GET", "args": ["<<keyName>>"]}'
}
```

Configure the connection URL based on which credentials are stored in the system — use `sg system find` to check `storedCredentials` and reference them accordingly.

`method`, `headers`, `queryParams`, and `pagination` are HTTP-only fields — omit them for Redis steps.

### Fields

| Field      | Required | Notes                                                          |
| ---------- | -------- | -------------------------------------------------------------- |
| `url`      | yes      | Connection string with `<<credential>>` placeholders           |
| `body`     | yes      | JSON: single command object or array for pipeline              |
| `systemId` | no       | Links system credentials for `<<systemId_credKey>>` resolution |

### URL Format

```
redis://user:password@host:port/database
rediss://user:password@host:port/database   (TLS)
```

- `redis://` for standard connections
- `rediss://` for TLS-encrypted connections (Redis Cloud, AWS ElastiCache with encryption)
- `/database` is the database number (defaults to 0; max depends on server config, commonly 16)

### Body Format

JSON string with `command` (required) and optional `args` array:

```json
{ "command": "GET", "args": ["mykey"] }
```

For pipelines, pass an array of command objects (executed in a single round-trip):

```json
[
  { "command": "GET", "args": ["user:1:name"] },
  { "command": "HGETALL", "args": ["user:1"] }
]
```

All args must be strings — numbers are auto-coerced.

Dynamic arguments with variables:

```json
{ "command": "GET", "args": ["<<(sourceData) => `user:${sourceData.userId}:profile`>>"] }
```

## Authentication

Credentials are embedded directly in the connection URL using `<<systemId_credentialKey>>` placeholders. Nothing is injected automatically.

```
redis://<<my_redis_username>>:<<my_redis_password>>@<<my_redis_host>>:<<my_redis_port>>/<<my_redis_database>>
```

## Redis Runtime Details

### Return Values

| Command type                 | Returns                                                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`, `HGET`                | string or null                                                                                                                         |
| `HGETALL`                    | flat array of alternating field-value pairs, e.g. `["name", "Alice", "email", "alice@example.com"]`. Empty array for non-existent keys |
| `LRANGE`, `SMEMBERS`, `KEYS` | array of strings                                                                                                                       |
| `SET`, `DEL`, `EXPIRE`       | `"OK"` or integer                                                                                                                      |
| `INCR`, `LLEN`, `SADD`       | integer                                                                                                                                |
| `MGET`, `HMGET`              | array (nulls for missing keys)                                                                                                         |
| `SCAN`, `HSCAN`              | array of `[cursor, results]`                                                                                                           |

### Pipeline Results

A single command returns a single result. An array of commands returns an array of results:

```json
[
  { "command": "GET", "result": "Alice" },
  { "command": "HGETALL", "result": ["name", "Alice", "email", "alice@example.com"] },
  { "command": "LRANGE", "result": ["task3", "task2", "task1"] }
]
```

If an individual command in a pipeline fails, that entry has `error` instead of `result`:

```json
{ "command": "WRONGCMD", "error": "ERR unknown command 'WRONGCMD'" }
```

### Batch Operations

Use a data selector returning an array to execute a command per item:

```javascript
// dataSelector: (sourceData) => sourceData.userIds
// body: {"command": "HGETALL", "args": ["<<(sourceData) => `user:${sourceData.currentItem}`>>"]}
```

Prefer array body pipelines over loop-based batch when commands are independent and don't depend on each other's results.

### Connection Management

- Fresh connection created per execution, closed after completion
- TLS auto-configured for `rediss://` URLs (`rejectUnauthorized: false`)
- 5-second connection timeout, 30-second command timeout
- Pipeline commands run on a single connection

### Retry Behavior

Default retries from server config. On final failure, error includes command and args.

## Common Pitfalls

- Using `KEYS` in production on large keyspaces — use `SCAN` with `MATCH` pattern instead
- Expecting `HGETALL` to return an object — it returns a flat alternating array `[field, value, field, value, ...]`
- Accessing step result directly instead of via `.data` — Redis results follow the same envelope as all steps: `sourceData.stepId.data`
- Using separate steps for independent commands that could be pipelined in a single array body

## Error Recovery

When a Redis step fails:

1. **Read the error message** — superglue includes the command and args in the error. Check for unknown commands, wrong argument counts, or type errors (e.g. running a list command on a string key).
2. **Verify connection credentials** — use `sg system find` to confirm `storedCredentials` keys match the placeholders in your URL. Test with a simple `PING` command via `sg system call`.
3. **Check connectivity and access** — connection refused errors typically mean the Redis server is unreachable or requires TLS (`rediss://`). AUTH errors mean the password is wrong or the user lacks access.
4. **Check key types** — Redis commands are type-specific. Running `GET` on a hash key or `HGETALL` on a string key returns a `WRONGTYPE` error. Use `TYPE` command via `sg system call` to check a key's type before building.
5. **Verify TLS requirements** — if the error mentions connection reset or handshake failure, try switching between `redis://` and `rediss://`.
