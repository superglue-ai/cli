import { type LanguageModelMiddleware } from "ai";
import type { LlmProviderConfig } from "../environment/index.js";
export interface PromptCachingOptions {
    cacheKey?: string;
}
export declare function applyPromptCacheBreakpoints(messages: any[], cacheOptions: Record<string, any>): any[];
export declare function buildPromptCachingMiddleware(config: LlmProviderConfig, options: PromptCachingOptions): LanguageModelMiddleware | null;
export declare function initializeAIModel(config: LlmProviderConfig, options?: {
    promptCaching?: PromptCachingOptions;
}): any;
//# sourceMappingURL=ai-model-init.d.ts.map