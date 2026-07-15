export declare function emailTemplate({ body }: {
    body: string;
}): string;
export declare function buildPasswordResetEmail({ url }: {
    url: string;
}): string;
export declare function buildOrgInvitationEmail(params: {
    orgName: string;
    inviteUrl: string;
}): string;
export declare function buildEmailVerificationEmail(params: {
    url: string;
}): string;
export declare function buildOrgLoginEmail(params: {
    orgName: string;
    loginUrl: string;
}): string;
//# sourceMappingURL=email-templates.d.ts.map