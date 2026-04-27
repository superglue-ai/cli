# GraphQL

GraphQL APIs use HTTP POST under the hood. This skill covers the GraphQL-specific conventions; the http skill covers the underlying HTTP runtime behavior.

## Step Configuration

```typescript
{
  type: "request",
  systemId: "my_graphql_api",
  url: "<<my_graphql_api_url>>/graphql",
  method: "POST",
  headers: {
    "Authorization": "Bearer <<my_graphql_api_access_token>>",
    "Content-Type": "application/json"
  },
  body: '{"query": "query GetUser($id: ID!) { user(id: $id) { name email } }", "variables": {"id": "<<userId>>"}}'
}
```

### Fields

| Field      | Required | Notes                                                  |
| ---------- | -------- | ------------------------------------------------------ |
| `url`      | yes      | GraphQL endpoint — typically `/graphql`                |
| `method`   | yes      | Always `POST`                                          |
| `headers`  | yes      | Must include `Content-Type: application/json` and auth |
| `body`     | yes      | JSON string with `query` and optional `variables`      |
| `systemId` | no       | Links system credentials and URL                       |

### Body Format

The body is always a JSON string with:

```json
{
  "query": "query { ... }",
  "variables": { ... }
}
```

For dynamic variables, use `<<>>` expressions:

```json
{
  "query": "query GetOrders($customerId: ID!, $limit: Int) { orders(customerId: $customerId, first: $limit) { id total } }",
  "variables": {
    "customerId": "<<customerId>>",
    "limit": "<<(sourceData) => sourceData.pageSize || 50>>"
  }
}
```

For complex variable objects, use a preceding transform step to build the variables, then reference with `<<(sourceData) => JSON.stringify(sourceData.prepStep.data)>>` as the entire body.

## Authentication

Same as HTTP — credentials are placed in headers using `<<systemId_credentialKey>>` syntax. Nothing is injected automatically.

## GraphQL Runtime Details

### Queries vs Mutations

- **Queries** (read-only): set `modify: false` on the step (this is the default)
- **Mutations** (write): set `modify: true`

Both use `method: "POST"` — do not rely on HTTP method to distinguish read vs write.

### Response Shape

GraphQL APIs return `{ "data": { ... }, "errors": [ ... ] }`. The superglue step result wraps this in the standard envelope:

```javascript
sourceData.stepId.data; // → { data: { user: { name: "Alice" } }, errors: [...] }
```

Access the actual data via `sourceData.stepId.data.data.user` (double `.data` — one for the envelope, one for the GraphQL response).

### Pagination

GraphQL APIs typically use cursor-based pagination (Relay-style). Use superglue's `cursorBased` pagination:

```typescript
{
  body: '{"query": "query($cursor: String) { users(first: 50, after: $cursor) { edges { node { id name } } pageInfo { endCursor hasNextPage } } }", "variables": {"cursor": "<<cursor>>"}}',
  pagination: {
    type: "cursorBased",
    pageSize: "50",
    cursorPath: "data.users.pageInfo.endCursor",
    stopCondition: "response.data.data.users.pageInfo.hasNextPage === false"
  }
}
```

Note the `cursorPath` and `stopCondition` must account for the GraphQL `data` wrapper.

### Schema Discovery

Superglue automatically introspects GraphQL schemas during documentation fetching. When a system URL contains "graphql", introspection is the first strategy tried — the full schema is fetched and stored as system documentation.

Use `sg system search-docs` to query the stored schema for types, fields, and arguments before building tools. This is more reliable than manual introspection and works even when the API has introspection disabled for external callers.

If the schema is not available via `sg system search-docs` (e.g. the system was created without a GraphQL URL, or introspection was blocked), test manually with `sg system call`:

```json
{ "query": "{ __typename }" }
```

If that succeeds, try a targeted introspection for the types you need:

```json
{ "query": "{ __type(name: \"User\") { fields { name type { name kind } } } }" }
```

## Common Pitfalls

- Forgetting `Content-Type: application/json` header — most GraphQL servers reject requests without it
- Accessing `sourceData.stepId.data.user` instead of `sourceData.stepId.data.data.user` — the GraphQL response has its own `data` wrapper inside the step envelope
- Building complex variable objects inline with multiple `<<>>` expressions — use a transform step to build the variables object
- Using `cursorPath` or `stopCondition` that doesn't account for the GraphQL `data` wrapper (e.g. `users.pageInfo` instead of `data.users.pageInfo`)
- Not setting `modify: true` on mutation steps

## Error Recovery

When a GraphQL step fails:

1. **Check GraphQL-level errors** — even 200 responses can contain `errors` in the response body. Check `sourceData.stepId.data.errors` for field-level or validation errors.
2. **Verify the endpoint works** — use `sg system call` with `{ "query": "{ __typename }" }` to confirm connectivity and auth before debugging the query itself.
3. **Check schema compatibility** — fields, types, and arguments change between API versions. Use `sg system search-docs` to check the auto-introspected schema first. If unavailable, use targeted `__type` queries or web search to verify the current schema.
4. **Verify variables match the query signature** — GraphQL type mismatches (e.g. passing a string where `ID!` is expected) cause validation errors. Check that variable types in the query match what you're passing.
5. **Check for auth scope issues** — some GraphQL APIs return partial data with `null` fields and errors when the token lacks required scopes for specific fields.
