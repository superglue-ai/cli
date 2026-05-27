import type { AuthenticationType, SystemAuthentication } from "./authentication.js";
export type ServiceMetadata = {
    traceId?: string;
    orgId?: string;
    userId?: string;
    userEmail?: string;
    roleIds?: string[];
};
export type ConnectionProtocol = "http" | "postgres" | "mssql" | "redis" | "sftp" | "smb" | "odbc";
export interface Log {
    id: string;
    message: string;
    level: string | LogLevel;
    timestamp: Date;
    traceId?: string;
    orgId?: string;
}
export interface MessagePart {
    type: "content" | "tool" | "error";
    content?: string;
    errorDetails?: string;
    tool?: ToolCall;
    id: string;
}
export interface Message {
    id: string;
    content: string;
    role: "user" | "assistant" | "system";
    timestamp: Date;
    tools?: ToolCall[];
    parts?: MessagePart[];
    isStreaming?: boolean;
    isHidden?: boolean;
    stale?: true;
    attachedFiles?: Array<{
        name: string;
        size?: number;
        key: string;
        status?: "processing" | "ready" | "error";
        error?: string;
    }>;
}
export interface ToolCall {
    id: string;
    name: string;
    input?: any;
    frontendOutput?: any;
    llmOutput?: any;
    resultMetadata?: {
        path: string;
        bytes: number;
        truncated?: boolean;
    };
    confirmationState?: string;
    confirmationData?: any;
    status: "pending" | "awaiting_confirmation" | "running" | "completed" | "declined" | "stopped" | "error";
    error?: string;
    startTime?: Date;
    endTime?: Date;
    logs?: Array<{
        id: string;
        message: string;
        level: string;
        timestamp: Date;
        traceId?: string;
        orgId?: string;
    }>;
    buildResult?: any;
    executionTraceId?: string;
}
export interface UserInfo {
    id: string;
    email: string | null;
    name: string | null;
}
export interface OrgMember {
    id: string;
    email: string | null;
    name: string | null;
    userType: "member" | "end_user";
    roleIds: string[];
    createdAt?: string;
}
export interface OrgInvitation {
    id: string;
    email: string;
    role: string;
    status: string;
    inviterId: string;
    expiresAt: string;
    createdAt: string;
}
export declare enum SupportedFileType {
    JSON = "JSON",
    CSV = "CSV",
    XML = "XML",
    HTML = "HTML",
    YAML = "YAML",
    EXCEL = "EXCEL",
    PDF = "PDF",
    DOCX = "DOCX",
    ZIP = "ZIP",
    GZIP = "GZIP",
    BINARY = "BINARY",
    RAW = "RAW",
    AUTO = "AUTO"
}
export type JSONSchema = any;
export type JSONata = string;
export type Upload = File | Blob;
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS"
}
export declare enum CacheMode {
    ENABLED = "ENABLED",
    READONLY = "READONLY",
    WRITEONLY = "WRITEONLY",
    DISABLED = "DISABLED"
}
export declare enum FileType {
    CSV = "CSV",
    JSON = "JSON",
    XML = "XML",
    YAML = "YAML",
    EXCEL = "EXCEL",
    HTML = "HTML",
    PDF = "PDF",
    DOCX = "DOCX",
    ZIP = "ZIP",
    BINARY = "BINARY",
    RAW = "RAW",
    AUTO = "AUTO"
}
export declare enum AuthType {
    NONE = "NONE",
    OAUTH2 = "OAUTH2",
    HEADER = "HEADER",
    QUERY_PARAM = "QUERY_PARAM"
}
export declare enum DecompressionMethod {
    GZIP = "GZIP",
    DEFLATE = "DEFLATE",
    NONE = "NONE",
    AUTO = "AUTO",
    ZIP = "ZIP"
}
export declare enum PaginationType {
    OFFSET_BASED = "OFFSET_BASED",
    PAGE_BASED = "PAGE_BASED",
    CURSOR_BASED = "CURSOR_BASED",
    DISABLED = "DISABLED"
}
export declare enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}
export declare enum UpsertMode {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    UPSERT = "UPSERT"
}
export declare enum CredentialMode {
    MERGE = "MERGE",
    REPLACE = "REPLACE"
}
export declare enum RunStatus {
    RUNNING = "RUNNING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    ABORTED = "ABORTED"
}
export declare enum RequestSource {
    API = "api",
    FRONTEND = "frontend",
    AGENT = "agent",
    SCHEDULER = "scheduler",
    MCP = "mcp",
    TOOL_CHAIN = "tool-chain",
    WEBHOOK = "webhook",
    CLI = "cli"
}
export declare enum RunExecutionKind {
    FULL = "full",
    DRAFT = "draft",
    SINGLE_STEP = "single-step"
}
export type ClientRequestSource = RequestSource.FRONTEND | RequestSource.AGENT | RequestSource.MCP | RequestSource.CLI;
export declare enum FilterTarget {
    KEYS = "KEYS",
    VALUES = "VALUES",
    BOTH = "BOTH"
}
export declare enum FilterAction {
    REMOVE = "REMOVE",
    MASK = "MASK",
    FAIL = "FAIL"
}
export declare enum RemoveScope {
    FIELD = "FIELD",// Just this field - remove only the matched key-value
    ITEM = "ITEM",// This item - remove the containing object
    ENTRY = "ENTRY"
}
export interface ResponseFilter {
    id: string;
    name?: string;
    enabled: boolean;
    target: FilterTarget;
    pattern: string;
    action: FilterAction;
    maskValue?: string;
    scope?: RemoveScope;
}
export interface BaseConfig {
    id: string;
    version?: string;
    createdByUserId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    lastUsedAt?: Date;
}
export interface BaseResult {
    id: string;
    success: boolean;
    data?: any;
    error?: string;
    headers?: Record<string, any>;
    statusCode?: number;
    startedAt: Date;
    completedAt: Date;
}
export type PaginationTypeValue = "offsetBased" | "pageBased" | "cursorBased" | "disabled";
export interface Pagination {
    type: PaginationTypeValue;
    pageSize?: string;
    cursorPath?: string;
    stopCondition?: string;
}
export type StepConfigType = "request" | "transform";
export interface RequestStepConfig {
    type?: "request";
    url: string;
    method?: HttpMethod | string;
    queryParams?: Record<string, any>;
    headers?: Record<string, any>;
    body?: string;
    pagination?: Pagination;
    systemId?: string;
}
export interface TransformStepConfig {
    type: "transform";
    transformCode: string;
}
export type StepConfig = RequestStepConfig | TransformStepConfig;
export declare function isRequestConfig(config: StepConfig | null | undefined): config is RequestStepConfig;
export declare function isTransformConfig(config: StepConfig | null | undefined): config is TransformStepConfig;
export type FailureBehavior = "fail" | "continue";
export interface ToolStep {
    id: string;
    config: StepConfig;
    instruction?: string;
    modify?: boolean;
    dataSelector?: string;
    failureBehavior?: FailureBehavior;
    outputFile?: boolean;
}
export interface Tool extends BaseConfig {
    name?: string;
    steps: ToolStep[];
    outputTransform?: string;
    inputSchema?: JSONSchema;
    outputSchema?: JSONSchema;
    instruction?: string;
    folder?: string;
    archived?: boolean;
    responseFilters?: ResponseFilter[];
}
export interface ExecutionFileEnvelope {
    kind: "execution_file";
    filename: string;
    contentType: string;
    size: number;
    rawBase64?: string;
    fileType?: SupportedFileType;
    extracted?: unknown;
    parseError?: string;
}
export interface RawFileBytes {
    kind: "raw_file_bytes";
    base64: string;
    filename: string;
    contentType: string;
}
export interface ToolStepResult {
    stepId: string;
    success: boolean;
    data?: any;
    error?: string;
    stepFileKeys?: string[];
}
export interface ToolResult {
    success: boolean;
    data?: any;
    error?: string;
    tool: Tool;
    stepResults: ToolStepResult[];
    fileArtifacts?: FileArtifact[];
}
/** File artifact produced by a tool's output transform.
 *  Stored in the run record with storageUri; served to clients with downloadUrl. */
export interface FileArtifact {
    fileKey: string;
    filename: string;
    contentType: string;
    size: number;
    storageUri?: string;
    downloadUrl?: string;
}
export interface DocumentationFiles {
    uploadFileIds?: string[];
    scrapeFileIds?: string[];
    openApiFileIds?: string[];
}
export interface TunnelTarget {
    name: string;
    description?: string;
}
export interface TunnelConnection {
    id: string;
    orgId: string;
    connectedAt: string;
    targets: TunnelTarget[];
}
export interface TunnelConfig {
    tunnelId: string;
}
export interface System extends BaseConfig {
    name?: string;
    type?: string;
    url?: string;
    credentials?: Record<string, any>;
    authentication?: SystemAuthentication;
    hasUserCredentials?: boolean;
    documentationUrl?: string;
    documentation?: string;
    documentationPending?: boolean;
    openApiSchema?: string;
    openApiUrl?: string;
    specificInstructions?: string;
    documentationKeywords?: string[];
    icon?: string;
    metadata?: Record<string, any>;
    templateName?: string;
    documentationFiles?: DocumentationFiles;
    credentialOwnership?: CredentialOwnership;
    suggestedCredentialKeys?: string[];
    tunnel?: TunnelConfig;
    environment?: "dev" | "prod";
    createdByUserName?: string;
    createdByUserEmail?: string;
}
export interface SystemInput {
    id: string;
    name?: string;
    url?: string;
    documentationUrl?: string;
    documentation?: string;
    documentationPending?: boolean;
    specificInstructions?: string;
    documentationKeywords?: string[];
    icon?: string;
    credentials?: Record<string, string>;
    authentication?: SystemAuthentication;
    metadata?: Record<string, any>;
    templateName?: string;
    environment?: "dev" | "prod";
}
export interface SuggestedTool {
    id: string;
    instruction?: string;
    inputSchema?: JSONSchema;
    outputSchema?: JSONSchema;
    steps: Array<{
        systemId?: string;
        instruction?: string;
        config?: {
            url?: string;
            method?: string;
            queryParams?: Record<string, any>;
            headers?: Record<string, any>;
            body?: string;
        };
    }>;
    reason: string;
}
export interface ExtractResult extends BaseResult {
    file?: ExecutionFileEnvelope;
}
export type ExtractInputRequest = {
    file: Upload;
    envelope?: boolean;
};
export type ToolInputRequest = {
    id?: string;
    workflow?: Tool;
};
export type RequestOptions = {
    cacheMode?: CacheMode;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    webhookUrl?: string;
};
export interface RunMetadata {
    startedAt: string;
    completedAt?: string;
    durationMs?: number;
    executionKind?: RunExecutionKind;
    parentToolId?: string;
}
export interface Run {
    runId: string;
    toolId: string;
    tool?: Tool;
    status: RunStatus;
    toolPayload?: Record<string, any>;
    data?: any;
    error?: string;
    stepResults?: ToolStepResult[];
    options?: RequestOptions;
    requestSource?: RequestSource;
    traceId?: string;
    metadata: RunMetadata;
    resultStorageUri?: string;
    userId?: string;
    executionMode?: SystemEnvironment;
    fileArtifacts?: FileArtifact[];
}
export interface StoredRunResults {
    runId: string;
    success: boolean;
    data: any;
    stepResults: ToolStepResult[];
    toolPayload: Record<string, any>;
    error?: string;
    storedAt: Date;
    fileArtifacts?: FileArtifact[];
}
export interface ApiCallArgs {
    id?: string;
    endpoint?: RequestStepConfig;
    payload?: Record<string, any>;
    credentials?: Record<string, string>;
    options?: RequestOptions;
}
export interface ExtractArgs {
    file: Upload;
    envelope?: boolean;
}
export interface ToolArgs {
    id?: string;
    tool?: Tool;
    payload?: Record<string, any>;
    files?: Record<string, ExecutionFileEnvelope>;
    credentials?: Record<string, string>;
    options?: RequestOptions;
    verbose?: boolean;
    runId?: string;
    traceId?: string;
}
export interface ToolDiff {
    op: "add" | "remove" | "replace" | "move" | "copy" | "test";
    path: string;
    value?: any;
    from?: string;
}
export type SystemList = {
    items: System[];
    total: number;
};
export type ToolScheduleInput = {
    id?: string;
    toolId?: string;
    cronExpression?: string;
    timezone?: string;
    enabled?: boolean;
    payload?: Record<string, any>;
    options?: RequestOptions;
};
export type ToolSchedule = {
    id: string;
    toolId: string;
    cronExpression: string;
    timezone: string;
    enabled: boolean;
    payload?: Record<string, any>;
    options?: RequestOptions;
    createdByUserId?: string;
    lastRunAt?: Date;
    nextRunAt: Date;
    createdAt: Date;
    updatedAt: Date;
};
export declare enum DiscoveryRunStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    ABORTED = "ABORTED"
}
export type DiscoverySourceType = "file" | "url" | "system";
export interface DiscoverySource {
    id: string;
    type: DiscoverySourceType;
}
export interface DiscoveryRunData {
    title?: string;
    description?: string;
    systems?: ExtendedSystem[];
    error?: string;
}
export interface DiscoveryRun {
    id: string;
    sources: DiscoverySource[];
    data?: DiscoveryRunData;
    status: DiscoveryRunStatus;
    createdAt: Date;
}
export declare enum FileStatus {
    PENDING = "PENDING",
    UPLOADING = "UPLOADING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}
export interface FileReference {
    id: string;
    storageUri: string;
    processedStorageUri?: string;
    metadata: any;
    status: FileStatus;
    error?: string;
    createdAt?: Date;
}
export interface BatchFileUploadRequest {
    files: Array<{
        fileName: string;
        metadata?: {
            contentType?: string;
            contentLength?: number;
            [key: string]: any;
        };
    }>;
}
export interface BatchFileUploadResponse {
    success: boolean;
    files: Array<{
        id: string;
        originalFileName: string;
        uploadUrl: string;
        expiresIn: number;
    }>;
}
export interface ExtendedSystem extends Omit<System, "icon"> {
    icon?: {
        name: string;
        source: "simpleicons" | "lucide";
    };
    sources: string[];
    capabilities: string[];
    confidence: "high" | "medium" | "low";
    evidence: string;
    systemDetails?: string;
    matchedSystemId?: string;
    potentialConnections?: string[];
}
export interface DiscoveryResult {
    title: string;
    description: string;
    systems: ExtendedSystem[];
}
export declare enum AgentType {
    MAIN = "main",
    PLAYGROUND = "playground",
    SYSTEM_PLAYGROUND = "system_playground",
    ACCESS_RULES = "access_rules"
}
export declare const PLAYGROUND_TOOL_DRAFT_ID = "@playground-draft";
export declare const AGENT_BASE_TOOLS: readonly ["run_command", "load_skill", "call_system", "run_tool"];
export declare const AGENT_TOOLS: Record<AgentType, string[]>;
export declare const DYNAMIC_AGENT_TOOLS: readonly ["web_search"];
export declare const SKILL_BODY_NAMES: readonly ["tool-building", "tool-editing", "system-setup", "access-rule-setup", "tool-deployment", "demos"];
export type SkillBody = (typeof SKILL_BODY_NAMES)[number];
export declare const SKILL_REFERENCE_NAMES: readonly ["superglue-info", "http", "graphql", "postgres", "mssql", "odbc", "redis", "sftp-smb", "file-handling", "systems-handling"];
export type SkillReference = (typeof SKILL_REFERENCE_NAMES)[number];
export declare const LOADABLE_MARKDOWN_NAMES: readonly ["tool-building", "tool-editing", "system-setup", "access-rule-setup", "tool-deployment", "demos", "superglue-info", "http", "graphql", "postgres", "mssql", "odbc", "redis", "sftp-smb", "file-handling", "systems-handling"];
export type LoadableMarkdown = SkillBody | SkillReference;
export declare const SKILL_GATED_TOOLS: Partial<Record<LoadableMarkdown, string[]>>;
export declare enum ConfirmationAction {
    CONFIRMED = "confirmed",
    DECLINED = "declined",
    OAUTH_SUCCESS = "oauth_success",
    OAUTH_FAILURE = "oauth_failure"
}
export type OAuthFields = Record<string, string> & {
    grant_type: "authorization_code" | "client_credentials";
};
export interface SectionStatus {
    isComplete: boolean;
    hasErrors: boolean;
    label: string;
}
export interface FrontendDraftSectionStatus {
    isComplete: boolean;
    label: string;
}
export interface SystemKnowledgeBaseDraftFile {
    id: string;
    source: "upload" | "scrape" | "openapi";
    status: string;
    fileName: string;
    sourceUrl?: string;
    error?: string;
    createdAt?: string;
    contentLength?: number;
    stagedAction?: "add" | "delete";
}
export interface SystemKnowledgeBaseDraft {
    files: SystemKnowledgeBaseDraftFile[];
    pendingFileReferences: SystemKnowledgeBaseDraftFile[];
    pendingDeletes: string[];
}
export type SystemFrontendDraft = {
    isNewSystem: boolean;
    credentialDraftTouched?: boolean;
    system: Record<string, any> & {
        id: string;
        url: string;
        environment?: "dev" | "prod";
        specificInstructions: string;
        credentials: Record<string, any>;
        authentication?: SystemAuthentication;
        credentialOwnership: CredentialOwnership;
    };
    authType: AuthenticationType;
    sectionStatuses: Record<"configuration" | "authentication" | "context", FrontendDraftSectionStatus>;
    knowledgeBase: SystemKnowledgeBaseDraft;
};
export type StagedDocumentationUpload = {
    id: string;
    fileName: string;
    sourceKind: "browser-file" | "resolved-payload";
    contentType?: string;
    contentLength?: number;
    file?: Blob;
    content?: string | Uint8Array;
};
export type SystemChangeItem = {
    label: string;
    value: string;
};
export type PlaygroundToolContext = Record<string, any> & {
    toolId: string;
    instruction: string;
    steps: any[];
};
export interface DraftLookup {
    config: Tool;
    systemIds: string[];
    instruction: string;
    executionResults?: Record<string, {
        status: string;
        result?: string;
        error?: string;
    }>;
}
export type AccessRulesContext = Record<string, any> & {
    role: {
        id: string;
        name: string;
        tools: "ALL" | string[];
        systems: "ALL" | Record<string, any>;
        description?: string;
        isBaseRole?: boolean;
    };
    users: Array<{
        id: string;
        email: string | null;
        name: string | null;
    }>;
    isEditing: boolean;
};
export interface FrontendDrafts {
    tool?: DraftLookup;
    system?: SystemFrontendDraft;
    role?: Record<string, unknown>;
}
export interface AgentContextUsage {
    inputTokens?: number;
    outputTokens?: number;
    usedTokens: number;
    contextWindow: number;
    percent: number;
}
export type AgentExecutionMode = "auto" | "confirm_before_execution" | "confirm_after_execution";
export type ExecutionMode = AgentExecutionMode;
export type EditToolSaveResult = {
    success: true;
    toolId: string;
} | {
    success: false;
    error: string;
} | undefined;
export interface AgentCompactionPayload {
    memoryMessage: Message | null;
    staleMessageIds: string[];
    tokenEstimate?: {
        before: number;
        after: number;
    };
}
export interface AgentRequest {
    agentId: AgentType;
    messages: Message[];
    agentParams?: Record<string, any>;
    userMessage?: string;
    visibleUserMessageId?: string;
    resumeToolCallId?: string;
    conversationId?: string;
    loadedSkills?: string[];
    frontendDrafts?: FrontendDrafts;
    accessRulesContext?: AccessRulesContext;
    isFreeTier?: boolean;
    contextUsage?: AgentContextUsage;
}
export interface AgentStreamChunk {
    type: "content" | "system_message" | "context_usage" | "compaction_start" | "compaction_complete" | "tool_call_start" | "tool_call_complete" | "tool_call_update" | "done" | "paused" | "error";
    content?: string;
    errorDetails?: string;
    contextUsage?: AgentContextUsage;
    compaction?: AgentCompactionPayload;
    systemMessage?: {
        id: string;
        content: string;
    };
    toolCall?: Record<string, any> & {
        id: string;
        name: string;
    };
    executionMode?: AgentExecutionMode;
    awaitingConfirmation?: boolean;
    pauseReason?: "awaiting_confirmation";
}
export interface CallSystemArgs {
    systemId?: string;
    environment?: "dev" | "prod";
    protocol?: ConnectionProtocol;
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    askToConfirm?: boolean;
}
export interface CallSystemResult {
    success: boolean;
    protocol: ConnectionProtocol;
    status?: number;
    statusText?: string;
    headers?: Record<string, string>;
    data?: any;
    error?: string;
}
export type NotificationMode = "realtime" | "daily_summary" | "weekly_summary";
export interface NotificationRuleConditions {
    status: "failed" | "success" | "any";
    toolIdPattern?: string;
    requestSources?: RequestSource[];
    tags?: string[];
    folders?: string[];
}
export interface NotificationRule {
    id: string;
    enabled: boolean;
    mode?: NotificationMode;
    conditions: NotificationRuleConditions;
}
export interface NotificationSummaryPayload {
    period: "daily" | "weekly";
    periodStart: string;
    periodEnd: string;
    requestSources: RequestSource[];
    toolStats: Array<{
        toolId: string;
        successCount: number;
        failedCount: number;
    }>;
    adminUrl: string;
}
export type NotificationChannelStatus = "active" | "failing" | "disabled";
export interface BaseChannelConfig {
    enabled: boolean;
    rules: NotificationRule[];
    status: NotificationChannelStatus;
    consecutiveFailures: number;
    lastError?: string;
    lastErrorAt?: string;
}
export type SlackAuthType = "webhook" | "bot_token" | "oauth";
export interface SlackChannelConfig extends BaseChannelConfig {
    authType: SlackAuthType;
    webhookUrl?: string;
    botToken?: string;
    channelId?: string;
    accessToken?: string;
    teamId?: string;
}
export interface EmailChannelConfig extends BaseChannelConfig {
    recipients: string[];
    fromAddress?: string;
}
export interface NotificationChannels {
    slack?: SlackChannelConfig;
    email?: EmailChannelConfig;
}
export interface NotificationRateLimit {
    maxPerHour: number;
    currentCount: number;
    windowStart: string;
}
export interface NotificationSettings {
    channels?: NotificationChannels;
    rateLimit?: NotificationRateLimit;
}
export interface OrgSettings {
    orgId: string;
    notifications?: NotificationSettings;
    preferences: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
}
export type CredentialOwnership = "organization" | "user";
export type OrgStatus = "free" | "team" | "enterprise";
export type SystemEnvironment = "dev" | "prod";
export declare enum SystemAccessLevel {
    NONE = "none",
    READ_ONLY = "read-only",
    READ_WRITE = "read-write"
}
export interface CustomRule {
    id: string;
    name: string;
    expression?: string;
    isActive: boolean;
}
export interface CustomRulePermission {
    rules: CustomRule[];
}
export type SystemPermission = SystemAccessLevel | CustomRulePermission;
export interface Role extends BaseConfig {
    name: string;
    description?: string;
    tools: "ALL" | string[];
    systems: "ALL" | Record<string, SystemPermission>;
    isBaseRole?: boolean;
    isPersonalRole?: boolean;
    userId?: string;
    ownerName?: string;
    ownerEmail?: string;
    userCount?: number;
}
export interface RoleInput {
    name: string;
    description?: string;
    tools?: "ALL" | string[];
    systems?: "ALL" | Record<string, SystemPermission>;
}
export interface UserRoleAssignment {
    userId: string;
    roleIds: string[];
}
export interface PatchSystemBody {
    name?: string;
    url?: string;
    specificInstructions?: string;
    icon?: string;
    credentials?: Record<string, any>;
    authentication?: SystemAuthentication;
    metadata?: Record<string, any>;
    templateName?: string;
    credentialOwnership?: CredentialOwnership;
    documentationFiles?: DocumentationFiles;
    tunnel?: TunnelConfig | null;
    environment?: "dev" | "prod";
}
export declare const MCP_SERVER_AUTH_MODES: readonly ["oauth", "creator_api_key"];
export type McpServerAuthMode = (typeof MCP_SERVER_AUTH_MODES)[number];
export interface McpServerConfig {
    id: string;
    orgId: string;
    name: string;
    displayName?: string;
    description?: string;
    authMode?: McpServerAuthMode;
    toolIds: string[];
    createdByUserId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface McpServerConfigInput {
    name: string;
    displayName?: string;
    description?: string;
    authMode?: McpServerAuthMode;
    toolIds: string[];
}
//# sourceMappingURL=types.d.ts.map