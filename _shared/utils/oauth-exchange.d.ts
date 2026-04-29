export declare function parseJsonRecord(val: unknown): Record<string, string> | undefined;
export interface TokenExchangeConfig {
    tokenAuthMethod?: "body" | "basic_auth";
    tokenContentType?: "form" | "json";
    extraHeaders?: Record<string, string>;
    extraBodyParams?: Record<string, string>;
}
export interface TokenExchangeRequest {
    url: string;
    headers: Record<string, string>;
    body: string;
}
export declare function buildAuthCodeExchangeRequest(params: {
    tokenUrl: string;
    clientId: string;
    clientSecret: string;
    code: string;
    redirectUri: string;
    config?: TokenExchangeConfig;
    codeVerifier?: string;
}): TokenExchangeRequest;
export declare function buildClientCredentialsExchangeRequest(params: {
    tokenUrl: string;
    clientId: string;
    clientSecret?: string;
    scopes?: string;
    config?: TokenExchangeConfig;
}): TokenExchangeRequest;
export declare function buildRefreshTokenExchangeRequest(params: {
    tokenUrl: string;
    clientId: string;
    clientSecret?: string;
    refreshToken: string;
    config?: TokenExchangeConfig;
}): TokenExchangeRequest;
//# sourceMappingURL=oauth-exchange.d.ts.map