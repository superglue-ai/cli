# File Server Steps (FTP / SFTP / SMB)

FTP, SFTP, and SMB share an identical operation interface. Only the URL protocol and connection details differ.

## URL Formats

```
ftp://user:password@host:port/basePath       (port 21)
ftps://user:password@host:port/basePath      (port 21, TLS)
sftp://user:password@host:port/basePath      (port 22)
smb://user:password@host/sharename/basePath  (port 445)
smb://domain\user:password@host/sharename/   (domain auth)
```

All support `<<variable>>` syntax in the URL.

SMB requires a share name as the first path segment. Additional segments become a base path prepended to all operation paths.

## Path Handling

**All operation paths are relative to the base path in the URL.** Do NOT use absolute filesystem paths.

If the system URL is `sftp://user:pass@host/home/sftptest/uploads`:

- `report.csv` → `/home/sftptest/uploads/report.csv`
- `subdir/data.csv` → `/home/sftptest/uploads/subdir/data.csv`

Do NOT use `/home/sftptest/uploads/report.csv` — the base path is already set in the URL.

If the URL has no base path (e.g., `sftp://user:pass@host`), operation paths are used as-is from the server root.

## Body Format

JSON string — single operation or array of operations (batch):

### Single

```json
{ "operation": "get", "path": "data/report.csv" }
```

### Batch (sequential, same connection)

```json
[
  { "operation": "mkdir", "path": "backup" },
  { "operation": "get", "path": "data/report.csv" },
  { "operation": "put", "path": "backup/report.csv", "content": "data here" }
]
```

## Supported Operations

| Operation | Required fields   | Returns                                                                 |
| --------- | ----------------- | ----------------------------------------------------------------------- |
| `list`    | `path`            | Array of `{ name, path, size, type, modifyTime, ... }`                  |
| `get`     | `path`            | Auto-parsed file content (CSV→objects, JSON→parsed, etc.) or raw string |
| `put`     | `path`, `content` | `{ success, message, size }`                                            |
| `delete`  | `path`            | `{ success, message }`                                                  |
| `rename`  | `path`, `newPath` | `{ success, message }`                                                  |
| `mkdir`   | `path`            | `{ success, message }`                                                  |
| `rmdir`   | `path`            | `{ success, message }`                                                  |
| `exists`  | `path`            | `{ exists: boolean, path }`                                             |
| `stat`    | `path`            | File metadata or `{ exists: false }`                                    |

### `get` — Auto-Parsing

Downloaded files are all parsed automatically:

- CSV, JSON, XML, Excel, PDF, etc. → parsed to JS objects
- Falls back to UTF-8 string
- SMB additionally detects binary files (returns `{ _binary: true, encoding: "base64", data: "..." }`)

### `put` — Content Handling

- String → written as-is
- Buffer → written directly
- Object/Array → `JSON.stringify` with 2-space indent

## Connection Details

### SFTP

Uses `ssh2-sftp-client`. Supports password + private key auth (`credentials.privateKey`, `credentials.passphrase`).

### FTP/FTPS

Uses `basic-ftp`. FTPS uses TLS with `rejectUnauthorized: false`.

### SMB

Uses `@awo00/smb2`. Connection lifecycle: create client → authenticate (domain optional) → connect tree (share) → execute → disconnect/logoff/close. Entire operation wrapped in timeout race.

All paths use forward slashes (`/`) — SMB library handles Windows conversion internally.

Credentials must be injected into the URL using placeholders:

```
smb://<<systemId_username>>:<<systemId_password>>@fileserver.example.com/ShareName
```

For private systems via Secure Gateway, the host is `tunnelId.tunnel` (e.g., `my_tunnel.tunnel`).

## Return Value

Single operation → result directly. Multiple operations → array of results.

## Common Patterns

### Download and process

```json
{ "operation": "get", "path": "incoming/<<(sourceData) => sourceData.currentItem.filename>>" }
```

### Upload results

```json
{
  "operation": "put",
  "path": "output/results.json",
  "content": "<<(sourceData) => JSON.stringify(sourceData.processData.data)>>"
}
```

### List then loop

Step 1 lists files, step 2 uses data selector to loop over them:

```javascript
// Step 1: list files
// body: {"operation": "list", "path": "incoming"}

// Step 2 dataSelector: (sourceData) => sourceData.listFiles.data.filter(f => f.type === "file")
// body: {"operation": "get", "path": "<<(sourceData) => sourceData.currentItem.path>>"}
```
