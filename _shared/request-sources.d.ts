import { RequestSource, type ClientRequestSource } from "./types.js";
export declare const REQUEST_SOURCES: readonly [RequestSource.API, RequestSource.FRONTEND, RequestSource.AGENT, RequestSource.SCHEDULER, RequestSource.MCP, RequestSource.TOOL_CHAIN, RequestSource.WEBHOOK, RequestSource.CLI];
export declare const CLIENT_REQUEST_SOURCES: readonly [RequestSource.FRONTEND, RequestSource.AGENT, RequestSource.MCP, RequestSource.CLI];
export declare const NOTIFICATION_EXCLUDED_REQUEST_SOURCES: readonly RequestSource[];
export declare function isRequestSource(source: string): source is RequestSource;
export declare function isClientRequestSource(source: string): source is ClientRequestSource;
export declare function parseRequestSource(source: string): RequestSource | undefined;
//# sourceMappingURL=request-sources.d.ts.map