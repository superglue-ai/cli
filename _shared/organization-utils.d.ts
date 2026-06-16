export declare const ORG_NAME_MAX_LENGTH = 20;
export interface OrgNameValidation {
    valid: boolean;
    /** The trimmed name. Only meaningful to persist when `valid` is true. */
    name: string;
    error?: string;
}
/**
 * Validate an organization name for both the API and the UI so the rules stay in one place.
 */
export declare function validateOrgName(rawName: unknown): OrgNameValidation;
//# sourceMappingURL=organization-utils.d.ts.map