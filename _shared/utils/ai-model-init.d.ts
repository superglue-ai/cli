/**
 * Initializes the AI model provider.
 *
 * Two modes:
 * 1. Vercel AI Gateway: If AI_GATEWAY_API_KEY is set, routes through a unified gateway that handles
 *    provider abstraction. Just returns the provider model string (e.g. "anthropic/claude-sonnet-4-5").
 *    The gateway handles auth and routing to the actual provider.
 *
 * 2. Direct AI SDK Providers: Falls back to initializing specific providers (Anthropic, OpenAI,
 *    Gemini, Azure) using Vercel AI SDK. Requires provider-specific API keys and configs.
 *    Uses provider-specific model env vars (e.g., OPENAI_MODEL, ANTHROPIC_MODEL, GEMINI_MODEL).
 *
 * @param options - Configuration options
 * @param options.providerEnvVar - Environment variable name for the provider (default: 'LLM_PROVIDER')
 * @param options.defaultModel - Default model if not specified in env (default: 'gpt-4.1')
 * @param options.modelOverride - If set, use this model instead of env var (useful for dedicated endpoints)
 * @returns AI model instance that can be used with Vercel AI SDK functions
 */
export declare function initializeAIModel(options?: {
    providerEnvVar?: string;
    defaultModel?: string;
    modelOverride?: string;
}): any;
//# sourceMappingURL=ai-model-init.d.ts.map