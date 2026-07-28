import type { StagedDocumentationUpload, SystemChangeItem, SystemFrontendDraft } from "./types.js";
export declare const SYSTEM_PLAYGROUND_DRAFT_ID = "@playground-draft";
export declare const KNOWLEDGE_BASE_CHANGE_LABEL = "Knowledge base";
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
export declare function buildMergedSystemPlaygroundConfig({ draft, input, mode, }: {
    draft: SystemFrontendDraft;
    input: any;
    mode: "create" | "edit";
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