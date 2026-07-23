export type AuthenticationType = "none" | "api_key" | "basic_auth" | "oauth2" | "connection_string";
export type OAuthClientMode = "managed" | "custom";
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
    oauthClientMode?: OAuthClientMode;
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
export declare const OAUTH_CONFIG_CREDENTIAL_KEYS: readonly ["auth_url", "authUrl", "token_url", "tokenUrl", "token_uri", "scopes", "scope", "grant_type", "grantType", "oauthClientMode", "client_id", "clientId", "client_secret", "clientSecret", "tokenAuthMethod", "tokenContentType", "usePKCE", "extraHeaders", "extraBodyParams"];
export declare function hasMeaningfulValue(value: unknown): boolean;
export declare function stringValue(value: unknown): string | undefined;
export type OAuthExecutableGrantType = "authorization_code" | "client_credentials";
export type OAuthConnectionValidationInput = Record<string, unknown> & {
    hasServerSideClientSecret?: boolean;
    hasServerSideCertificateCredentials?: boolean;
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
export declare function normalizeOAuthClientMode(value: unknown): OAuthClientMode | undefined;
export declare function normalizeSystemAuthentication(authentication: SystemAuthentication | undefined): SystemAuthentication | undefined;
export declare function resolveOAuthClientMode({ authentication, templateClientId, }: {
    authentication: SystemAuthentication | undefined;
    templateClientId: string | undefined;
}): OAuthClientMode;
/**
 * Flattens the persisted nested `SystemAuthentication` into the flat shape the
 * create_system / edit_system `auth` input accepts: protocol/OAuth knobs stored
 * under `config` are hoisted to the top level and the `config` key is dropped,
 * and `scopes` is emitted as a space-separated string. This keeps the agent's
 * READ surface (tool returns, VFS configs) identical to its WRITE surface, so it
 * can round-trip auth without ever needing to send `auth.config`.
 */
export declare function flattenSystemAuthentication(authentication: SystemAuthentication | undefined): Record<string, unknown> | undefined;
/**
 * Flattens auth into the create_system/edit_system input shape (see
 * {@link flattenSystemAuthentication}) and masks any sensitive values (e.g. the
 * OAuth client secret), recursively so nested header/body bags are covered too.
 * This is the single read-surface projection used by tool returns and the VFS.
 */
export declare function maskedFlatSystemAuthentication(authentication: SystemAuthentication | undefined): Record<string, unknown> | undefined;
export declare function isMaskedSecretValue(value: unknown): boolean;
export declare function maskSystemAuthenticationForResponse(authentication: SystemAuthentication | undefined): SystemAuthentication | undefined;
export declare function restoreMaskedClientSecret({ incoming, existing, }: {
    incoming: SystemAuthentication | undefined;
    existing: SystemAuthentication | undefined;
}): SystemAuthentication | undefined;
export declare function mapAgentAuthInput(auth: unknown): {
    authentication?: SystemAuthentication;
    error?: string;
};
export declare function mergeAgentAuthInput(existing: SystemAuthentication | undefined, patchInput: unknown): SystemAuthentication;
export declare function getAuthenticationConfigCredentialKeys(authentication: SystemAuthentication | undefined): string[];
export declare function buildAuthenticationEditorModel({ authentication, }: {
    authentication: SystemAuthentication | undefined;
    credentials?: Record<string, unknown>;
}): AuthenticationEditorModel;
export type CredentialField = {
    key: string;
    aliases?: string[];
};
export type CredentialRequirement = {
    type: "field";
    field: CredentialField;
    optional?: boolean;
} | {
    type: "oneOf";
    fields: CredentialField[];
    optional?: boolean;
};
/**
 * Structured credential requirements for a system, deduced from connection-string
 * protocols where the runtime reads exact key names. Expresses either/or auth
 * (password vs privateKey) and key aliases (username vs user) the flat suggested
 * list cannot. Non-connection auth types resolve credentials via user templates,
 * so they have no protocol requirements (returns []).
 */
export declare function getCredentialRequirements(authentication: SystemAuthentication | undefined): CredentialRequirement[];
export declare function isCredentialRequirementSatisfied(requirement: CredentialRequirement, credentials: Record<string, unknown>): boolean;
export declare function hasUnsatisfiedCredentialRequirements(requirements: CredentialRequirement[], credentials: Record<string, unknown> | undefined): boolean;
export declare function updateAuthenticationEditorField({ authentication, path, value, }: {
    authentication: SystemAuthentication;
    path: string;
    value: unknown;
}): SystemAuthentication;
export declare function validateOAuthAuthenticationConfigPlacement({ authentication, credentials, }: {
    authentication: unknown;
    credentials: unknown;
}): string | null;
export declare function authenticationToLegacyCredentials(authentication: SystemAuthentication | undefined): Record<string, unknown>;
export declare function isRuntimeCredentialMetadataKey(key: string): boolean;
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
export declare function getCredentialDisplayHiddenKeys({ hideOAuthFiles, configKeys, }: {
    hideOAuthFiles?: boolean;
    configKeys?: string[];
}): string[];
export declare function hasOAuthTokenCredentials(credentials: Record<string, unknown>): boolean;
export declare function getOAuthExpiryText(credentials: Record<string, unknown>): string | null;
export declare function hasRuntimeCredentialValues(credentials: unknown): boolean;
export declare function validateCredentialObjectKeys(credentials: unknown): string | null;
export declare function validateCredentialKeyList(keys: string[]): string | null;
export declare function normalizeAskForUserInputs(value: unknown): string[];
export declare function validateSystemInputCollection({ credentials, askForUserInputs, }: {
    credentials: unknown;
    askForUserInputs?: unknown;
}): string | null;
export declare function mapOAuthMissingFieldsForAgent(missingFields: string[]): string[];
export declare function validateOAuthAuthenticationAndCredentialInputs({ authentication, credentials, }: {
    authentication: SystemAuthentication | undefined;
    credentials: unknown;
}): string | null;
//# sourceMappingURL=authentication.d.ts.map