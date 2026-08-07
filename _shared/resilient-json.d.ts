export interface ParseOptions {
    attemptRepair?: boolean;
    maxDepth?: number;
    preserveStringsOnFailure?: boolean;
    customStrategies?: RepairStrategy[];
    logRepairs?: boolean;
}
export interface ParseResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    repairs?: string[];
    metadata?: {
        parseTime?: number;
        strategiesApplied?: string[];
        depth?: number;
    };
}
export declare abstract class RepairStrategy {
    abstract name: string;
    abstract description: string;
    abstract canApply(input: string): boolean;
    abstract apply(input: string): string;
    validate?(repaired: string): boolean;
}
declare class TripleQuoteStrategy extends RepairStrategy {
    name: string;
    description: string;
    canApply(input: string): boolean;
    apply(input: string): string;
}
declare class PythonLiteralStrategy extends RepairStrategy {
    name: string;
    description: string;
    canApply(input: string): boolean;
    apply(input: string): string;
}
declare class TrailingCommaStrategy extends RepairStrategy {
    name: string;
    description: string;
    canApply(input: string): boolean;
    apply(input: string): string;
}
declare class SingleQuoteStrategy extends RepairStrategy {
    name: string;
    description: string;
    canApply(input: string): boolean;
    apply(input: string): string;
}
declare class UnquotedKeyStrategy extends RepairStrategy {
    name: string;
    description: string;
    canApply(input: string): boolean;
    apply(input: string): string;
}
declare class CommentStrategy extends RepairStrategy {
    name: string;
    description: string;
    canApply(input: string): boolean;
    apply(input: string): string;
}
export declare class ResilientJsonParser {
    private strategies;
    private options;
    private repairLog;
    constructor(options?: ParseOptions);
    private initializeDefaultStrategies;
    parse<T = any>(input: string | Buffer): ParseResult<T>;
    private aggressiveFallback;
    addStrategy(strategy: RepairStrategy): void;
    removeStrategy(name: string): void;
    getStrategies(): string[];
}
export declare function parseJsonResilient<T = any>(input: string | Buffer, options?: ParseOptions): ParseResult<T>;
export declare function parseJSON(input: Buffer | string): any;
export declare function isValidJson(jsonString: string): boolean;
export declare function prettyPrintJson(data: any, indent?: number): string;
export declare function minifyJson(jsonString: string): string;
export { CommentStrategy, PythonLiteralStrategy, SingleQuoteStrategy, TrailingCommaStrategy, TripleQuoteStrategy, UnquotedKeyStrategy, };
//# sourceMappingURL=resilient-json.d.ts.map