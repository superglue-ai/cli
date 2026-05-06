import { ClientRequestSource, ExecutionFileEnvelope, ExtractArgs, ExtractResult, RequestSource, RunExecutionKind, Run, System, Tool, ToolResult } from "./types.js";
import { SSELogSubscriptionOptions, SSESubscription, type TokenProvider } from "./sse-log-subscription.js";
export declare class SuperglueClient {
    private tokenProvider;
    private sseManager;
    readonly apiEndpoint: string;
    private onInfrastructureError?;
    constructor({ apiKey, apiEndpoint, onInfrastructureError, sseTokenProvider, tokenProvider, }: {
        apiKey?: string;
        apiEndpoint?: string;
        onInfrastructureError?: () => void;
        sseTokenProvider?: TokenProvider;
        tokenProvider?: TokenProvider;
    });
    protected getApiKey(): Promise<string>;
    private isInfrastructureError;
    protected restRequest<T>(method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", path: string, body?: any, extraHeaders?: Record<string, string>, requestInit?: RequestInit): Promise<T>;
    subscribeToLogsSSE(options?: SSELogSubscriptionOptions): Promise<SSESubscription>;
    disconnect(): Promise<void>;
    /**
     * Execute a saved tool by ID (creates run record)
     */
    runTool(params: {
        toolId: string;
        payload?: Record<string, any>;
        files?: Record<string, ExecutionFileEnvelope>;
        credentials?: Record<string, string>;
        options?: {
            timeout?: number;
            traceId?: string;
            webhookUrl?: string;
            async?: boolean;
            requestSource?: ClientRequestSource;
        };
        runId?: string;
    }): Promise<ToolResult>;
    /**
     * Execute a tool config directly without persisting the tool.
     * Optionally creates a run record when `createRun` is true.
     */
    runToolConfig(params: {
        tool: Tool;
        payload?: Record<string, any>;
        files?: Record<string, ExecutionFileEnvelope>;
        credentials?: Record<string, string>;
        options?: {
            timeout?: number;
            requestSource?: ClientRequestSource;
        };
        runId?: string;
        traceId?: string;
        createRun?: boolean;
        executionKind?: RunExecutionKind;
        parentToolId?: string;
        draftId?: string;
    }): Promise<ToolResult>;
    abortToolExecution(runId: string): Promise<{
        success: boolean;
        runId: string;
    }>;
    /**
     * Execute a single step. Individual playground tests can opt into run persistence.
     */
    executeStep({ step, payload, files, previousResults, credentials, options, runId, mode, systemIds, createRun, parentToolId, stepIndex, stepId, }: {
        step: any;
        payload?: Record<string, any>;
        files?: Record<string, ExecutionFileEnvelope>;
        previousResults?: Record<string, any>;
        credentials?: Record<string, string>;
        options?: {
            timeout?: number;
        };
        runId?: string;
        mode?: "dev" | "prod";
        systemIds?: string[];
        createRun?: boolean;
        parentToolId?: string;
        stepIndex?: number;
        stepId?: string;
    }): Promise<{
        stepId: string;
        success: boolean;
        data?: any;
        error?: string;
        updatedStep?: any;
        stepFileKeys?: string[];
        producedFiles?: Record<string, ExecutionFileEnvelope>;
    }>;
    /**
     * Abort an in-flight step execution by runId.
     */
    abortStep(runId: string): Promise<{
        success: boolean;
        runId: string;
    }>;
    /**
     * Execute a final transform. Playground tests can opt into run persistence.
     */
    executeTransformOnly({ outputTransform, outputSchema, inputSchema, payload, files, stepResults, responseFilters, options, runId, createRun, parentToolId, stepId, }: {
        outputTransform: string;
        outputSchema?: any;
        inputSchema?: any;
        payload?: Record<string, any>;
        files?: Record<string, ExecutionFileEnvelope>;
        stepResults?: Record<string, any>;
        responseFilters?: any[];
        options?: {
            timeout?: number;
        };
        runId?: string;
        createRun?: boolean;
        parentToolId?: string;
        stepId?: string;
    }): Promise<{
        success: boolean;
        data?: any;
        error?: string;
        updatedTransform?: string;
        updatedOutputSchema?: any;
        outputFiles?: Record<string, ExecutionFileEnvelope>;
    }>;
    /**
     * Create a run entry in the database after manual tool execution.
     * Used when "Run All Steps" completes in the playground.
     */
    createRun({ toolId, toolConfig, toolResult, stepResults, toolPayload, status, error, startedAt, completedAt, executionKind, parentToolId, draftId, }: {
        toolId: string;
        toolConfig: Tool;
        toolResult?: unknown;
        stepResults?: Array<{
            stepId: string;
            success: boolean;
            data?: unknown;
            error?: string;
            stepFileKeys?: string[];
        }>;
        toolPayload?: Record<string, unknown>;
        status: "success" | "failed" | "aborted";
        error?: string;
        startedAt: Date;
        completedAt: Date;
        executionKind?: RunExecutionKind;
        parentToolId?: string;
        draftId?: string;
    }): Promise<{
        runId: string;
        toolId: string;
        status: string;
    }>;
    extract<T = any>({ file, envelope, }: ExtractArgs): Promise<ExtractResult & {
        data?: T;
        file?: ExecutionFileEnvelope;
    }>;
    private mapOpenAPIRunToRun;
    listRuns(options?: {
        limit?: number;
        page?: number;
        toolId?: string;
        search?: string;
        searchUserIds?: string[];
        includeTotal?: boolean;
        startedAfter?: string | Date;
        status?: "running" | "success" | "failed" | "aborted";
        requestSources?: RequestSource[];
        executionKinds?: RunExecutionKind[];
        userId?: string;
        systemId?: string;
        signal?: AbortSignal;
    }): Promise<{
        items: Run[];
        total: number;
        page: number;
        limit: number;
        hasMore: boolean;
    }>;
    getRun(id: string): Promise<Run | null>;
    getWorkflow(id: string): Promise<Tool | null>;
    archiveWorkflow(id: string, archived?: boolean): Promise<Tool>;
    listWorkflows(limit?: number, offset?: number, includeArchived?: boolean): Promise<{
        items: Tool[];
        total: number;
    }>;
    createWorkflow(id: string, input: Partial<Tool>): Promise<Tool>;
    updateWorkflow(id: string, input: Partial<Tool>): Promise<Tool>;
    upsertWorkflow(id: string, input: Partial<Tool>): Promise<Tool>;
    deleteWorkflow(id: string): Promise<boolean>;
    renameWorkflow(oldId: string, newId: string): Promise<Tool>;
    listSystems(limit?: number, page?: number, options?: {
        mode?: "dev" | "prod" | "all";
    }): Promise<{
        items: System[];
        total: number;
    }>;
    getSystem(id: string, options?: {
        environment?: "dev" | "prod";
    }): Promise<System>;
    createSystem(input: {
        id: string;
        name: string;
        url: string;
        credentials?: Record<string, any>;
        specificInstructions?: string;
        icon?: string;
        templateName?: string;
        documentationFiles?: Record<string, string[]>;
        metadata?: Record<string, any>;
        multiTenancyMode?: string;
        tunnel?: {
            tunnelId: string;
        };
        environment?: "dev" | "prod";
    }): Promise<System>;
    updateSystem(id: string, input: Partial<System>, options?: {
        environment?: "dev" | "prod";
    }): Promise<System>;
    deleteSystem(id: string, options?: {
        environment?: "dev" | "prod";
    }): Promise<boolean>;
    switchSystemEnvironment(id: string, targetEnv: "dev" | "prod"): Promise<System>;
    cacheOAuthSecret(args: {
        uid: string;
        clientId: string;
        clientSecret: string;
    }): Promise<boolean>;
    getOAuthSecret(uid: string): Promise<{
        client_id: string;
        client_secret: string;
    }>;
    getTemplateOAuthCredentials(templateId: string): Promise<{
        client_id: string;
        client_secret: string;
    }>;
    searchSystemDocumentation(systemId: string, keywords: string): Promise<string>;
    cacheOauthClientCredentials(params: {
        clientCredentialsUid: string;
        clientId: string;
        clientSecret: string;
    }): Promise<{
        success: boolean;
    }>;
    getOAuthClientCredentials(params: {
        templateId?: string;
        clientCredentialsUid?: string;
    }): Promise<{
        client_id: string;
        client_secret: string;
    }>;
    /**
     * Get the CLI OAuth encryption secret and orgId.
     * Used by CLI to encrypt API keys in OAuth state parameters.
     */
    getCliOAuthSecret(): Promise<{
        secret: string;
        orgId: string;
    }>;
    triggerSystemDocumentationScrapeJob(systemId: string, options?: {
        url?: string;
        keywords?: string[];
    }): Promise<{
        fileReferenceId: string;
        status: string;
    }>;
    fetchOpenApiSpec(systemId: string, url: string): Promise<{
        fileReferenceId: string;
        title?: string;
        version?: string;
    }>;
    createSystemFileUploadUrls(systemId: string, files: Array<{
        fileName: string;
        contentType?: string;
        contentLength?: number;
    }>): Promise<Array<{
        id: string;
        originalFileName: string;
        uploadUrl: string;
        expiresIn: number;
    }>>;
    uploadSystemFileReferences(systemId: string, files: Array<{
        fileName: string;
        content: string | Uint8Array;
        contentType?: string;
        contentLength?: number;
    }>): Promise<Array<{
        id: string;
        fileName: string;
    }>>;
    processFileReference(fileId: string): Promise<{
        success: boolean;
        fileId: string;
        processedStorageUri?: string;
    }>;
    listSystemFileReferences(systemId: string): Promise<{
        files: Array<{
            id: string;
            source: "upload" | "scrape" | "openapi";
            status: string;
            fileName: string;
            sourceUrl?: string;
            error?: string;
            createdAt?: string;
            contentLength?: number;
        }>;
    }>;
    deleteSystemFileReference(systemId: string, fileId: string): Promise<void>;
    getFileReferenceContent(fileId: string): Promise<string | null>;
    /**
     * Generate a portal link for end-user authentication.
     * Returns a URL that can be shared with end users to authenticate with systems.
     */
    getTenantInfo(): Promise<{
        email: string | null;
        emailEntrySkipped: boolean;
    }>;
    setTenantInfo(input: {
        email?: string;
        emailEntrySkipped?: boolean;
    }): Promise<{
        email: string | null;
        emailEntrySkipped: boolean;
    }>;
    generatePortalLink(): Promise<{
        success: boolean;
        portalUrl?: string;
        error?: string;
    }>;
}
//# sourceMappingURL=superglue-client.d.ts.map