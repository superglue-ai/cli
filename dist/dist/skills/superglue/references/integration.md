# Integrating superglue into Your Codebase

After building and saving tools with the CLI, integrate them into your application.

## Quick Reference: REST API (curl)

For any language, use the REST API directly:

```bash
# Set your API key and endpoint
export SUPERGLUE_API_KEY="your-api-key"
export SUPERGLUE_API_ENDPOINT="https://api.superglue.cloud"

# Run a tool (sync - waits for completion)
curl -X POST "$SUPERGLUE_API_ENDPOINT/v1/tools/my-tool-id/run" \
  -H "Authorization: Bearer $SUPERGLUE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"inputs": {"userId": "123"}}'

# Run a tool (async - returns immediately)
curl -X POST "$SUPERGLUE_API_ENDPOINT/v1/tools/my-tool-id/run" \
  -H "Authorization: Bearer $SUPERGLUE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"inputs": {"userId": "123"}, "options": {"async": true}}'

# Get run status/result
curl "$SUPERGLUE_API_ENDPOINT/v1/runs/{runId}" \
  -H "Authorization: Bearer $SUPERGLUE_API_KEY"

# List tools
curl "$SUPERGLUE_API_ENDPOINT/v1/tools?page=1&limit=50" \
  -H "Authorization: Bearer $SUPERGLUE_API_KEY"

# Get tool details
curl "$SUPERGLUE_API_ENDPOINT/v1/tools/my-tool-id" \
  -H "Authorization: Bearer $SUPERGLUE_API_KEY"

# Cancel a running tool
curl -X POST "$SUPERGLUE_API_ENDPOINT/v1/runs/{runId}/cancel" \
  -H "Authorization: Bearer $SUPERGLUE_API_KEY"
```

### Response Format

**Sync execution (200 OK):**

```json
{
  "runId": "7f3e9c1a-2b4d-4e8f-9a3b-1c5d7e9f2a4b",
  "toolId": "my-tool-id",
  "status": "success",
  "data": { "result": "..." },
  "stepResults": [{ "stepId": "step-1", "success": true, "data": {} }],
  "metadata": {
    "startedAt": "2024-01-15T10:00:00Z",
    "completedAt": "2024-01-15T10:00:05Z",
    "durationMs": 5234
  }
}
```

**Async execution (202 Accepted):**

```json
{
  "runId": "7f3e9c1a-2b4d-4e8f-9a3b-1c5d7e9f2a4b",
  "toolId": "my-tool-id",
  "status": "running"
}
```

---

## SDK Installation

```bash
# TypeScript/JavaScript
npm install @superglue/client

# Python
pip install superglue-client
```

Both SDKs are auto-generated from the OpenAPI spec (JS via orval, Python via openapi-python-client).

## TypeScript/JavaScript Usage

The JS SDK exports: `configure`, `listTools`, `getTool`, `runTool`, `getRun`, `cancelRun`, `triggerWebhook`, `listRuns`.

```typescript
import { configure, runTool, getRun, listTools, getTool } from "@superglue/client";

configure({
  apiKey: process.env.SUPERGLUE_API_KEY!,
  baseUrl: "https://api.superglue.cloud/v1",
});
```

### Run a Tool (Sync)

```typescript
const response = await runTool("my-tool-id", {
  inputs: { userId: "123", date: "2024-01-15" },
});

if (response.status === 200) {
  const run = response.data;
  console.log(run.status); // "success" | "failed"
  console.log(run.data); // tool output
} else {
  console.error("Error:", response.data);
}
```

The response is `{ data: Run, status: number, headers: Headers }`. The `Run` object has: `runId`, `toolId`, `status`, `data`, `error`, `stepResults`, `metadata`.

### Async Execution (Fire-and-Forget)

```typescript
const response = await runTool("my-tool-id", {
  inputs: { userId: "123" },
  options: { async: true },
});

if (response.status === 202) {
  const run = response.data;
  console.log(`Run started: ${run.runId}`);

  let latest = run;
  while (latest.status === "running") {
    await new Promise((r) => setTimeout(r, 1000));
    const poll = await getRun(latest.runId);
    latest = poll.data;
  }
}
```

### List and Discover Tools

```typescript
const { data: tools } = await listTools({ page: 1, limit: 50 });
console.log(tools.data);

const { data: tool } = await getTool("my-tool-id");
console.log(tool.inputSchema);
```

## Python Usage

The Python SDK uses `AuthenticatedClient` with httpx. Functions are in `superglue_client.api.tools` and `superglue_client.api.runs`.

```python
import os
from superglue_client import AuthenticatedClient
from superglue_client.api.tools import run_tool, list_tools, get_tool
from superglue_client.api.runs import get_run
from superglue_client.models.run_request import RunRequest
from superglue_client.models.run_request_inputs import RunRequestInputs

client = AuthenticatedClient(
    base_url="https://api.superglue.cloud/v1",
    token=os.environ["SUPERGLUE_API_KEY"],
)
```

### Run a Tool (Sync)

```python
with client as c:
    result = run_tool.sync(
        "my-tool-id",
        client=c,
        body=RunRequest(
            inputs=RunRequestInputs.from_dict({"userId": "123"}),
        ),
    )

    if hasattr(result, "status") and result.status == "success":
        print(result.data)
    elif hasattr(result, "error"):
        print(result.error)
```

`sync()` returns `Run | Error | None`. Use `sync_detailed()` for the full `Response` wrapper with status code and headers.

### Async Python

```python
async with client as c:
    result = await run_tool.asyncio(
        "my-tool-id",
        client=c,
        body=RunRequest(
            inputs=RunRequestInputs.from_dict({"userId": "123"}),
        ),
    )
```

## Webhook Triggers

Trigger tools via HTTP POST without SDK. Webhooks execute asynchronously.

```bash
curl -X POST "https://api.superglue.cloud/v1/hooks/{toolId}?token={apiKey}" \
  -H "Content-Type: application/json" \
  -d '{"userId": "123"}'
```

### Webhook URL Pattern

```
POST {endpoint}/v1/hooks/{toolId}?token={apiKey}
```

- `endpoint` — Your superglue API endpoint
- `toolId` — The saved tool ID (from `sg tool save`)
- `apiKey` — Your superglue API key (passed as `token` query param)

### Webhook Response

Webhooks return `202 Accepted` immediately:

```json
{
  "runId": "uuid-of-execution",
  "status": "accepted",
  "toolId": "my-tool-id"
}
```

To get the result, poll the run status:

```bash
curl "https://api.superglue.cloud/v1/runs/{runId}" \
  -H "Authorization: Bearer {apiKey}"
```

## Error Handling

### Retry Pattern (TypeScript)

```typescript
async function runToolWithRetry(toolId: string, inputs: Record<string, any>, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const response = await runTool(toolId, { inputs });

    if (response.status === 200 && response.data.status === "success") {
      return response.data;
    }

    if (response.data.error?.includes("validation")) {
      throw new Error(response.data.error);
    }

    if (attempt < maxRetries) {
      await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
    }
  }
  throw new Error(`Tool ${toolId} failed after ${maxRetries} attempts`);
}
```

## Environment Configuration

```bash
# Required
SUPERGLUE_API_KEY=your-api-key

# Optional (defaults to hosted)
SUPERGLUE_API_ENDPOINT=https://api.superglue.cloud
```

## Best Practices

1. **Store API keys in secrets** — Never commit to version control
2. **Validate payloads client-side** — Check against `inputSchema` before calling
3. **Handle errors gracefully** — Tools can fail due to external API issues
4. **Monitor run history** — Use `sg run list` or the web UI to track executions
5. **Use async mode for long-running tools** — Avoid timeouts on complex workflows
