import type { AuthenticationType, SystemAuthentication } from "./authentication.js";
export type ServiceMetadata = {
    traceId?: string;
    orgId?: string;
    userId?: string;
    userEmail?: string;
    roleIds?: string[];
};
export type ConnectionProtocol = "http" | "postgres" | "mssql" | "redis" | "mongodb" | "sftp" | "smb" | "odbc";
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
export interface AgentSessionUpload {
    key: string;
    name: string;
    size: number;
    originalSize?: number;
    contentType?: string;
    status: "ready";
    jsonPath: string;
    rawPath?: string;
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
    attachedFiles?: AgentSessionUpload[];
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
export interface HtmlArtifactMetadata {
    id: string;
    kind: "html";
    title: string;
    bytes: number;
    contentHash: string;
    createdAt: string;
    updatedAt: string;
}
export interface HtmlArtifact extends HtmlArtifactMetadata {
    html: string;
}
export interface HtmlArtifactToolOutput {
    success: boolean;
    operation?: "created" | "updated";
    artifact?: HtmlArtifactMetadata;
    message?: string;
    error?: string;
}
export declare const MAX_HTML_ARTIFACT_BYTES: number;
export interface UserInfo {
    id: string;
    email: string | null;
    name: string | null;
}
export type OrgBaseRole = "admin" | "member";
export interface OrgMember {
    id: string;
    email: string | null;
    name: string | null;
    userType: "member";
    baseRole: OrgBaseRole;
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
    PPTX = "PPTX",
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
    PPTX = "PPTX",
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
export type ActivityCountKind = "run" | "tool" | "system" | "share";
export interface ActivityDailyCount {
    day: string;
    kind: ActivityCountKind;
    count: number;
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
    openApiUrl?: string;
    specificInstructions?: string;
    icon?: string;
    metadata?: Record<string, any>;
    templateName?: string;
    documentationFiles?: DocumentationFiles;
    requiredCredentialKeys?: string[];
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
    specificInstructions?: string;
    icon?: string;
    credentials?: Record<string, string>;
    authentication?: SystemAuthentication;
    metadata?: Record<string, any>;
    templateName?: string;
    requiredCredentialKeys?: string[];
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
    pinnedCredentials?: Record<string, string>;
    /** @deprecated Use pinnedCredentials instead. */
    credentialsList?: Record<string, string>;
};
export interface RunClientInfo {
    name?: string;
    version?: string;
    userAgent?: string;
}
export interface RunMetadata {
    startedAt: string;
    completedAt?: string;
    durationMs?: number;
    executionKind?: RunExecutionKind;
    parentToolId?: string;
    clientInfo?: RunClientInfo;
}
export interface Run {
    runId: string;
    toolId: string;
    tool?: Tool;
    systemIds?: string[];
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
export declare enum AgentType {
    MAIN = "main",
    PLAYGROUND = "playground",
    SYSTEM_PLAYGROUND = "system_playground",
    PLAYBOOK_PLAYGROUND = "playbook_playground",
    ACCESS_RULES = "access_rules"
}
export declare const PLAYGROUND_TOOL_DRAFT_ID = "@playground-draft";
export declare const PLAYBOOK_PLAYGROUND_DRAFT_ID = "@playground-draft";
export declare const AGENT_GLOBAL_TOOLS: readonly ["run_command", "load_skill", "visualize"];
export declare const AGENT_BASE_TOOLS: readonly ["run_command", "load_skill", "visualize", "call_system", "run_tool", "generate_report", "share_resource", "use_checklist"];
export declare const AGENT_TOOLS: Record<AgentType, string[]>;
export declare const DYNAMIC_AGENT_TOOLS: readonly ["web_search"];
export type AgentChecklistItemStatus = "pending" | "in_progress" | "done";
export interface AgentChecklistItem {
    label: string;
    status: AgentChecklistItemStatus;
}
export interface AgentChecklistState {
    title?: string;
    items: AgentChecklistItem[];
}
export declare const AGENT_CHECKLIST_MIN_ITEMS = 4;
export declare const AGENT_CHECKLIST_MAX_ITEMS = 15;
export declare const AGENT_CHECKLIST_MAX_LABEL_CHARS = 120;
export declare const SKILL_BODY_NAMES: readonly ["superglue-info", "tool-building", "tool-editing", "system-setup", "access-management", "tool-deployment", "notifications", "visualization", "playbooks"];
export type SkillBody = (typeof SKILL_BODY_NAMES)[number];
export declare const SKILL_REFERENCE_NAMES: readonly ["http", "graphql", "postgres", "mssql", "odbc", "redis", "mongodb", "sftp-smb", "file-handling", "tunnel-handling"];
export type SkillReference = (typeof SKILL_REFERENCE_NAMES)[number];
export declare const LOADABLE_MARKDOWN_NAMES: readonly ["superglue-info", "tool-building", "tool-editing", "system-setup", "access-management", "tool-deployment", "notifications", "visualization", "playbooks", "http", "graphql", "postgres", "mssql", "odbc", "redis", "mongodb", "sftp-smb", "file-handling", "tunnel-handling"];
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
export type OAuthExchangeGrantType = "authorization_code" | "client_credentials";
export type OAuthTokenDestination = "user_credentials" | "none";
export interface OAuthExchangeRequest {
    systemId: string;
    environment?: "dev" | "prod";
    grantType: OAuthExchangeGrantType;
    redirectUri: string;
    authUrl?: string;
    tokenUrl: string;
    clientId: string;
    clientSecret?: string;
    templateId?: string;
    scopes?: string;
    oauthCert?: string;
    oauthKey?: string;
    tokenAuthMethod?: "body" | "basic_auth";
    tokenContentType?: "form" | "json";
    usePKCE?: boolean;
    extraHeaders?: Record<string, string>;
    extraBodyParams?: Record<string, string>;
    tokenDestination: OAuthTokenDestination;
    returnTokens?: boolean;
    suppressErrorUI?: boolean;
    credentialUpdates?: Record<string, unknown>;
    credentialsId?: string;
}
export interface OAuthExchangeStartResponse {
    oauthExchangeId: string;
    state: string;
    authorizationUrl?: string;
    expiresAt: string;
}
export interface OAuthExchangeCompleteRequest {
    state: string;
    code?: string;
    providerError?: string;
    providerErrorDescription?: string;
}
export interface OAuthExchangeCompleteResponse {
    type: "oauth-success" | "oauth-error";
    systemId: string;
    message: string;
    tokens?: Record<string, unknown>;
    suppressErrorUI?: boolean;
    tokenDestination?: OAuthTokenDestination;
    saved?: boolean;
}
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
    system: Record<string, any> & {
        id: string;
        url: string;
        environment?: "dev" | "prod";
        specificInstructions: string;
        authentication?: SystemAuthentication;
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
        resourceGrants: ResourceGrant[];
        description?: string;
        isBaseRole?: boolean;
    };
    users: Array<{
        id: string;
        email: string | null;
        name: string | null;
    }>;
    availableTools?: Array<{
        id: string;
        name?: string;
    }>;
    availableSystems?: Array<{
        id: string;
        name?: string;
    }>;
    availableCredentials?: Array<{
        id: string;
        name?: string;
        systemId?: string;
        userId?: string;
    }>;
    availablePlaybooks?: Array<{
        id: string;
        name?: string;
    }>;
    isEditing: boolean;
};
export interface FrontendDrafts {
    tool?: DraftLookup;
    system?: SystemFrontendDraft;
    playbook?: PlaybookFrontendDraft;
    role?: Record<string, unknown>;
}
export interface TokenUsageInputDetails {
    noCacheTokens?: number;
    cacheReadTokens?: number;
    cacheWriteTokens?: number;
}
export interface TokenUsageOutputDetails {
    textTokens?: number;
    reasoningTokens?: number;
}
export interface TokenUsage {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    inputTokenDetails?: TokenUsageInputDetails;
    outputTokenDetails?: TokenUsageOutputDetails;
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
    credentialsId?: string;
    timeoutMs?: number;
}
export interface CallSystemResult {
    success: boolean;
    protocol: ConnectionProtocol;
    status?: number;
    statusText?: string;
    headers?: Record<string, string>;
    data?: any;
    error?: string;
    credentialPlaceholders?: {
        keys: string[];
        resolved: boolean;
    };
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
export interface RuntimeTimeouts {
    transform: number;
    step: number;
    http: number;
    postgres: number;
    mssql: number;
    redis: number;
    mongodb: number;
    ftp: number;
    smb: number;
    odbc: number;
    postgresConnection: number;
    mssqlConnection: number;
    redisConnection: number;
    mongodbConnection: number;
}
export type ProtocolTimeouts = Partial<RuntimeTimeouts>;
export interface OrgPreferences {
    storeRunResults?: boolean;
    showDraftRuns?: boolean;
    showSingleStepRuns?: boolean;
    membersSeeOnlyOwnRuns?: boolean;
    protocolTimeouts?: ProtocolTimeouts;
    [key: string]: unknown;
}
export interface OrgSettings {
    orgId: string;
    notifications?: NotificationSettings;
    preferences: OrgPreferences;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Credentials {
    id: string;
    name: string;
    userId: string;
    systemId: string;
    credentials?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CredentialKeyMetadata {
    key: string;
    hasValue: boolean;
}
export interface CredentialSetSummary extends Omit<Credentials, "credentials"> {
    credentialKeys: CredentialKeyMetadata[];
    missingRequiredCredentialKeys: string[];
}
export interface CreateCredentialsRequest {
    systemId: string;
    name?: string;
    credentials?: Record<string, unknown>;
    makeDefault?: boolean;
}
export interface UpdateCredentialsRequest {
    name?: string;
    credentials?: Record<string, unknown>;
    removeCredentialKeys?: string[];
}
export interface CredentialsInput {
    id?: string;
    name?: string;
    systemId: string;
    environment?: SystemEnvironment;
    credentials?: Record<string, any>;
}
export interface AccessibleCredentials extends CredentialSetSummary {
    permission: ResourcePermission;
    isOwner: boolean;
    isDefault: boolean;
    grantSource?: ResourceGrantSource;
}
export interface UserDefaultCredential {
    userId: string;
    systemId: string;
    environment: SystemEnvironment;
    credentialsId: string;
}
export type OrgTier = "trial" | "pro" | "team" | "enterprise";
export type PaidOrgTier = Extract<OrgTier, "pro" | "team" | "enterprise">;
export type SelfServeBillingTier = Extract<OrgTier, "pro" | "team">;
export type BillingCurrency = "eur" | "usd";
export type OrgFeature = "activity_tracking" | "access_control" | "organization_management" | "custom_timeouts";
export type OrgFeatureFlags = Record<OrgFeature, boolean>;
export type OrgLimitPeriod = "lifetime" | "calendar_month";
export interface OrganizationTierConfigInput {
    tokenLimitPerUser: number | null;
    tokenLimitPeriod: OrgLimitPeriod;
    runLimitPerUser: number | null;
    runLimitPeriod: OrgLimitPeriod;
    maximumConcurrentRuns: number | null;
    features: OrgFeatureFlags;
}
export interface OrganizationTierConfig extends OrganizationTierConfigInput {
    orgId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ResolvedOrganizationTierConfig extends OrganizationTierConfigInput {
    orgId: string;
    tier: OrgTier;
    createdAt?: string;
    updatedAt?: string;
}
export interface BillingStatusResponse {
    tier: OrgTier;
    canManageBilling: boolean;
    billingCurrency: BillingCurrency | null;
}
export interface BillingPlanResponse {
    tier: PaidOrgTier;
    priceLabels: Record<BillingCurrency, string | null>;
    tokenLimitPerUser: number | null;
    runLimitPerUser: number | null;
}
export interface CreateBillingCheckoutRequest {
    tier: SelfServeBillingTier;
    currency?: BillingCurrency;
    successUrl?: string;
    cancelUrl?: string;
}
export interface BillingSessionResponse {
    url: string;
}
export type RunLimitCheckResponse = {
    allowed: true;
} | {
    allowed: false;
    code: "ORG_RUN_LIMIT_EXHAUSTED";
    error: string;
    tier: OrgTier;
    orgName?: string;
    userEmail?: string;
    limit: number;
    used: number;
    resetAt: string | null;
};
export type SystemEnvironment = "dev" | "prod";
export type ResourcePermission = "viewer" | "editor";
export type ResourceGrantSource = "access_rule" | "ownership" | "share";
export type ResourceKind = "tool" | "system" | "credential" | "playbook";
export interface ResourceGrant extends BaseConfig {
    orgId?: string;
    roleId: string;
    resourceRef: string;
    permissions: ResourcePermission[];
    source: ResourceGrantSource;
    grantedByUserId?: string;
    updatedByUserId?: string;
    revokedAt?: Date;
    revokedByUserId?: string;
}
/** Flattened, read-only view of a `share`-sourced ResourceGrant for org-wide
 *  activity listing. Carries the actor + timestamp the resolved ResourceShareInfo omits. */
export interface ResourceShareListItem {
    id: string;
    resourceRef: string;
    resourceKind: ResourceKind;
    resourceId: string;
    roleId: string;
    permissions: ResourcePermission[];
    grantedByUserId?: string;
    createdAt: string;
    updatedAt?: string;
}
export interface ResourceGrantInput {
    resourceRef: string;
    permissions?: ResourcePermission[];
    source?: ResourceGrantSource;
    grantedByUserId?: string;
    updatedByUserId?: string;
}
export interface RoleResourceGrantInput {
    resourceRef: string;
    permissions?: ResourcePermission[];
}
export interface ResourceShareTargetInput {
    userId?: string;
    roleId?: string;
    permission: ResourcePermission;
}
export interface ShareResourceRequest {
    resource: {
        kind: ResourceKind;
        id: string;
    };
    targets: ResourceShareTargetInput[];
}
export interface RevokeResourceShareTargetInput {
    userId?: string;
    roleId?: string;
}
export interface UpdateResourceSharesRequest {
    resource: {
        kind: ResourceKind;
        id: string;
    };
    set?: ResourceShareTargetInput[];
    revoke?: RevokeResourceShareTargetInput[];
}
export type ShareResourceToolPermission = ResourcePermission | "none";
export interface ShareResourceToolTargetInput {
    userId?: string;
    roleId?: string;
    permission: ShareResourceToolPermission;
}
export interface ShareResourceToolInput {
    kind: ResourceKind;
    id: string;
    targets: ShareResourceToolTargetInput[];
}
export interface ResourceShareUserAccess {
    userId: string;
    name: string | null;
    email: string | null;
    isCurrentUser: boolean;
    isAdmin?: boolean;
    isOwner: boolean;
    sharePermission?: ResourcePermission;
    availablePermissions: ResourcePermission[];
    disabledReason?: string;
}
export interface ResourceShareRoleAccess {
    roleId: string;
    name: string;
    isBaseRole?: boolean;
    permission?: ResourcePermission;
    sharePermission?: ResourcePermission;
    accessRulePermission?: ResourcePermission;
    sources?: ResourceGrantSource[];
    availablePermissions?: ResourcePermission[];
    disabledReason?: string;
}
export interface ResourceShareRequiredSystem {
    id: string;
    name: string | null;
    actorCanShareViewer: boolean;
}
/** A credential set the sharing actor owns and may opt to share alongside a
 *  tool/system share (use-only viewer grant via the credential:<id> path). */
export interface ResourceShareCredentialSet {
    id: string;
    name: string | null;
    isDefault: boolean;
    keys: string[];
}
/** Per-system grouping of the actor's own shareable credential sets, surfaced so
 *  the share dialog can offer "also share my credentials for this system". */
export interface ResourceShareCredentialSystem {
    systemId: string;
    systemName: string | null;
    sets: ResourceShareCredentialSet[];
}
export interface ResourceShareTargetResult {
    userId: string;
    name: string | null;
    email: string | null;
    permission: ResourcePermission;
}
export type ResourceShareGrantResult = {
    target: "user";
    userId: string;
    name: string | null;
    email: string | null;
    resource: {
        kind: ResourceKind;
        id: string;
        name: string | null;
    };
    permission: ResourcePermission | "none";
} | {
    target: "role";
    roleId: string;
    name: string | null;
    resource: {
        kind: ResourceKind;
        id: string;
        name: string | null;
    };
    permission: ResourcePermission | "none";
};
export interface ResourceShareInfo {
    resource: {
        kind: ResourceKind;
        id: string;
        name: string | null;
        ownerUserId?: string;
    };
    actor: {
        userId?: string;
        maxPermission?: ResourcePermission;
        canShare: boolean;
        availablePermissions: ResourcePermission[];
    };
    users: ResourceShareUserAccess[];
    rolesWithAccess?: ResourceShareRoleAccess[];
    shareableRoles?: ResourceShareRoleAccess[];
    requiredSystems?: ResourceShareRequiredSystem[];
    /** Systems (the tool's required systems, or the system being shared) for which
     *  the actor owns credential sets they can optionally share. Empty/omitted when
     *  the actor owns none. */
    shareableCredentialSystems?: ResourceShareCredentialSystem[];
}
export interface ShareResourceResponse {
    success: boolean;
    resource: {
        kind: ResourceKind;
        id: string;
    };
    grants: ResourceGrant[];
    sharedUserIds: string[];
    revokedUserIds?: string[];
    sharedTargets?: ResourceShareTargetResult[];
    grantResults?: ResourceShareGrantResult[];
    requiredSystemIds?: string[];
}
export interface Role extends BaseConfig {
    name: string;
    description?: string;
    resourceGrants?: ResourceGrant[];
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
    resourceGrants?: RoleResourceGrantInput[];
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
    requiredCredentialKeys?: string[];
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
    pinnedCredentials?: Record<string, string>;
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
    pinnedCredentials?: Record<string, string>;
}
export interface PlaybookSystemRef {
    id: string;
}
export interface PlaybookToolRef {
    id: string;
}
export interface PlaybookCredentialRef {
    id: string;
}
export interface PlaybookFileRef {
    id: string;
}
export interface PlaybookFileAttachment extends PlaybookFileRef {
    name: string;
    contentType?: string;
    size?: number;
}
export interface Playbook {
    id: string;
    orgId?: string;
    name: string;
    whenToRun: string;
    inputs: string;
    systemRefs: PlaybookSystemRef[];
    toolRefs: PlaybookToolRef[];
    credentialRefs: PlaybookCredentialRef[];
    fileRefs: PlaybookFileRef[];
    instructions: string;
    completionCriteria: string;
    sourceTemplateId?: string;
    isBuiltin?: boolean;
    createdByUserId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface PlaybookInput {
    id?: string;
    name: string;
    whenToRun?: string;
    inputs?: string;
    systemRefs?: PlaybookSystemRef[];
    toolRefs?: PlaybookToolRef[];
    credentialRefs?: PlaybookCredentialRef[];
    fileRefs?: PlaybookFileRef[];
    instructions?: string;
    completionCriteria?: string;
}
export interface PlaybookWithFiles extends Omit<Playbook, "fileRefs"> {
    fileRefs: PlaybookFileAttachment[];
}
export interface PlaybookReferenceHealth {
    missingSystemIds: string[];
    missingToolIds: string[];
    missingCredentialIds: string[];
}
export interface PlaybookFileUploadInput {
    fileName: string;
    contentType?: string;
    contentLength: number;
}
export interface PlaybookFileUploadSlot extends PlaybookFileAttachment {
    uploadUrl: string;
    expiresIn: number;
}
export interface PlaybookApiRecord extends Omit<PlaybookWithFiles, "createdAt" | "updatedAt"> {
    createdAt?: string;
    updatedAt?: string;
    referenceHealth: PlaybookReferenceHealth;
}
export interface PlaybookDraftConfig {
    id?: string;
    name: string;
    whenToRun: string;
    inputs: string;
    systemRefs: PlaybookSystemRef[];
    toolRefs: PlaybookToolRef[];
    credentialRefs: PlaybookCredentialRef[];
    fileRefs: PlaybookFileAttachment[];
    instructions: string;
    completionCriteria: string;
}
export interface PlaybookFrontendDraft {
    config: PlaybookDraftConfig;
    persistedId?: string;
    isNew: boolean;
    isDirty: boolean;
    canEdit: boolean;
}
export declare const PLAYBOOK_LIMITS: {
    readonly name: 120;
    readonly whenToRun: 500;
    readonly inputs: 2000;
    readonly instructions: 8000;
    readonly completionCriteria: 2000;
    readonly systemRefs: 10;
    readonly toolRefs: 25;
    readonly credentialRefs: 10;
    readonly fileRefs: 15;
    readonly compiledRender: 24000;
};
//# sourceMappingURL=types.d.ts.map