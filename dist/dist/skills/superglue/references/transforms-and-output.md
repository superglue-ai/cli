# Transforms & Output Shaping

Covers transform steps, output transforms, and response filters.

## Three Transformation Points

| Point                            | When it runs             | Purpose                              |
| -------------------------------- | ------------------------ | ------------------------------------ |
| `dataSelector`                   | Before step executes     | Controls input + single vs loop mode |
| Transform step (`transformCode`) | As the step itself       | Reshape data between request steps   |
| `outputTransform`                | After all steps complete | Shape final tool output              |

## Transform Steps

Use when you need intermediate data reshaping that can't wait until outputTransform (because a subsequent request step needs the data).

```typescript
{
  id: "formatForInsert",
  config: {
    type: "transform",
    transformCode: "(sourceData) => sourceData.getCustomers.data.map(c => ({ id: c.id, name: c.fullName }))"
  }
}
```

Transform steps do NOT have: systemId, url, method, headers, body, queryParams, or pagination.

Results are wrapped in the **same envelope** as request steps:

```javascript
sourceData.formatForInsert = { currentItem: <dataSelector output>, data: <transformCode result>, success: true }
```

If the step has a dataSelector returning an array, the transform runs once per item.

### When to Use

- Data needed by a subsequent request step (can't defer to outputTransform)
- Aggregating/combining results from multiple previous steps
- Complex filtering or restructuring between API calls
- Preparing data in a specific format for the next step

### When NOT to Use

- Simple input selection → use `dataSelector` instead
- Final output shaping → use `outputTransform` instead
- Simple filtering within a single step → use `dataSelector` returning a filtered array
- As the final step before the outputTransform → merge into outputTransform code

## Output Transform

Final transformation shaping the tool's output. Runs after all steps complete.

Access patterns depend on how the step was executed:

- **Object-selector step**: `sourceData.stepId.data` — single envelope
- **Array-selector (loop) step**: `sourceData.stepId.map(i => i.data)` — array of envelopes

```javascript
// Object-selector step — single result
sourceData.getUsers.data; // the API response
sourceData.getUsers.data.results; // nested field

// Array-selector (loop) step — array of results
sourceData.fetchDetails.map((i) => i.data); // all responses
sourceData.fetchDetails.flatMap((i) => i.data.items); // nested arrays
sourceData.fetchDetails.filter((i) => i.success).map((i) => i.data); // only successes
```

Payload fields are at root level — **NEVER** use `sourceData.payload.*`.

### Requirements

- Function signature: `(sourceData) => { ... }`
- **Must have a return statement**
- Pure synchronous — no async/await, no side effects
- Handle missing data with `?.` and defaults
- Validate arrays with `Array.isArray()` before array methods
- Throw when expected required data is missing (enables self-healing)
- NEVER include newlines or tabs in the code string

## JS Code Constraints (all transform points)

Runs in `isolated-vm` sandbox:

- 4096 MB memory limit, 10s timeout (transforms/selectors), 3s timeout (pagination stops)
- Synchronous only — no async/await, no Promises, no setTimeout
- No side effects — no network, filesystem, or console access
- No external dependencies — only standard JS built-ins (Array, Object, String, Math, Date, JSON, etc.)
- JSON-serializable I/O only
- Must return a value (undefined returns null)
