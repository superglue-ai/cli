# MSSQL

## Step Configuration

```typescript
{
  type: "request",
  systemId: "my_azure_sql",
  url: "mssql://<<my_azure_sql_user>>:<<my_azure_sql_password>>@<<my_azure_sql_host>>:<<my_azure_sql_port>>/<<my_azure_sql_database>>",
  body: '{"query": "SELECT * FROM users WHERE id = @param1", "params": [<<userId>>]}'
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
mssql://user:password@host:port/database
sqlserver://user:password@host:port/database
```

Both `mssql://` and `sqlserver://` are supported.

**Azure SQL Database** — use the fully qualified server name:

```
mssql://myuser:mypassword@myserver.database.windows.net:1433/mydatabase
```

Azure SQL usernames often include `@servername` suffix (e.g., `myuser@myserver`). Encode the `@` as `%40` in the URL:

```
mssql://myuser%40myserver:mypassword@myserver.database.windows.net:1433/mydatabase
```

**Connection parameters** can be appended as query strings:

```
mssql://user:password@host:port/database?encrypt=true&trustServerCertificate=false
```

| Parameter                | Default | Notes                                   |
| ------------------------ | ------- | --------------------------------------- |
| `encrypt`                | `true`  | Required for Azure SQL                  |
| `trustServerCertificate` | `false` | Whether to trust the server certificate |
| `database`               | —       | Can be in URL path or query parameter   |

### Body Format

JSON string with `query` and optional `params` (or `values`):

```json
{
  "query": "SELECT * FROM users WHERE age > @param1 AND status = @param2",
  "params": [25, "active"]
}
```

## Authentication

Credentials are embedded directly in the connection URL using `<<systemId_credentialKey>>` placeholders. Nothing is injected automatically.

```
mssql://<<my_db_user>>:<<my_db_password>>@<<my_db_host>>:<<my_db_port>>/<<my_db_database>>
```

## MSSQL Runtime Details

### Schema Discovery

superglue does not auto-introspect MSSQL schemas. Before building tools, always query the schema manually with `sg system call` to discover tables and columns:

```json
{
  "query": "SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo' ORDER BY TABLE_NAME, ORDINAL_POSITION"
}
```

For Azure SQL or databases with non-default schemas, adjust the `TABLE_SCHEMA` filter or remove it to see all schemas.
Always verify table and column names against the actual schema before building tools.

### Parameterized Queries

Always use parameterized queries with `@param1`, `@param2`, etc. This prevents SQL injection. The params array maps positionally: `params[0]` maps to `@param1`, `params[1]` maps to `@param2`, etc.

```json
{ "query": "SELECT * FROM orders WHERE customer_id = @param1", "params": ["<<customerId>>"] }
```

With expressions:

```json
{
  "query": "INSERT INTO logs (message, level) VALUES (@param1, @param2)",
  "params": ["<<(sourceData) => sourceData.message>>", "error"]
}
```

With OUTPUT (MSSQL equivalent of RETURNING):

```json
{
  "query": "INSERT INTO users (name, email) OUTPUT INSERTED.* VALUES (@param1, @param2)",
  "params": [
    "<<(sourceData) => sourceData.currentItem.name>>",
    "<<(sourceData) => sourceData.currentItem.email>>"
  ]
}
```

### Return Value

Returns the recordset — array of row objects with column names as keys.

- `SELECT`: array of matching rows
- `INSERT/UPDATE/DELETE` with `OUTPUT`: array of returned rows
- Mutations without `OUTPUT`: empty array

### Batch Operations

Use a data selector returning an array to execute a query per item:

```javascript
// dataSelector: (sourceData) => sourceData.newUsers
// body: {"query": "INSERT INTO users (name) VALUES (@param1)", "params": ["<<(sourceData) => sourceData.currentItem.name>>"]}
```

### Connection Pooling

- Pools cached by connection string, max 10 clients per pool
- 30s connection timeout, configurable request timeout
- Idle pools cleaned up automatically
- SSL/TLS encryption enabled by default for Azure SQL

### Retry Behavior

Default retries from server config. On final failure, error includes query text and params.

## Common Pitfalls

- Using `$1`, `$2` (PostgreSQL syntax) instead of `@param1`, `@param2` — MSSQL uses named `@param` parameters
- Forgetting `OUTPUT INSERTED.*` on INSERT/UPDATE/DELETE when you need the result — without it the step returns an empty array
- Accessing step result directly instead of via `.data` — database results follow the same envelope as all steps: `sourceData.stepId.data`
- Not URL-encoding `@` in Azure SQL usernames — `myuser@myserver` must be `myuser%40myserver` in the connection URL

## Error Recovery

When an MSSQL step fails and the cause is not obvious:

1. **Read the error message** — superglue includes the query text and params in the error. Check for syntax errors, missing columns, or type mismatches.
2. **Verify connection credentials** — use `sg system find` to confirm `storedCredentials` keys match the placeholders in your URL. Test connectivity with a simple `SELECT 1` via `sg system call`.
3. **Check database-side access** — connection refused or permission denied errors typically mean the database user lacks access. Verify with the user that the credentials have the required grants.
4. **Check Azure-specific issues** — if connecting to Azure SQL:
   - Confirm the client IP is allowed in the Azure SQL firewall rules
   - Verify the username includes the `@servername` suffix if required, properly encoded as `%40`
   - Confirm `encrypt=true` is set (required for Azure SQL)
5. **Verify parameter types** — MSSQL infers types from the values passed. Passing a string where a number is expected may cause implicit conversion errors. Ensure `params` values match expected column types.
