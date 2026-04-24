/**
 * Returns the web search tool based on available configuration.
 * Priority: Tavily (if API key set) → native provider tool → null.
 *
 * Returns a Record<string, any> fragment to Object.assign into the tools record,
 * or null if no web search is available.
 */
export declare function getWebSearchTool(): Promise<Record<string, any> | null>;
/**
 * Check if a tool name is a web search tool.
 * Tavily registers as "web_search". Native provider tools may use
 * provider-prefixed names (e.g., "openai.web_search", "google_search").
 */
export declare function isWebSearchTool(toolName: string): boolean;
/**
 * Returns whether the given LLM_PROVIDER supports native web search.
 * Used by environment.ts to show the right warning message.
 */
export declare function hasNativeWebSearch(provider: string | undefined): boolean;
//# sourceMappingURL=web-search.d.ts.map