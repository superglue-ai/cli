import type { CredentialOwnership } from "./types.js";
export type AuthenticationType = "none" | "api_key" | "basic_auth" | "oauth2" | "connection_string";
export type SystemAuthentication = {
    type: "none";
    config?: Record<string, unknown>;
} | {
    type: "api_key";
    config?: Record<string, unknown>;
} | {
    type: "basic_auth";
    config?: Record<string, unknown>;
} | {
    type: "oauth2";
    grantType?: "authorization_code" | "client_credentials" | "password" | "service_account" | "custom";
    authUrl?: string;
    tokenUrl?: string;
    scopes?: string[];
    clientId?: string;
    clientSecret?: string;
    config?: Record<string, unknown>;
} | {
    type: "connection_string";
    protocol?: "postgres" | "redis" | "sftp" | "smb" | "sqlserver" | "odbc" | "custom";
    config?: Record<string, unknown>;
};
export type AuthenticationSecureInputField = "clientId" | "clientSecret";
export type AuthenticationEditorField = {
    path: string;
    label: string;
    value?: unknown;
};
export type AuthenticationEditorModel = {
    type: AuthenticationType;
    authentication: SystemAuthentication;
    configFields: AuthenticationEditorField[];
    hiddenCredentialKeys: string[];
};
export type ResolvedCredentialEntry = {
    key: string;
    value: string;
    description?: string;
    placeholder?: string;
    isReservedMasked: boolean;
    isKeyLocked?: boolean;
};
export declare const OAUTH_CONFIG_CREDENTIAL_KEYS: readonly ["auth_url", "authUrl", "token_url", "tokenUrl", "token_uri", "scopes", "scope", "grant_type", "grantType", "client_id", "clientId", "client_secret", "clientSecret", "tokenAuthMethod", "tokenContentType", "usePKCE", "extraHeaders", "extraBodyParams"];
export declare function hasMeaningfulValue(value: unknown): boolean;
export declare function stringValue(value: unknown): string | undefined;
export type OAuthExecutableGrantType = "authorization_code" | "client_credentials";
export type OAuthConnectionValidationInput = Record<string, unknown> & {
    hasServerSideClientSecret?: boolean;
};
export type OAuthConnectionValidationResult = {
    grantType: OAuthExecutableGrantType;
    hasAccessToken: boolean;
    hasCertificateCredentials: boolean;
    isReadyToConnect: boolean;
    missingFields: string[];
    usePKCE: boolean;
};
export declare function validateOAuthConnection(input: OAuthConnectionValidationInput | undefined): OAuthConnectionValidationResult;
export declare function formatOAuthConnectionDisabledReason(status: Pick<OAuthConnectionValidationResult, "isReadyToConnect" | "missingFields"> | null): string | null;
export declare function objectValue(value: unknown): Record<string, unknown> | undefined;
export declare function parseScopes(value: unknown): string[] | undefined;
export declare function normalizeGrantType(value: unknown): Extract<SystemAuthentication, {
    type: "oauth2";
}>["grantType"];
export declare function normalizeSystemAuthentication(authentication: SystemAuthentication | undefined): SystemAuthentication | undefined;
export declare function getAuthenticationConfigCredentialKeys(authentication: SystemAuthentication | undefined): string[];
export declare function buildAuthenticationEditorModel({ authentication, }: {
    authentication: SystemAuthentication | undefined;
    credentials?: Record<string, unknown>;
}): AuthenticationEditorModel;
export declare function updateAuthenticationEditorField({ authentication, path, value, }: {
    authentication: SystemAuthentication;
    path: string;
    value: unknown;
}): SystemAuthentication;
export declare function getAuthenticationSecureInputFieldLabel(field: AuthenticationSecureInputField): string;
export declare function getAuthenticationSecureInputValue({ field, values, }: {
    field: AuthenticationSecureInputField;
    values?: Record<string, unknown> | null;
}): string | undefined;
export declare function getBlankAuthenticationSecureInputFields(authentication: unknown): AuthenticationSecureInputField[];
export declare function getMissingAuthenticationSecureInputFields({ authentication, userProvidedAuthentication, }: {
    authentication: unknown;
    userProvidedAuthentication?: Record<string, unknown> | null;
}): AuthenticationSecureInputField[];
export declare function applyAuthenticationSecureInputValues({ authentication, userProvidedAuthentication, }: {
    authentication: unknown;
    userProvidedAuthentication?: Record<string, unknown> | null;
}): unknown;
export declare function validateOAuthAuthenticationConfigPlacement({ authentication, credentials, }: {
    authentication: unknown;
    credentials: unknown;
}): string | null;
export declare function authenticationToLegacyCredentials(authentication: SystemAuthentication | undefined): Record<string, unknown>;
export declare function getSuggestedUserCredentialKeys({ authentication, creatorCredentials, credentialCandidates, }: {
    authentication: SystemAuthentication | undefined;
    creatorCredentials?: Record<string, unknown> | null;
    credentialCandidates?: Array<Record<string, unknown> | null | undefined>;
}): string[];
export declare function buildRuntimeCredentialsFromAuthentication({ authentication, credentials, }: {
    authentication?: SystemAuthentication;
    credentials?: Record<string, unknown>;
}): Record<string, unknown>;
export declare function resolveOAuthConfigFromAuthentication({ input, authentication, templateOAuth, }: {
    input?: Record<string, unknown>;
    authentication?: SystemAuthentication;
    templateOAuth?: Record<string, unknown>;
}): Record<string, unknown>;
export declare function toCredentialInputValue(value: unknown): string;
export declare function getCredentialEntries(credentials: Record<string, any>, options?: {
    maskAll?: boolean;
    hiddenKeys?: string[];
}): ResolvedCredentialEntry[];
export declare function getCredentialInputValues(credentials: Record<string, unknown>): Record<string, string>;
export declare function getSuggestedCredentialInputValues(system: {
    suggestedCredentialKeys?: string[];
}): Record<string, string>;
export declare function getCredentialDisplayHiddenKeys({ hideOAuthFiles, configKeys, }: {
    hideOAuthFiles?: boolean;
    configKeys?: string[];
}): string[];
export declare function hasOAuthTokenCredentials(credentials: Record<string, unknown>): boolean;
export declare function getOAuthExpiryText(credentials: Record<string, unknown>): string | null;
export declare function normalizeSystemCredentialOwnershipInput({ credentialOwnership, }: {
    credentialOwnership?: unknown;
}): CredentialOwnership | undefined;
export declare function hasRuntimeCredentialValues(credentials: unknown): boolean;
export declare function validateCredentialObjectKeys(credentials: unknown): string | null;
export declare function validateCredentialKeyList(keys: string[]): string | null;
export declare function applyConfirmedSystemAuthenticationInput({ authentication, credentials, userProvidedAuthentication, requireSecureInputs, }: {
    authentication: unknown;
    credentials: unknown;
    userProvidedAuthentication?: Record<string, unknown> | null;
    requireSecureInputs?: boolean;
}): {
    authentication: unknown;
    error?: string;
};
//# sourceMappingURL=authentication.d.ts.map