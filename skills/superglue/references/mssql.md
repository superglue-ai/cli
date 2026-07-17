# MSSQL

**This skill is for Microsoft SQL Server and Azure SQL only.** For SAP ASE (Sybase), use the `odbc` skill — SAP ASE requires the ODBC strategy with `odbc://` URLs, not `mssql://`.

## Step Configuration

```typescript
{
  type: "request",
  systemId: "my_azure_sql",
  url: "mssql://<<my_azure_sql_user>>:<<my_azure_sql_password>>@<<my_azure_sql_host>>:<<my_azure_sql_port>>/<<my_azure_sql_database>>",
  body: '{"query": "SELECT * FROM users WHERE id = @param1", "params": [<<userId>>]}'
}
```

Configure the connection URL based on the selected credential's secrets — use `sg system find` to inspect the available secret names and reference them accordingly.

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

**Named instances** (common for on-prem servers, e.g. ProLaw's `SERVER\PROLAW`) — use the `instanceName` query parameter. Backslash syntax (`SERVER\PROLAW`) in the host is rejected with an error; always translate it to the query parameter:

```
mssql://user:password@SERVER/database?instanceName=PROLAW
```

When an instance name is set, the port is ignored — the instance's port is resolved via the SQL Browser service (UDP 1434), which must be running and reachable. If SQL Browser is unavailable (or the server is reached through the Secure Gateway tunnel, which forwards a single TCP port and cannot carry UDP), have the DBA assign a static TCP port to the instance and connect with `host:port` without an instance name instead.

**Connection parameters** can be appended as query strings:

```
mssql://user:password@host:port/database?encrypt=true&trustServerCertificate=false
```

| Parameter                | Default | Notes                                               |
| ------------------------ | ------- | --------------------------------------------------- |
| `encrypt`                | `true`  | Required for Azure SQL                              |
| `trustServerCertificate` | `false` | Whether to trust the server certificate             |
| `database`               | —       | Can be in URL path or query parameter               |
| `instanceName`           | —       | SQL Server named instance (case-sensitive spelling) |
| `domain`                 | —       | Windows domain — switches to NTLM authentication    |

Unknown connection parameters cause an error rather than being silently ignored.

### Body Format

JSON string with `query` and optional `params` (or `values`):

```json
{
  "query": "SELECT * FROM users WHERE age > @param1 AND status = @param2",
  "params": [25, "active"]
}
```

## Authentication

### SQL Server Authentication (default)

Credentials are embedded directly in the connection URL using `<<systemId_credentialKey>>` placeholders. Nothing is injected automatically.

```
mssql://<<my_db_user>>:<<my_db_password>>@<<my_db_host>>:<<my_db_port>>/<<my_db_database>>
```

### Windows Authentication (NTLM)

For on-prem SQL Servers that only accept Windows domain logins (no SQL auth), add secrets with these names to the credential:

| Secret Name | Required | Notes                                                 |
| ----------- | -------- | ----------------------------------------------------- |
| `authType`  | yes      | `ntlm`                                                |
| `domain`    | yes      | Windows domain (e.g. `CORP`)                          |
| `user`      | yes      | Windows username (also accepts `username`, or in URL) |
| `password`  | yes      | Windows password (or in URL)                          |

```
URL:  mssql://<<sys_user>>:<<sys_password>>@<<sys_host>>:<<sys_port>>/<<sys_database>>
Secrets: { authType: "ntlm", domain, user, password, host, port, database }
```

Alternatively, pass the domain as a `?domain=CORP` query parameter on the URL — any URL with a `domain` set authenticates via NTLM. Kerberos-only environments are not supported; ask the DBA to permit NTLM or create a SQL login.

### Azure Active Directory Authentication

For Azure AD auth, add secrets with the following names to the credential alongside the standard connection fields:

**Entra ID User + Password** — authenticates as an Azure AD user. Requires an Azure app registration.

| Secret Name | Required | Notes                                                  |
| ----------- | -------- | ------------------------------------------------------ |
| `authType`  | yes      | `azure-active-directory-password`                      |
| `clientId`  | yes      | Application (client) ID from Azure app registration    |
| `tenantId`  | no       | Directory (tenant) ID                                  |
| `user`      | yes      | Azure AD username (also accepts `username`, or in URL) |
| `password`  | yes      | Azure AD password (or in URL)                          |

`user` and `password` can be stored as secrets or embedded in the URL — values resolved into the URL take precedence; stored secrets only fill gaps the URL omits.

```
URL:  mssql://<<sys_user>>:<<sys_password>>@myserver.database.windows.net:1433/mydb
Secrets: { authType, clientId, tenantId, user, password, host, port, database }
```

**Service Principal** — authenticates as an Azure AD application. No user/password needed in the URL.

| Secret Name    | Required | Notes                                             |
| -------------- | -------- | ------------------------------------------------- |
| `authType`     | yes      | `azure-active-directory-service-principal-secret` |
| `clientId`     | yes      | Application (client) ID                           |
| `clientSecret` | yes      | Client secret                                     |
| `tenantId`     | yes      | Directory (tenant) ID                             |

```
URL:  mssql://myserver.database.windows.net:1433/mydb
Secrets: { authType, clientId, clientSecret, tenantId, host, port, database }
```

The runtime authenticates entirely via the service principal credentials — no user or password is needed in the URL.

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

The shape depends on what the query produces:

- `SELECT` (single recordset): array of row objects with column names as keys
- `INSERT/UPDATE/DELETE` with `OUTPUT`: array of returned rows
- Mutations without `OUTPUT`: `{ "rowsAffected": [n] }` — one count per statement
- Stored procedures / batches returning multiple recordsets: array of recordset arrays (e.g. `[[...rows], [...rows]]`)

Check the shape before indexing: a multi-recordset result is an array of arrays, not a flat row list.

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

### On-Prem SQL Server (e.g. ProLaw, legacy ERP)

Defaults are tuned for Azure SQL; on-prem servers usually need adjustments:

- **Self-signed certificates** — on-prem servers rarely have CA-signed certs, so the default `trustServerCertificate=false` fails the TLS handshake. Add `?trustServerCertificate=true` (keeps encryption, skips CA validation).
- **Old SQL Server versions** — SQL Server 2008/2008 R2 without TLS 1.2 patches cannot complete a modern TLS handshake. Use `?encrypt=false` as a last resort, preferably only over the Secure Gateway tunnel.
- **Named instances** — use the `?instanceName=` query parameter (see URL Format above); remember SQL Browser (UDP 1434) is required for instance resolution and does not work through the Secure Gateway tunnel.
- **Firewalled servers** — on-prem databases are typically not internet-reachable; configure the system with a Secure Gateway tunnel.

### Retry Behavior

Default retries from server config. On final failure, error includes query text and params.

## Common Pitfalls

- Using `$1`, `$2` (PostgreSQL syntax) instead of `@param1`, `@param2` — MSSQL uses named `@param` parameters
- Forgetting `OUTPUT INSERTED.*` on INSERT/UPDATE/DELETE when you need the row data — without it the step returns `{ "rowsAffected": [n] }`, not rows
- Treating a multi-recordset stored procedure result as a flat row array — it is an array of recordset arrays
- Accessing step result directly instead of via `.data` — database results follow the same envelope as all steps: `sourceData.stepId.data`
- Not URL-encoding `@` in Azure SQL usernames — `myuser@myserver` must be `myuser%40myserver` in the connection URL
- Using a named instance through the Secure Gateway tunnel — instance resolution needs UDP 1434, which the tunnel does not forward; use a static TCP port instead
- Forgetting `?trustServerCertificate=true` for on-prem servers with self-signed certificates

## Error Recovery

When an MSSQL step fails and the cause is not obvious:

1. **Read the error message** — superglue includes the query text and params in the error. Check for syntax errors, missing columns, or type mismatches.
2. **Verify connection secrets** — use `sg system find` to confirm the stored secret names match the placeholders in your URL. Test connectivity with a simple `SELECT 1` via `sg system call`.
3. **Check database-side access** — connection refused or permission denied errors typically mean the database user lacks access. Verify with the user that the credentials have the required grants.
4. **Check Azure-specific issues** — if connecting to Azure SQL:
   - Confirm the client IP is allowed in the Azure SQL firewall rules
   - Verify the username includes the `@servername` suffix if required, properly encoded as `%40`
   - Confirm `encrypt=true` is set (required for Azure SQL)
5. **Check on-prem connection issues** — if connecting to an on-prem server:
   - TLS handshake errors (`self signed certificate`, `unable to verify`) → add `?trustServerCertificate=true`; for unpatched SQL Server 2008-era hosts, `?encrypt=false`
   - `Failed to connect ... in 15000ms` with a named instance → SQL Browser (UDP 1434) is unreachable; use a static TCP port instead
   - `Login failed` with Windows-auth-only servers → set `authType: "ntlm"` and `domain` in credentials, or ask the DBA for a SQL login
6. **Verify parameter types** — MSSQL infers types from the values passed. Passing a string where a number is expected may cause implicit conversion errors. Ensure `params` values match expected column types.
