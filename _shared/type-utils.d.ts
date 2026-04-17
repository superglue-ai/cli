export declare const PAGINATION_TYPE_MAP: Record<string, string>;
export declare function mapPaginationType(internalType?: string): string;
export declare function mapFailureBehavior(internal?: string): "fail" | "continue" | undefined;
export declare function validateToolStructure(tool: unknown): {
    valid: true;
} | {
    valid: false;
    error: string;
};
//# sourceMappingURL=type-utils.d.ts.map