import { type JSONSchema, type ToolStep } from "./types.js";
export interface BundleTool {
    id: string;
    name: string;
    shortName: string;
    instruction: string;
    steps: ToolStep[];
    inputSchema?: JSONSchema;
    outputTransform?: string;
}
export interface BundleMcpServer {
    name: string;
    displayName: string;
    description: string;
}
export interface BundleAgentLaunch {
    userPrompt: string;
    nextSteps: string;
}
export interface Bundle {
    templateId: string;
    systemId: string;
    displayName: string;
    description: string;
    systemUrl: string;
    credentialHint: string;
    requiredCredentialKeys: string[];
    demoCredentials?: Record<string, string>;
    tools: BundleTool[];
    mcpServer: BundleMcpServer;
    agentLaunch: BundleAgentLaunch;
}
export interface BundlePreview {
    id: string;
    displayName: string;
    description: string;
    credentialHint: string;
    system: {
        id: string;
        name: string;
        url: string;
        requiredCredentialKeys: string[];
    };
    tools: Array<{
        id: string;
        name: string;
        shortName: string;
        instruction: string;
    }>;
    mcpServer: BundleMcpServer;
}
export interface BundleInstallResult {
    bundleId: string;
    system: {
        id: string;
        name: string;
        requiredCredentialKeys: string[];
        hasUserCredentials: boolean;
    };
    tools: Array<{
        id: string;
        name?: string;
    }>;
    mcpServer: {
        id: string;
        name: string;
    };
}
export declare const bundles: Record<string, Bundle>;
export declare function buildBundleAgentLaunch({ bundle, install, }: {
    bundle: Bundle;
    install: BundleInstallResult;
}): {
    userPrompt: string;
    hiddenStarterMessage: string;
};
export declare function getBundle(bundleId: string): Bundle | null;
export declare function listBundles(): Bundle[];
export declare function rewriteBundleToolSystemId({ tool, fromSystemId, toSystemId, }: {
    tool: BundleTool;
    fromSystemId: string;
    toSystemId: string;
}): BundleTool;
//# sourceMappingURL=bundles.d.ts.map