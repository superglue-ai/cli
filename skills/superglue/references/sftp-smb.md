# SFTP / FTP / SMB

FTP, SFTP, and SMB share an identical operation interface. Only the URL protocol and connection details differ.

## Step Configuration

```typescript
{
  type: "request",
  systemId: "my_sftp_server",
  url: "sftp://<<my_sftp_server_username>>:<<my_sftp_server_password>>@<<my_sftp_server_host>>:<<my_sftp_server_port>>/basePath",
  body: '{"operation": "get", "path": "data/report.csv"}'
}
```

Configure the connection URL based on which credentials are stored in the system — use `sg system find` to check `storedCredentials` and reference them accordingly.

`method`, `headers`, `queryParams`, and `pagination` are HTTP-only fields — omit them for file server steps.

### Fields

| Field      | Required | Notes                                                          |
| ---------- | -------- | -------------------------------------------------------------- |
| `url`      | yes      | Connection string with `<<credential>>` placeholders           |
| `body`     | yes      | JSON: single operation object or array for batch               |
| `systemId` | no       | Links system credentials for `<<systemId_credKey>>` resolution |

### URL Formats

```
ftp://user:password@host:port/basePath       (port 21)
ftps://user:password@host:port/basePath      (port 21, TLS)
sftp://user:password@host:port/basePath      (port 22)
smb://user:password@host/sharename/basePath  (port 445)
smb://domain\user:password@host/sharename/   (domain auth)
```

SMB requires a share name as the first path segment. Additional segments become a base path prepended to all operation paths.

### Body Format

JSON string — single operation or array of operations (batch, executed sequentially on a single connection):

```json
{ "operation": "get", "path": "data/report.csv" }
```

```json
[
  { "operation": "mkdir", "path": "backup" },
  { "operation": "get", "path": "data/report.csv" },
  { "operation": "put", "path": "backup/report.csv", "content": "file::report.raw" }
]
```

## Authentication

Credentials are embedded in the connection URL using `<<systemId_credentialKey>>` placeholders. Nothing is injected automatically.

```
sftp://<<my_server_username>>:<<my_server_password>>@host/path
```

**SFTP private key auth:** use `credentials.privateKey` and `credentials.passphrase` on the system instead of URL password placeholders. Store the private key as a credential on the system.

**SMB domain auth:** use `domain\user` format in the URL, or store `domain` as a system credential.

Only store connection credentials on the system: `host`, `port`, `username`, `password`, `privateKey`, `passphrase`, `domain` (SMB), `home_dir`. Paths and share names belong in the URL, not in credentials.

## File Server Runtime Details

### Path Handling

All operation paths are relative to the base path in the URL. Do not use absolute filesystem paths.

If the system URL is `sftp://user:pass@host/home/sftptest/uploads`:

- `report.csv` resolves to `/home/sftptest/uploads/report.csv`
- `subdir/data.csv` resolves to `/home/sftptest/uploads/subdir/data.csv`

Do not use `/home/sftptest/uploads/report.csv` — the base path is already set in the URL.

If the URL has no base path (e.g. `sftp://user:pass@host`), paths are used as-is from the server root.

SMB paths use forward slashes — the library handles Windows path conversion internally.

### Operations

| Operation | Required fields   | Returns                                                         |
| --------- | ----------------- | --------------------------------------------------------------- |
| `list`    | `path`            | Array of `{ name, path, size, type, modifyTime, ... }`          |
| `get`     | `path`            | Auto-parsed file content (CSV to objects, JSON to parsed, etc.) |
| `put`     | `path`, `content` | `{ success, message, size }`                                    |
| `delete`  | `path`            | `{ success, message }`                                          |
| `rename`  | `path`, `newPath` | `{ success, message }`                                          |
| `mkdir`   | `path`            | `{ success, message }`                                          |
| `rmdir`   | `path`            | `{ success, message }`                                          |
| `exists`  | `path`            | `{ exists: boolean, path }`                                     |
| `stat`    | `path`            | File metadata or `{ exists: false }`                            |

### `get` — File Handling

Downloaded files are added to the runtime file store. See `file-handling.md` for detection, parsing, aliasing rules, and the full `file::` reference syntax.

- `data` contains auto-parsed content (CSV to objects, JSON to parsed, PDF to structured, etc.)
- The step result exposes `stepFileKeys`
- Later steps reference downloaded files via `file::<stepId>.raw`, `file::<stepId>.base64`, or `file::<stepId>.extracted`
- Multi-file batch downloads use bracket notation: `file::<stepId>["report.csv"].raw`

### `put` — Content Handling

Use `file::<key>.raw` to preserve original bytes when uploading files from previous steps. See `file-handling.md` for all suffix options.

| Content type                     | Behavior                             |
| -------------------------------- | ------------------------------------ |
| `file::<key>.raw` (RawFileBytes) | Written as exact original bytes      |
| String                           | Written as-is                        |
| Buffer                           | Written directly                     |
| Object / Array                   | JSON-stringified with 2-space indent |

### Return Values

Single operation returns the result directly. Array of operations returns an array of results (one per operation, in order).

### Connection Details

**SFTP:** uses `ssh2-sftp-client`. Supports password and private key auth. Connection timeout configurable, default retries from server config.

**FTP/FTPS:** uses `basic-ftp`. FTPS uses TLS with `rejectUnauthorized: false`. Connection timeout configurable.

**SMB:** uses `@awo00/smb2`. Connection lifecycle: create client, authenticate (domain optional), connect tree (share), execute operations, disconnect/logoff/close. Entire operation wrapped in a timeout race. For private systems via Secure Gateway, the host is `tunnelId.tunnel` (e.g. `my_tunnel.tunnel`).

### Retry Behavior

Default retries from server config. On final failure, error includes the full operations list. Each retry creates a fresh connection.

## Common Pitfalls

- Using absolute filesystem paths instead of paths relative to the URL base path
- Forgetting that SMB requires a share name as the first URL path segment
- Using `file::<key>` without a suffix in `put` content. Use `file::<key>.raw` to preserve original bytes
- Missing the double-data access pattern for `get` results: `sourceData.stepId.data` gives you the parsed file content (through the step envelope)
- Trying to `put` to a path where intermediate directories don't exist — use `mkdir` first or batch the operations

## Error Recovery

When a file server step fails and the cause is not obvious:

1. **Read the error message** — superglue includes the operations list in the error. Check for typos in paths, missing fields, or unsupported operations.
2. **Verify connection credentials** — use `sg system find` to confirm `storedCredentials` keys match the placeholders in your URL. Test with a simple `list` operation on the base path via `sg system call`.
3. **Check path resolution** — if you get "file not found", verify the path is relative to the URL base path, not an absolute filesystem path. Use `list` on the parent directory to see what files exist.
4. **Check permissions** — permission denied errors mean the user account lacks read/write access to the target path. Verify with the user that the account has the required grants.
5. **Check protocol-specific issues:**
   - **SFTP**: if the error mentions authentication, verify whether the server expects password or private key auth. If using private key, ensure `privateKey` and `passphrase` are stored as system credentials.
   - **FTP/FTPS**: if the connection fails, try switching between `ftp://` and `ftps://` — some servers require TLS, others don't support it.
   - **SMB**: verify the share name is correct (first path segment). If using domain auth, ensure the domain is included in the URL or stored as a credential. Check that the SMB port (445) is accessible.
