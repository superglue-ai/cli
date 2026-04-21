import { System } from "./types";
import { ConnectionFieldDef } from "./utils";
export interface SystemConfig {
    name: string;
    apiUrl: string;
    regex: string;
    icon: string;
    docsUrl: string;
    openApiUrl?: string;
    openApiSchema?: string;
    preferredAuthType?: "oauth" | "apikey" | "basic" | "none" | "connection_string";
    connectionFields?: ConnectionFieldDef[];
    oauth?: {
        authUrl?: string;
        tokenUrl?: string;
        scopes?: string;
        client_id?: string;
        grant_type?: "authorization_code" | "client_credentials";
        tokenAuthMethod?: "body" | "basic_auth";
        tokenContentType?: "form" | "json";
        extraHeaders?: Record<string, string>;
        usePKCE?: boolean;
    };
    keywords?: string[];
    systemSpecificInstructions?: string;
}
export declare const systems: Record<string, SystemConfig>;
export declare const systemOptions: {
    value: string;
    label: string;
    icon: string;
}[];
/**
 * Find matching template for a System object.
 * Priority order: templateName > id > id with numeric suffix stripped > name > urlHost regex match
 * @param system - System object with templateName, id, name, and/or url
 * @returns The matching template key and config, or null if no match found
 */
export declare function findTemplateForSystem(system: Partial<System>): {
    key: string;
    template: SystemConfig;
} | null;
export declare function uniqueKeywords(keywords: string[] | undefined): string[];
export declare function enrichWithTemplate(input: System): System;
/**
 * Get OAuth configuration for a system
 * @param systemKey - The key of the system
 * @returns OAuth config or null if not available
 */
export declare function getOAuthConfig(systemKey: string): SystemConfig["oauth"] | null;
/**
 * Get OAuth token exchange configuration for a system
 * Priority: system credentials > template config > defaults
 * @param system - The system object
 * @returns Token exchange config
 */
export declare function getOAuthTokenExchangeConfig(system: System): {
    tokenAuthMethod?: "body" | "basic_auth";
    tokenContentType?: "form" | "json";
    extraHeaders?: Record<string, string>;
};
/**
 * Get OAuth token URL for a system
 * @param system - The system object with credentials and URL info
 * @returns The token URL for OAuth token exchange
 */
export declare function getOAuthTokenUrl(system: System): string;
//# sourceMappingURL=templates.d.ts.map