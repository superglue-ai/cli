# MongoDB

## Step Configuration

```typescript
{
  type: "request",
  systemId: "my_mongo",
  url: "mongodb://<<my_mongo_username>>:<<my_mongo_password>>@<<my_mongo_host>>:<<my_mongo_port>>/<<my_mongo_database>>?authSource=admin",
  body: '{"collection": "users", "operation": "find", "filter": {"status": "active"}, "options": {"limit": 50, "sort": {"createdAt": -1}}}'
}
```

Configure the connection URL based on which credentials are stored in the system — use `sg system find` to check `storedCredentials` and reference them accordingly.

`method`, `headers`, `queryParams`, and `pagination` are HTTP-only fields — omit them for MongoDB steps.

### Fields

| Field      | Required | Notes                                                          |
| ---------- | -------- | -------------------------------------------------------------- |
| `url`      | yes      | Connection string with `<<credential>>` placeholders           |
| `body`     | yes      | JSON: single operation object or array of operations           |
| `systemId` | no       | Links system credentials for `<<systemId_credKey>>` resolution |

### URL Format

```
mongodb://user:password@host:port/database?authSource=admin
mongodb+srv://user:password@cluster.example.mongodb.net/database   (SRV seedlist, e.g. Atlas)
```

- `mongodb://` for a standard host:port connection.
- `mongodb+srv://` for DNS SRV seedlists (MongoDB Atlas). The driver resolves the seedlist and enables TLS automatically; do not add a port.
- The default database comes from the URL path; override per operation with a `database` field in the body.
- Common query params: `authSource` (auth database, usually `admin` for root users), `replicaSet`, `tls`, `retryWrites`.
- Special characters in the username or password are URL-encoded automatically before the driver parses the string.

### Body Format

JSON string with `operation` (required) and `collection` (required for all operations except `listCollections`). Bodies are parsed as MongoDB Extended JSON, so `{ "$oid": "..." }` becomes an `ObjectId` and `{ "$date": "..." }` becomes a `Date`:

```json
{
  "collection": "orders",
  "operation": "find",
  "filter": { "_id": { "$oid": "652c1f77bcf86cd799439011" } }
}
```

For several operations in one step, pass an array (executed in order, results returned as an array):

```json
[
  { "collection": "orders", "operation": "countDocuments", "filter": { "status": "paid" } },
  {
    "collection": "orders",
    "operation": "find",
    "filter": { "status": "paid" },
    "options": { "limit": 10 }
  }
]
```

### Supported Operations

| Operation                                                     | Required fields                                   | Returns                                        |
| ------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| `find`                                                        | `collection`                                      | array of documents                             |
| `findOne`                                                     | `collection`                                      | a document or `null`                           |
| `aggregate`                                                   | `collection`, `pipeline`                          | array of documents                             |
| `countDocuments`                                              | `collection`                                      | number                                         |
| `estimatedDocumentCount`                                      | `collection`                                      | number                                         |
| `distinct`                                                    | `collection`, `field`                             | array of values                                |
| `listCollections`                                             | —                                                 | array of collection info                       |
| `insertOne`                                                   | `collection`, `document`                          | `{ acknowledged, insertedId }`                 |
| `insertMany`                                                  | `collection`, `documents`                         | `{ acknowledged, insertedCount, insertedIds }` |
| `updateOne` / `updateMany`                                    | `collection`, `filter`, `update`                  | `{ matchedCount, modifiedCount, upsertedId }`  |
| `replaceOne`                                                  | `collection`, `filter`, `replacement`             | update result                                  |
| `deleteOne` / `deleteMany`                                    | `collection`, `filter`                            | `{ acknowledged, deletedCount }`               |
| `findOneAndUpdate` / `findOneAndReplace` / `findOneAndDelete` | `collection`, `filter` (+ `update`/`replacement`) | the affected document                          |
| `bulkWrite`                                                   | `collection`, `operations`                        | bulk write result                              |

`filter`, `pipeline`, `document`, `update`, `replacement`, and driver `options` (e.g. `limit`, `skip`, `sort`, `projection`, `upsert`) are passed straight through to the driver.

Dynamic values with variables:

```json
{
  "collection": "users",
  "operation": "find",
  "filter": { "orgId": "<<(sourceData) => sourceData.orgId>>" }
}
```

## Authentication

Credentials are embedded directly in the connection URL using `<<systemId_credentialKey>>` placeholders. Nothing is injected automatically. Root/admin users almost always need `?authSource=admin`.

```
mongodb://<<my_mongo_username>>:<<my_mongo_password>>@<<my_mongo_host>>:<<my_mongo_port>>/<<my_mongo_database>>?authSource=admin
```

## MongoDB Runtime Details

### Return Values

Documents are returned as Extended JSON (relaxed): an `ObjectId` becomes `{ "$oid": "..." }` and a `Date` becomes `{ "$date": "..." }`. Query those values back with the same form. A single operation returns its result directly; an array of operations returns an array of results in order.

### Connection Management

- Clients are reused per connection string within a run and closed after completion.
- TLS is automatic for `mongodb+srv://` and when the connection string sets `tls=true`.
- Connection timeout defaults to 30 seconds; operation/socket timeout follows the system/protocol timeout.

### Retry Behavior

Default retries come from server config. On final failure, the error includes the failing operation name.

## Common Pitfalls

- Omitting `?authSource=admin` when authenticating as a root user — auth fails with "Authentication failed".
- Adding a port to a `mongodb+srv://` URL — SRV connection strings must not include a port.
- Passing an `_id` as a plain string when the document stores an `ObjectId` — wrap it as `{ "$oid": "..." }` so it matches.
- Putting `limit`/`sort`/`projection` at the top level — they belong inside `options`.
- Accessing the step result directly instead of via `.data` — MongoDB results follow the same envelope as all steps: `sourceData.stepId.data`.

## Error Recovery

When a MongoDB step fails:

1. **Read the error message** — superglue includes the operation name in the error. Check for unknown operations, missing required fields (`filter`, `update`, `pipeline`), or malformed Extended JSON.
2. **Verify connection credentials** — use `sg system find` to confirm `storedCredentials` keys match the placeholders in your URL. Test with a `listCollections` operation via `sg system call`.
3. **Check auth source** — "Authentication failed" usually means a missing or wrong `authSource`. Root users authenticate against `admin`.
4. **Check connectivity** — connection refused or server-selection timeouts mean the host is unreachable, the SRV record can't resolve, or an IP allowlist (Atlas) is blocking you. `mongodb+srv://` requires outbound DNS.
5. **Check the operation shape** — read operations (`find`, `countDocuments`, `distinct`) never mutate; write operations require their specific fields. `aggregate` is read-only unless its pipeline contains a `$out` or `$merge` stage, which writes results back to a collection. Confirm `filter`/`update`/`pipeline` are objects/arrays, not strings.
