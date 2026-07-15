export type RawDeploymentEnvironment = Record<string, string | undefined>;
export type ProviderSwitch<TConfig> = {
    enabled: false;
} | ({
    enabled: true;
} & TConfig);
export type DeploymentMode = "cloud" | "enterprise";
export type OrgConcurrencyLimits = "tier_config" | "disabled";
export type SchedulerConfig = {
    mode: "disabled";
} | {
    mode: "in_process";
} | {
    mode: "remote";
    url: string;
};
export type PostgresConfig = {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl: boolean;
};
export type AwsObjectStorageConfig = {
    provider: "aws";
    region: string;
    bucketName: string;
    bucketPrefix: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    sessionToken?: string;
};
export type MinioObjectStorageConfig = {
    provider: "minio";
    endpoint: string;
    publicEndpoint: string | null;
    bucketName: string;
    bucketPrefix: string;
    accessKeyId: string;
    secretAccessKey: string;
};
export type ObjectStorageConfig = AwsObjectStorageConfig | MinioObjectStorageConfig;
export type LlmProviderConfig = {
    provider: "openai";
    apiKey: string;
    model: string;
    baseUrl?: string;
} | {
    provider: "anthropic";
    apiKey: string;
    model: string;
    baseUrl?: string;
} | {
    provider: "gemini";
    apiKey: string;
    model: string;
    baseUrl?: string;
} | {
    provider: "azure";
    apiKey: string;
    model: string;
    resourceName?: string;
    baseUrl?: string;
    apiVersion?: string;
    useDeploymentBasedUrls: boolean;
} | {
    provider: "bedrock";
    model: string;
    region: string;
    baseUrl?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    sessionToken?: string;
} | {
    provider: "vertex";
    model: string;
    project?: string;
    location?: string;
    auth: {
        type: "api_key";
        apiKey: string;
    } | {
        type: "service_account";
        clientEmail: string;
        privateKey: string;
    } | {
        type: "credentials_file";
        path: string;
    };
};
export type NativeWebSearchLlmProvider = "openai" | "anthropic" | "azure";
export type WebSearchConfig = {
    provider: "disabled";
} | {
    provider: "model_provider";
    llmProvider: NativeWebSearchLlmProvider;
} | {
    provider: "tavily";
    apiKey: string;
} | {
    provider: "searxng";
    endpoint: string;
    apiKey?: string;
};
export type StripeProductTier = "pro" | "team" | "enterprise";
export type StripeProductIds = Record<StripeProductTier, string>;
export type BillingConfig = {
    provider: "disabled";
} | {
    provider: "stripe";
    secretKey: string;
    webhookSecret: string | null;
    productIds: StripeProductIds;
};
export type OAuthProviderConfig = {
    clientId: string;
    clientSecret: string;
};
export type PostHogConfig = {
    apiKey: string;
    serverHost: string;
};
export type LangfuseConfig = {
    publicKey: string;
    secretKey: string;
    baseUrl: string;
    tracingEnvironment: string;
};
export type ResendConfig = {
    apiKey: string;
    fromEmail: string;
};
export type LoopsConfig = {
    apiKey: string;
};
export type AuthProviderConfig = {
    provider: "email_password";
} | ({
    provider: "google";
} & OAuthProviderConfig) | ({
    provider: "github";
} & OAuthProviderConfig) | ({
    provider: "okta";
    issuer: string;
    organizationId: string;
} & OAuthProviderConfig);
export type AuthProviderName = AuthProviderConfig["provider"];
export type SuperglueDeploymentConfig = {
    deployment: {
        mode: DeploymentMode;
        orgConcurrencyLimits: OrgConcurrencyLimits;
    };
    runtime: {
        apiPort: number;
        webPort: number;
        publicApiUrl: string;
        internalApiUrl: string;
        publicAppUrl: string;
        internalAppUrl: string;
        scheduler: SchedulerConfig;
    };
    website: {
        contactFormToEmail: string | null;
    };
    security: {
        jwtSecret: string;
        internalApiToken: string;
        credentialsEncryptionKey: string;
        blockLocalRequests: boolean;
    };
    storage: {
        postgres: PostgresConfig;
        objectStorage: ObjectStorageConfig;
    };
    llm: {
        primary: LlmProviderConfig;
        summarize: LlmProviderConfig;
    };
    externalProviders: {
        posthog: ProviderSwitch<PostHogConfig>;
        langfuse: ProviderSwitch<LangfuseConfig>;
        resend: ProviderSwitch<ResendConfig>;
        loops: ProviderSwitch<LoopsConfig>;
        webSearch: WebSearchConfig;
    };
    billing: BillingConfig;
    auth: {
        providers: AuthProviderConfig[];
        visibleProviders: AuthProviderName[];
        disableSignup: boolean;
        disableInvites: boolean;
    };
};
export type DeploymentConfigIssue = {
    path: string;
    message: string;
};
//# sourceMappingURL=types.d.ts.map