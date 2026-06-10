import { type AgentContextUsage, type Message, type Run, type StoredRunResults, type SystemFrontendDraft, type Tool, type System } from "./types.js";
export interface PlaygroundContextData {
    toolId: string;
    instruction: string;
    steps: Array<{
        id: string;
        systemId?: string;
        method?: string;
        status?: string;
    }>;
    hasOutputTransform: boolean;
    inputSchemaFields: string[];
    outputSchemaFieldCount: number;
    transformStatus: string;
    currentPayload: string;
    uploadedFiles?: Array<{
        name: string;
        key: string;
        status?: string;
    }>;
    mergedPayload?: string;
}
export declare const TOOL_PLAYGROUND_INIT_MARKER = "[TOOL PLAYGROUND INITIAL STATE]";
export declare const SYSTEM_PLAYGROUND_INIT_MARKER = "[SYSTEM PLAYGROUND INITIAL STATE]";
export declare const DISPLAY_CONTEXT_WINDOW: number;
export declare function getContextUsagePercent(usage: AgentContextUsage): number;
export declare function getDisplayContextUsagePercent(usage: AgentContextUsage): number;
export declare function formatTokenCount(tokens: number): string;
export declare function normalizeDisplayContextUsage(usage: AgentContextUsage, draft?: string): AgentContextUsage;
export declare function estimateDisplayContextUsage(messages: Message[], draft: string): AgentContextUsage;
export declare function buildToolPlaygroundInitializationMessage({ config, manualPayload, mergedPayload, }: {
    config: Tool;
    manualPayload: string;
    mergedPayload: Record<string, any>;
}): string;
export declare function buildSystemPlaygroundInitializationMessage(_systemConfig: SystemFrontendDraft): string;
export interface ToolBuilderPrompt {
    userPrompt: string;
    hiddenStarterMessage: string;
    hideUserMessage: boolean;
}
export declare function getToolBuilderPrompts({ systemIds, systems, }: {
    systemIds?: string[];
    systems?: System[];
}): ToolBuilderPrompt;
export declare function getInvestigationPrompts(run: Run, storedResults?: StoredRunResults | null): {
    hiddenStarterMessage: string;
    userPrompt: string;
    hideUserMessage: boolean;
};
export type OnboardingIntentId = "build-integrations-faster" | "explore-apis-and-systems" | "migrate-data-between-systems" | "get-connectors-for-agents" | "check-out-the-tool";
export interface OnboardingRouting {
    userPrompt: string;
    hiddenStarterMessage: string;
}
export declare function buildOnboardingRouting(params: {
    persona: string | null;
    personaOther: string;
    selectedSystemLabels: string[];
    intent: OnboardingIntentId | null;
    intentOther: string;
}): OnboardingRouting;
//# sourceMappingURL=agent-context-utils.d.ts.map