export interface ValidateEmailOptions {
    skipRoleCheck?: boolean;
}
export declare function isValidEmail(email: string): boolean;
export declare function validateEmailForSignup(email: string, options?: ValidateEmailOptions): string | null;
//# sourceMappingURL=email-validator.d.ts.map