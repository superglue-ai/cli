import type { WebSearchConfig } from "../environment/index.js";
export declare function getWebSearchTool(config: WebSearchConfig): Promise<Record<string, any> | null>;
/**
 * Check if a tool name is a web search tool.
 * Tavily registers as "web_search". Native provider tools may use
 * provider-prefixed names (e.g., "openai.web_search", "google_search").
 */
export declare function isWebSearchTool(toolName: string): boolean;
export declare function hasNativeWebSearch(provider: string | undefined): boolean;
//# sourceMappingURL=web-search.d.ts.map