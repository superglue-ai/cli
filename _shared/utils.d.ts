import { System } from "./types.js";
import { PatchSystemBody } from "./types.js";
import { Tool } from "./types.js";
export * from "./utils/cron.js";
export * from "./utils/model-context-length.js";
export * from "./utils/token-count.js";
export type ConnectionProtocol = "http" | "postgres" | "mssql" | "redis" | "sftp" | "smb";
export declare function inferProtocolFromUrl(url: string): ConnectionProtocol;
export declare function isReadOnlyCallSystem(input: {
    protocol?: ConnectionProtocol;
    method?: string;
    url?: string;
    body?: any;
}): boolean;
export declare function isAbortError(error: unknown): boolean;
export declare const ALLOWED_FILE_EXTENSIONS: readonly [".json", ".csv", ".txt", ".xml", ".xlsx", ".xls", ".pdf", ".docx", ".zip", ".gz", ".yaml", ".yml", ".py", ".ts", ".tsx", ".js", ".jsx", ".java", ".go", ".rs", ".rb", ".php", ".c", ".cpp", ".h", ".hpp", ".cs", ".swift", ".kt", ".scala", ".sh", ".bash", ".sql", ".html", ".css", ".scss", ".md", ".rst"];
type ParsedToolInputSchema = {
    rawSchema: any | null;
    payloadSchema: any | null;
    filesSchema: any | null;
    credentialsSchema: any | null;
    hasNestedSections: boolean;
};
export declare function getToolInputSchemaSections(schema: any): ParsedToolInputSchema;
export declare function buildToolInputSchemaSections({ payloadSchema, filesSchema, }: {
    payloadSchema?: any | null;
    filesSchema?: any | null;
}): any | undefined;
export declare function flattenAndNamespaceCredentials(systems: System[]): Record<string, string>;
export declare function flattenAndNamespaceSystemUrls(systems: System[]): Record<string, string>;
export declare function slugify(value: string): string;
export declare function generateUniqueId({ baseId, exists, }: {
    baseId: string;
    exists: (id: string) => Promise<boolean> | boolean;
}): Promise<string>;
interface SystemGetter {
    getSystem(id: string): Promise<System | null>;
    getManySystems?(ids: string[]): Promise<System[]>;
}
export declare function waitForSystemProcessing(systemGetter: SystemGetter, systemIds: string[], timeoutMs?: number): Promise<System[]>;
/**
 * Infer JSON Schema from data with smart sampling for arrays
 *
 * For small arrays (≤100 items): analyzes all items
 * For large arrays (>100 items): uses head/tail/reservoir sampling
 * For heterogeneous arrays: detects up to 10 unique structures and uses oneOf
 *
 * @param data - The data to infer schema from
 * @returns JSON Schema object
 */
export declare function inferJsonSchema(data: any): any;
export declare function resolveOAuthCertAndKey(oauthCert: string, oauthKey: string): {
    cert: {
        content: string;
        filename: string;
    };
    key: {
        content: string;
        filename: string;
    };
};
/**
 * Ensures code is wrapped as a valid arrow function with sourceData parameter.
 *
 * Special cases:
 * - Empty/null/undefined → returns `(sourceData) => { return {}; }` (for loopSelector - execute once with empty object)
 * - `$` → returns `(sourceData) => { return sourceData; }` (identity transform)
 * - Valid arrow function → returns as-is
 * - Raw code → wraps in arrow function
 */
export declare function isArrowFunction(code: string | undefined | null): boolean;
export declare function assertValidArrowFunction(code: string | undefined | null): string;
export declare function normalizeCredentialKey(key: string): string;
export declare const isSensitiveCredentialKey: (key: string) => boolean;
export declare const maskCredentialValue: (key: string, value: any) => string;
export declare function isMaskedValue(value: any): boolean;
export declare function mergeCredentials(incoming: Record<string, any> | null | undefined, existing: Record<string, any> | null | undefined): Record<string, any>;
export declare function maskCredentials(message: string, credentials?: Record<string, string>): string;
export declare function sampleResultObject(value: any, sampleSize?: number, seen?: WeakSet<object>): any;
export declare function safeStringify(value: any, indent?: number): string;
/**
 * Truncates a value for use in LLM prompts.
 * Uses sampleResultObject to intelligently sample large arrays/objects first,
 * then applies a hard character limit as a safety net.
 * Returns a string suitable for embedding in prompts.
 */
export declare function truncateForLLM(value: unknown, maxChars?: number, sampleSize?: number): string;
export declare function getDateMessage(): {
    role: "system";
    content: string;
};
export type IconSource = "simpleicons" | "lucide";
export interface ParsedIcon {
    source: IconSource;
    name: string;
}
/**
 * Parse an icon string into its source and name components.
 * Supports formats:
 * - "simpleicons:salesforce" -> { source: "simpleicons", name: "salesforce" }
 * - "lucide:database" -> { source: "lucide", name: "database" }
 * - "salesforce" -> { source: "simpleicons", name: "salesforce" } (backwards compat)
 */
export declare function parseIconString(icon: string | null | undefined): ParsedIcon | null;
/**
 * Serialize an icon object into a storable string format.
 * @param icon - Object with name and source, or a simple string name
 * @returns Serialized icon string in "source:name" format
 */
export declare function serializeIcon(icon: {
    name: string;
    source: IconSource;
} | string | null | undefined): string | null;
export declare function normalizeToolDiff<T extends {
    op: string;
    path: string;
    value?: any;
}>(diff: T): T;
export declare function normalizeToolDiffs<T extends {
    op: string;
    path: string;
    value?: any;
}>(diffs: T[]): T[];
export declare function composeUrl(host: string, path: string): string;
export type SystemAuthType = "none" | "oauth" | "apikey" | "connection_string";
export interface ConnectionFieldDef {
    key: string;
    label: string;
    placeholder?: string;
    type?: "text" | "password" | "number";
    required?: boolean;
    defaultValue?: string;
}
/**
 * Detect the authentication type from system credentials
 */
export declare const detectSystemAuthType: (credentials: Record<string, any> | undefined, options?: {
    url?: string;
    templateName?: string;
}) => SystemAuthType;
export declare const ALLOWED_PATCH_SYSTEM_FIELDS: (keyof PatchSystemBody)[];
export declare function truncateRunResult(result: unknown, maxLength?: number): unknown;
export declare function getToolSystemIds(tool: Tool): string[];
export declare function isProductionSystem(system: System): boolean;
//# sourceMappingURL=utils.d.ts.map