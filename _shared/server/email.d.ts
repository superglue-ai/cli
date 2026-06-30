export type SharedResendEmailConfig = {
    enabled: false;
} | {
    enabled: true;
    apiKey: string;
    fromEmail: string;
};
export interface SendResendEmailParams {
    resend: SharedResendEmailConfig;
    to: string;
    subject: string;
    html: string;
    from?: string;
}
export declare function sendResendEmail(params: SendResendEmailParams): Promise<{
    success: boolean;
    error?: string;
}>;
//# sourceMappingURL=email.d.ts.map