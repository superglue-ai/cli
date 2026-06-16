/**
 * Consumes a Server-Sent Events response produced by the streaming variant of the
 * internal tool execution endpoints (`/v1/tools/step/run`, `/v1/tools/transform/run`)
 * and resolves with the terminal `result` payload.
 *
 * Framing contract (see `streamHandlerResult` on the server):
 * - `:` comment lines (e.g. `:ping` heartbeats) are ignored — they only keep the
 *   connection alive through proxies/load balancers during long executions.
 * - `event: result` + `data: <json>` carries the final response object. It is
 *   byte-for-byte the same object the non-streaming JSON path would have returned.
 * - `event: error` + `data: <json{message}>` signals a transport/handler failure.
 *
 * Throws if the stream closes before a terminal event arrives, so a connection
 * dropped mid-execution surfaces as an error rather than silently resolving
 * `undefined`.
 */
export declare function consumeEventStreamResult<T>(response: Response): Promise<T>;
//# sourceMappingURL=sse-result-stream.d.ts.map