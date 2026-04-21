import { Log } from "./types.js";
export interface SSELogSubscriptionOptions {
    onLog?: (log: Log) => void;
    onError?: (error: Error) => void;
    onComplete?: () => void;
    traceId?: string;
    includeDebug?: boolean;
}
export interface SSESubscription {
    unsubscribe: () => void;
}
export declare class SSELogSubscriptionManager {
    private apiEndpoint;
    private apiKey;
    private controllers;
    constructor(apiEndpoint: string, apiKey: string);
    subscribeToLogs(options?: SSELogSubscriptionOptions): Promise<SSESubscription>;
    disconnect(): Promise<void>;
}
//# sourceMappingURL=sse-log-subscription.d.ts.map