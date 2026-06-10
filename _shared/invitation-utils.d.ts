export type OrganizationInviteRole = "member" | "admin";
export type InviteRole = OrganizationInviteRole;
export type InviteDialogMode = "rows" | "csv";
export interface InviteRow {
    id: string;
    name: string;
    email: string;
    role: InviteRole;
}
export interface InviteValidationResult {
    invitations: Array<{
        email: string;
        role: InviteRole;
    }>;
    invalidEmails: string[];
    duplicateEmails: string[];
    incompleteRows: number;
}
export interface CsvInviteValidationResult {
    invitations: Array<{
        email: string;
        role: InviteRole;
    }>;
    rows: InviteRow[];
    errors: string[];
}
export declare const DEFAULT_CSV_INVITE_VALUE = "";
export declare const ADD_VALID_INVITE_MESSAGE = "Add at least one valid invite.";
export declare function normalizeInvitationEmail(email: string): string;
export declare function isValidInvitationEmail(email: string): boolean;
export declare function isOrganizationInviteRole(role: string): role is OrganizationInviteRole;
export declare function parseOrganizationInviteRole(role?: string | null): OrganizationInviteRole | null;
export declare function getInvitationTimestamp(value?: string | null): number;
export declare function createInviteRow(id: string): InviteRow;
export declare function isInviteRowEmpty(row: InviteRow): boolean;
export declare function isInviteRowEmailInvalid(row: InviteRow, rows: InviteRow[]): boolean;
export declare function validateInviteRows(rows: InviteRow[]): InviteValidationResult;
export declare function getInviteValidationMessage(validation: InviteValidationResult): string | null;
export declare function formatCsvInviteRows(rows: InviteRow[]): string;
export declare function validateCsvInviteText(value: string, createId: () => string): CsvInviteValidationResult;
export declare function getInviteRowsForInvitations(rows: InviteRow[], invitations: Array<{
    email: string;
    role: InviteRole;
}>): InviteRow[];
export declare function getInviteRowsForEmails(rows: InviteRow[], emails: string[]): InviteRow[];
export declare function mapInvitationsToRows(invitations: Array<{
    email: string;
    role: InviteRole;
}>, createId: () => string): InviteRow[];
export declare function formatEmailList(emails: string[]): string;
export declare function isStaleInvitationError(error: unknown): boolean;
//# sourceMappingURL=invitation-utils.d.ts.map