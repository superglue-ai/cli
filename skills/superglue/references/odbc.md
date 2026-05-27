# ODBC

## Step Configuration

```typescript
{
  type: "request",
  systemId: "my_sybase_db",
  url: "odbc://<<my_sybase_db_username>>:<<my_sybase_db_password>>@<<my_sybase_db_host>>:<<my_sybase_db_port>>/<<my_sybase_db_database>>?DRIVER=<<my_sybase_db_driver>>",
  body: '{"query": "SELECT * FROM users WHERE id = ?", "params": [<<userId>>]}'
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
odbc://user:password@host:port/database?DRIVER=DriverName
odbc://user:password@host:port/database?DRIVER=FreeTDS&TDS_Version=5.0
```

The path contains the **database name**. The ODBC driver is specified via the `DRIVER` query parameter (defaults to `FreeTDS` if omitted). This format is consistent with other superglue database strategies (postgres, mssql) where the path is always the database.

**Supported drivers:**

| Driver    | Database                                   | Default Port |
| --------- | ------------------------------------------ | ------------ |
| `FreeTDS` | SAP ASE (Sybase), SQL Anywhere, SQL Server | 5000         |

Additional query parameters (beyond `DRIVER`) are passed through to the ODBC connection string as key=value pairs.

### Body Format

JSON string with `query` and optional `params` (or `values`):

```json
{
  "query": "SELECT * FROM users WHERE age > ? AND status = ?",
  "params": [25, "active"]
}
```

## Authentication

Credentials are embedded directly in the connection URL using `<<systemId_credentialKey>>` placeholders. Nothing is injected automatically.

```
odbc://<<my_db_username>>:<<my_db_password>>@<<my_db_host>>:<<my_db_port>>/<<my_db_database>>?DRIVER=<<my_db_driver>>
```

Credential variables are resolved at runtime before connecting.

## ODBC Runtime Details

### Schema Discovery

superglue does not auto-introspect ODBC database schemas. Before building tools, always query the schema manually with `sg system call` to discover tables and columns.

**SAP ASE (Sybase):**

```json
{
  "query": "SELECT o.name AS table_name, c.name AS column_name, t.name AS data_type, CASE WHEN c.status & 8 = 8 THEN 'YES' ELSE 'NO' END AS is_nullable FROM sysobjects o JOIN syscolumns c ON o.id = c.id JOIN systypes t ON c.usertype = t.usertype WHERE o.type = 'U' ORDER BY o.name, c.colid"
}
```

Always verify table and column names against the actual schema before building tools.

### Parameterized Queries

Always use parameterized queries with positional `?` placeholders — prevents SQL injection. Parameters are bound positionally from the `params` array.

For numeric or boolean parameters in query params arrays, use unquoted placeholders: `[<<numericParam>>]` not `["<<numericParam>>"]`. The quotes force string resolution.

```json
{ "query": "SELECT * FROM orders WHERE name = ? AND customer_id = ?", "params": ["<<customerName>>", <<customerId>>] }
```

With expressions:

```json
{
  "query": "INSERT INTO logs (message, level) VALUES (?, ?)",
  "params": ["<<(sourceData) => sourceData.message>>", "error"]
}
```

### Return Value

Returns an array of row objects with column names as keys.

- `SELECT`: array of matching rows
- `INSERT/UPDATE/DELETE`: empty array (SAP ASE does not support `RETURNING` — query the data separately if needed)

### Batch Operations

Use a data selector returning an array to execute a query per item:

```javascript
// dataSelector: (sourceData) => sourceData.newUsers
// body: {"query": "INSERT INTO users (name) VALUES (?)", "params": ["<<(sourceData) => sourceData.currentItem.name>>"]}
```

### Retry Behavior

Default retries from server config. On final failure, error includes a truncated query preview.

## SAP ASE (Sybase) Specifics

### Differences from SQL Server

SAP ASE uses Transact-SQL like SQL Server, but with key differences:

- **No `OUTPUT` clause** — use `SELECT @@identity` after INSERT to get the last inserted identity value
- **No `TOP` with `ORDER BY` guarantee** — use `SET ROWCOUNT n` before the query instead
- **`CONVERT` syntax differs** — `CONVERT(target_type, expression)` not `CONVERT(expression, style)`
- **String concatenation** — use `+` operator, not `CONCAT()` (unless ASE 16.0+)
- **Date functions** — use `GETDATE()` not `CURRENT_TIMESTAMP`, `DATEADD`/`DATEDIFF` syntax matches SQL Server

### TDS Protocol Version

FreeTDS defaults to TDS 5.0 for Sybase connections. If you encounter protocol errors, you can specify the version via query parameter:

```
odbc://user:pass@host:5000/mydb?DRIVER=FreeTDS&TDS_Version=5.0
```

| TDS Version | Use Case                           |
| ----------- | ---------------------------------- |
| `5.0`       | SAP ASE / Sybase, SAP SQL Anywhere |
| `7.0`       | SQL Server 7.0+                    |
| `7.4`       | SQL Server 2012+                   |

### SAP SQL Anywhere

SQL Anywhere (SA16/SA17) works with FreeTDS using TDS version 5.0. Always specify `TDS_Version=5.0` explicitly:

```
odbc://user:pass@host:2638/mydb?DRIVER=FreeTDS&TDS_Version=5.0
```

Key differences from SAP ASE:

- Default port is **2638** (not 5000)
- Uses `TOP n` instead of `SET ROWCOUNT n` for row limiting: `SELECT TOP 10 * FROM table`
- Does not support `LIMIT` syntax
- `DB_NAME()` returns the current database name
- `sa_db_info()` lists all running databases on the server
- Only databases explicitly loaded by the server process are available — if you get "database not found", the database name must match the logical name the server assigned at startup (either from `-n` flag or the `.db` filename without extension)

### Database-Specific Error Codes

ODBC often surfaces error codes from the underlying database or driver. Do not treat those codes as generic ODBC meanings. If the message identifies a database engine, use that vendor's SQLCODE documentation instead of inferring from connection-string shape.

For SQL Anywhere errors surfaced through ODBC:

| SQLCODE | Meaning                      | Implication                                                                                                                   |
| ------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `-103`  | Invalid user ID or password  | The database was reached far enough to reject authentication. Do not treat this as a missing database name.                   |
| `-83`   | Specified database not found | The database name/path could not be resolved. Check the database name, DBN/DBF settings, server name, and TDS/driver routing. |

For other ODBC-backed databases, look up the database/driver-specific error code before concluding what failed.

## Common Pitfalls

- Using `@param1`, `@param2` (MSSQL syntax) or `$1`, `$2` (PostgreSQL syntax) instead of positional `?` placeholders — ODBC uses `?` for all parameter binding
- Forgetting that SAP ASE has no `OUTPUT`/`RETURNING` clause — mutations return empty arrays; query the data separately
- Using `CONCAT()` on older ASE versions — use `+` for string concatenation instead
- Driver name mismatch — the `DRIVER` query parameter must exactly match the section name in `odbcinst.ini` (case-sensitive). Use `DRIVER=FreeTDS`, not `DRIVER=freetds` or `DRIVER=FREETDS`
- Accessing step result directly instead of via `.data` — database results follow the same envelope as all steps: `sourceData.stepId.data`

## Error Recovery

When an ODBC step fails and the cause is not obvious:

1. **Read the error message** — superglue includes a truncated query preview in the error. Check for syntax errors, missing columns, or type mismatches.
2. **Verify connection credentials** — use `sg system find` to confirm `storedCredentials` keys match the placeholders in your URL. Test connectivity with a simple `SELECT 1` via `sg system call`.
3. **Check database-side access** — connection refused or permission denied errors typically mean the database user lacks access. Verify with the user that the credentials have the required grants.
4. **Check driver availability** — if the error mentions "driver not found", the `DRIVER` query parameter does not match any registered driver in `/etc/odbcinst.ini`. Verify the driver name is correct and the driver is installed in the Docker image.
5. **Test the query directly** — use `sg system call` with a simplified version of the query to isolate whether the issue is the query itself, the parameters, or the connection.
6. **Check TDS version** — protocol errors may indicate a TDS version mismatch. Try adding `?TDS_Version=5.0` to the query parameters for SAP ASE connections.
