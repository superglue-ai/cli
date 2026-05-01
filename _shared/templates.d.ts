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
        extraBodyParams?: Record<string, string>;
        usePKCE?: boolean;
    };
    keywords?: string[];
    systemSpecificInstructions?: string;
    hideInTemplatePicker?: boolean;
}
export declare const systems: Record<string, SystemConfig>;
export declare const systemOptions: {
    value: string;
    label: string;
    icon: string;
}[];
export declare function findTemplateForSystem(system: Partial<System>): {
    key: string;
    template: SystemConfig;
} | null;
export declare function uniqueKeywords(keywords: string[] | undefined): string[];
export declare function enrichWithTemplate(input: System): System;
export declare function getOAuthConfig(systemKey: string): SystemConfig["oauth"] | null;
export declare function getOAuthTokenExchangeConfig(system: System): {
    tokenAuthMethod?: "body" | "basic_auth";
    tokenContentType?: "form" | "json";
    extraHeaders?: Record<string, string>;
    extraBodyParams?: Record<string, string>;
};
export declare function getOAuthTokenUrl(system: System): string;
//# sourceMappingURL=templates.d.ts.map