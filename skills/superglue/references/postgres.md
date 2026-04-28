# PostgreSQL

## Step Configuration

```typescript
{
  type: "request",
  systemId: "my_postgres_db",
  url: "postgres://<<my_postgres_db_user>>:<<my_postgres_db_password>>@<<my_postgres_db_host>>:<<my_postgres_db_port>>/<<my_postgres_db_database>>",
  body: '{"query": "SELECT * FROM users WHERE id = $1", "params": [<<userId>>]}'
}
```

Configure the connection URL based on which credentials are stored in the system — use `sg system find` to check `storedCredentials` and reference them accordingly.

`method`, `headers`, `queryParams`, and `pagination` are HTTP-only fields — omit them for database steps.

### Fields

| Field      | Required | Notes                                                          |
| ---------- | -------- | -------------------------------------------------------------- |
| `url`      | yes      | Connection string with `<<credential>>` placeholders           |
| `body`     | yes      | JSON string with `query` and optional `params`                 |
| `systemId` | no       | Links system credentials for `<<systemId_credKey>>` resolution |

### URL Format

```
postgres://user:password@host:port/database
postgresql://user:password@host:port/database
```

Both `postgres://` and `postgresql://` are supported. Trailing slashes and extra slashes before query strings are cleaned automatically.

### Body Format

JSON string with `query` and optional `params` (or `values`):

```json
{ "query": "SELECT * FROM users WHERE age > $1 AND status = $2", "params": [25, "active"] }
```

## Authentication

Credentials are embedded directly in the connection URL using `<<systemId_credentialKey>>` placeholders. Nothing is injected automatically.

```
postgres://<<my_db_user>>:<<my_db_password>>@<<my_db_host>>:<<my_db_port>>/<<my_db_database>>
```

Credential variables are resolved at runtime before connecting.

## PostgreSQL Runtime Details

### Schema Discovery

superglue does not auto-introspect Postgres schemas. Before building tools, always query the schema manually with `sg system call` to discover tables and columns:

```json
{
  "query": "SELECT table_name, column_name, data_type, is_nullable FROM information_schema.columns WHERE table_schema = 'public' ORDER BY table_name, ordinal_position"
}
```

Always verify table and column names against the actual schema before building tools.

### Parameterized Queries

Always use parameterized queries with `$1`, `$2`, etc. — prevents SQL injection.

```json
{ "query": "SELECT * FROM orders WHERE customer_id = $1", "params": ["<<customerId>>"] }
```

With expressions:

```json
{
  "query": "INSERT INTO logs (message, level) VALUES ($1, $2)",
  "params": ["<<(sourceData) => sourceData.message>>", "error"]
}
```

With RETURNING:

```json
{
  "query": "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
  "params": [
    "<<(sourceData) => sourceData.currentItem.name>>",
    "<<(sourceData) => sourceData.currentItem.email>>"
  ]
}
```

### Return Value

Returns `result.rows` — array of row objects with column names as keys.

- `SELECT`: array of matching rows
- `INSERT/UPDATE/DELETE` with `RETURNING`: array of returned rows
- Mutations without `RETURNING`: empty array

### Batch Operations

Use a data selector returning an array to execute a query per item:

```javascript
// dataSelector: (sourceData) => sourceData.newUsers
// body: {"query": "INSERT INTO users (name) VALUES ($1)", "params": ["<<(sourceData) => sourceData.currentItem.name>>"]}
```

### Connection Pooling

- Pools cached by connection string, max 10 clients, 30s connection timeout
- Idle pools cleaned up automatically

### SSL / TLS

SSL is auto-configured based on the connection URL — you do not need to set it manually in most cases.

**Default behavior (no `sslmode` in URL):**

- `localhost` / `127.0.0.1` → SSL disabled
- All other hosts → superglue probes the server to detect SSL support and enables it if the server accepts SSL handshakes. If the probe fails or times out, SSL is enabled as a safe default.

**Explicit `sslmode` in URL** (appended as `?sslmode=...`):

- `sslmode=disable` → SSL off
- `sslmode=require` → SSL on, enforced
- `sslmode=verify-ca` / `sslmode=verify-full` → SSL on, enforced; AWS RDS CA bundle loaded if present on disk
- Any other sslmode value → SSL on, not enforced

Server certificate chain validation is not performed by default; `verify-ca` / `verify-full` only flip the `enforce` flag and opportunistically load the RDS CA bundle. If strict chain validation matters for your deployment, terminate TLS at a trusted proxy.

### Retry Behavior

Default retries from server config. On final failure, error includes query text and params.

## Common Pitfalls

- Using string interpolation instead of parameterized queries — always use `$1`, `$2` with `params` array
- Forgetting `RETURNING *` on INSERT/UPDATE/DELETE when you need the result — without it the step returns an empty array
- Accessing step result directly instead of via `.data` — database results follow the same envelope as all steps: `sourceData.stepId.data`

## Error Recovery

When a PostgreSQL step fails and the cause is not obvious:

1. **Read the error message** — superglue includes the query text and params in the error. Check for syntax errors, missing columns, or type mismatches.
2. **Verify connection credentials** — use `sg system find` to confirm `storedCredentials` keys match the placeholders in your URL. Test connectivity with a simple `SELECT 1` via `sg system call`.
3. **Check database-side access** — connection refused or permission denied errors typically mean the database user lacks access to the database, schema, or table. Verify with the user that the credentials have the required grants.
4. **Test the query directly** — use `sg system call` with a simplified version of the query to isolate whether the issue is the query itself, the parameters, or the connection.
5. **Check for SSL/TLS issues** — if the error mentions SSL or handshake failure, check the SSL / TLS section above. For non-localhost servers that don't support SSL, add `?sslmode=disable` to the URL. For servers that require SSL, add `?sslmode=require`.
