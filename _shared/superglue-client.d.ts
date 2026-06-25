import { ActivityDailyCount, ClientRequestSource, ExecutionFileEnvelope, ExtractArgs, ExtractResult, FileReference, PatchSystemBody, OAuthExchangeCompleteRequest, OAuthExchangeCompleteResponse, OAuthExchangeRequest, OAuthExchangeStartResponse, RequestSource, RunClientInfo, RunExecutionKind, Run, RunLimitCheckResponse, System, Tool, ToolSchedule, ToolScheduleInput, ToolResult } from "./types.js";
import type { SystemAuthentication } from "./authentication.js";
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
    private buildHttpError;
    private streamRequest;
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
            clientInfo?: RunClientInfo;
        };
        runId?: string;
        includeStepResultData?: boolean;
        signal?: AbortSignal;
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
            mode?: "dev" | "prod";
        };
        runId?: string;
        traceId?: string;
        createRun?: boolean;
        executionKind?: RunExecutionKind;
        parentToolId?: string;
        draftId?: string;
        includeStepResultData?: boolean;
        signal?: AbortSignal;
    }): Promise<ToolResult>;
    abortToolExecution(runId: string): Promise<{
        success: boolean;
        runId: string;
    }>;
    /**
     * Execute a single step. Individual playground tests can opt into run persistence.
     */
    executeStep({ step, payload, files, previousResults, credentials, options, runId, mode, systemIds, createRun, parentToolId, stepIndex, stepId, signal, stream, }: {
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
        signal?: AbortSignal;
        stream?: boolean;
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
    executeTransformOnly({ outputTransform, outputSchema, inputSchema, payload, files, stepResults, options, runId, createRun, parentToolId, stepId, signal, stream, }: {
        outputTransform: string;
        outputSchema?: any;
        inputSchema?: any;
        payload?: Record<string, any>;
        files?: Record<string, ExecutionFileEnvelope>;
        stepResults?: Record<string, any>;
        options?: {
            timeout?: number;
        };
        runId?: string;
        createRun?: boolean;
        parentToolId?: string;
        stepId?: string;
        signal?: AbortSignal;
        stream?: boolean;
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
    checkRunLimit(): Promise<RunLimitCheckResponse>;
    extract<T = any>({ file, envelope, }: ExtractArgs): Promise<ExtractResult & {
        data?: T;
        file?: ExecutionFileEnvelope;
    }>;
    private mapOpenAPIRunToRun;
    private mapOpenAPIScheduleToToolSchedule;
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
    getActivityCounts(options?: {
        from?: string | Date;
        to?: string | Date;
        signal?: AbortSignal;
    }): Promise<ActivityDailyCount[]>;
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
    listToolSchedules(toolId?: string): Promise<ToolSchedule[]>;
    listToolSchedules(options: {
        toolId?: string;
        limit?: number;
        page?: number;
    }): Promise<{
        items: ToolSchedule[];
        total: number;
        page: number;
        limit: number;
        hasMore: boolean;
    }>;
    listToolSchedulesPage(options?: {
        toolId?: string;
        limit?: number;
        page?: number;
    }): Promise<{
        items: ToolSchedule[];
        total: number;
        page: number;
        limit: number;
        hasMore: boolean;
    }>;
    getToolSchedule(toolId: string, scheduleId: string): Promise<ToolSchedule | null>;
    createToolSchedule(toolId: string, schedule: Pick<ToolScheduleInput, "cronExpression" | "timezone"> & Pick<ToolScheduleInput, "enabled" | "payload" | "options">): Promise<ToolSchedule>;
    updateToolSchedule(toolId: string, scheduleId: string, updates: Pick<ToolScheduleInput, "cronExpression" | "timezone" | "enabled" | "payload" | "options">): Promise<ToolSchedule>;
    deleteToolSchedule(toolId: string, scheduleId: string): Promise<boolean>;
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
        authentication?: SystemAuthentication;
        specificInstructions?: string;
        icon?: string;
        templateName?: string;
        documentationFiles?: Record<string, string[]>;
        metadata?: Record<string, any>;
        requiredCredentialKeys?: string[];
        tunnel?: {
            tunnelId: string;
        };
        environment?: "dev" | "prod";
    }): Promise<System>;
    updateSystem(id: string, input: PatchSystemBody, options?: {
        environment?: "dev" | "prod";
    }): Promise<System>;
    deleteSystem(id: string, options?: {
        environment?: "dev" | "prod";
    }): Promise<boolean>;
    switchSystemEnvironment(id: string, targetEnv: "dev" | "prod"): Promise<System>;
    getTemplateOAuthCredentials(templateId: string): Promise<{
        client_id: string;
        client_secret: string;
    }>;
    createOAuthExchange(params: OAuthExchangeRequest): Promise<OAuthExchangeStartResponse>;
    completeOAuthExchange(oauthExchangeId: string, params: OAuthExchangeCompleteRequest): Promise<OAuthExchangeCompleteResponse>;
    searchSystemDocumentation(systemId: string, keywords: string): Promise<string>;
    triggerSystemDocumentationScrapeJob(systemId: string, options?: {
        url?: string;
        keywords?: string[];
        link?: boolean;
    }): Promise<{
        fileReferenceId: string;
        status: string;
    }>;
    fetchOpenApiSpec(systemId: string, url: string, options?: {
        link?: boolean;
    }): Promise<{
        fileReferenceId: string;
        title?: string;
        version?: string;
    }>;
    createSystemFileUploadUrls(systemId: string, files: Array<{
        fileName: string;
        contentType?: string;
        contentLength?: number;
    }>, options?: {
        link?: boolean;
    }): Promise<Array<{
        id: string;
        originalFileName: string;
        uploadUrl: string;
        expiresIn: number;
    }>>;
    uploadSystemFileReferences(systemId: string, files: Array<{
        fileName: string;
        content: string | Uint8Array | Blob;
        contentType?: string;
        contentLength?: number;
    }>, options?: {
        link?: boolean;
        settle?: boolean;
    }): Promise<Array<{
        id: string;
        fileName: string;
        contentLength?: number;
        status: "uploaded" | "failed";
        error?: string;
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
    listFileReferences(fileIds: string[]): Promise<{
        files: FileReference[];
        total: number;
    }>;
    deleteSystemFileReference(systemId: string, fileId: string): Promise<void>;
    getFileReferenceContent(fileId: string): Promise<string | null>;
    /**
     * Generate a credentials login link for the current API key user.
     * The returned URL opens the login flow and then redirects to Credentials.
     */
    generateCredentialsLink(input?: {
        systemId?: string;
        environment?: "dev" | "prod";
    }): Promise<{
        success: boolean;
        credentialsUrl?: string;
        error?: string;
    }>;
}
//# sourceMappingURL=superglue-client.d.ts.map