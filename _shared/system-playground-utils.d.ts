import type { StagedDocumentationUpload, SystemChangeItem, SystemFrontendDraft } from "./types.js";
export declare const SYSTEM_PLAYGROUND_DRAFT_ID = "@playground-draft";
export declare const KNOWLEDGE_BASE_CHANGE_LABEL = "Knowledge base";
export type SystemEnvironmentTarget = "dev" | "prod";
export declare function buildCreateSystemEnvironmentPrompts({ systemId, systemName, targetEnv, }: {
    systemId: string;
    systemName: string;
    targetEnv: SystemEnvironmentTarget;
}): {
    userPrompt: string;
    hiddenStarterMessage: string;
    hideUserMessage: boolean;
};
type PlaygroundSystemConfig = SystemFrontendDraft["system"];
type SystemKnowledgeBaseUrlInput = {
    url: string;
    source: "openapi" | "scrape";
};
type NormalizedSystemKnowledgeBaseInput = {
    files?: string;
    urls: SystemKnowledgeBaseUrlInput[];
    removeDocumentIds: string[];
};
export declare function normalizeSystemKnowledgeBaseInput(input: any): NormalizedSystemKnowledgeBaseInput;
export declare function buildSystemPendingOutput(input: any): {
    status: string;
    pendingInputs: string[];
    systemConfig: any;
};
export declare function getSystemFieldDisplayLabel(fieldOrLabel: string): string;
export declare function formatSystemChangePreview(value: unknown, fallback?: string): string;
export declare function formatCredentialDisplayValue(key: string, value: unknown): string;
export declare function buildMergedSystemPlaygroundConfig({ draft, input, mode, userProvidedInputs, }: {
    draft: SystemFrontendDraft;
    input: any;
    mode: "create" | "edit";
    userProvidedInputs?: Record<string, string>;
}): PlaygroundSystemConfig;
export declare function summarizeSystemPlaygroundChanges({ previous, next, input, }: {
    previous: PlaygroundSystemConfig;
    next: PlaygroundSystemConfig;
    input: any;
}): SystemChangeItem[];
export declare function convertUploadToClientPayload(upload: StagedDocumentationUpload): Promise<{
    fileName: string;
    content: string | Uint8Array | Blob;
    contentType?: string;
    contentLength?: number;
}>;
export {};
//# sourceMappingURL=system-playground-utils.d.ts.map