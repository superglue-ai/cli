export declare const SG_OUTBOUND_IDENTITY_TOKEN_USE = "sg_outbound_identity";
export declare const OUTBOUND_JWT_TTL_SECONDS = 3600;
export declare const OUTBOUND_JWKS_ROUTE_PATH = "/api/auth/outbound-jwks";
export declare const OUTBOUND_JWT_KID = "sg-outbound-identity-v1";
export declare function deriveOutboundJwtSigningKey(jwtSecret: string): Promise<CryptoKey>;
export declare function getOutboundJwtPublicJwk(jwtSecret: string): Promise<JsonWebKey>;
//# sourceMappingURL=outbound-identity.d.ts.map