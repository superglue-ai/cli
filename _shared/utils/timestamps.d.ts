export type TimestampInput = Date | string | number;
export type TimestampValue = TimestampInput | null | undefined;
export declare function parseUTCDate(value: unknown): Date | undefined;
export declare function requireUTCDate(value: unknown, fieldName?: string): Date;
export declare function toUTCISOString(value: unknown, fieldName?: string): string;
export declare function toOptionalUTCISOString(value: unknown, fieldName?: string): string | undefined;
export declare function utcNow(): Date;
export declare function utcNowISOString(): string;
export declare function getUTCTimestampMs(value: unknown): number;
export declare function parsePersistedTimestamp(value: TimestampValue): Date | undefined;
export declare function getPersistedTimestampMs(value: TimestampValue): number;
export declare function formatPersistedTimestamp(value: TimestampValue, options?: Intl.DateTimeFormatOptions, fallback?: string): string;
export declare function formatCompactPersistedTimestamp(value: TimestampValue, fallback?: string): string;
export declare function formatPersistedDate(value: TimestampValue, fallback?: string): string;
export declare function formatPersistedTime(value: TimestampValue, fallback?: string): string;
export declare function formatRelativePersistedTimestamp(value: TimestampValue, fallback?: string): string;
//# sourceMappingURL=timestamps.d.ts.map