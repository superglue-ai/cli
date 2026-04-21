/**
 * Encrypt API key for CLI OAuth state.
 * Uses AES-256-GCM for authenticated encryption.
 * Key is derived from MASTER_ENCRYPTION_KEY + systemId to ensure:
 * 1. The encrypted value cannot be decrypted without server-side secret
 * 2. The encrypted value is only valid for that specific system
 *
 * @param secret - Server-side secret (MASTER_ENCRYPTION_KEY)
 */
export declare function encryptCliApiKey(apiKey: string, systemId: string, secret: string): string;
/**
 * Decrypt API key from CLI OAuth state.
 * Returns null if decryption or authentication fails.
 *
 * @param secret - Server-side secret (MASTER_ENCRYPTION_KEY)
 */
export declare function decryptCliApiKey(encrypted: string, systemId: string, secret: string): string | null;
//# sourceMappingURL=cli-oauth.d.ts.map