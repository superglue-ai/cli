import { ConfirmationAction, type AgentMessageRequestPayloadV1, type AgentRequestPayloadV1, type AgentRequestSubmissionV1, type AgentSessionReferenceV1, type AgentToolContinuationAction, type AgentToolContinuationRequestPayloadV1 } from "./types.js";
export declare const AGENT_REQUEST_LIMITS: {
    readonly messageContentChars: 50000;
    readonly identifierChars: 256;
    readonly attachedFiles: 20;
    readonly continuationInputChars: 100000;
    readonly frontendDraftsChars: 2000000;
    readonly accessRulesContextChars: 2000000;
};
export declare const AGENT_IDENTIFIER_PATTERN: RegExp;
export declare const AGENT_TOOL_CONTINUATION_ACTIONS: readonly ["approve", "reject", "oauth_success", "oauth_failure"];
export declare const AGENT_TOOL_CONTINUATION_ACTION_BY_CONFIRMATION_STATE: Record<ConfirmationAction, AgentToolContinuationAction>;
export declare class AgentRequestValidationError extends Error {
    constructor(message: string);
}
export declare function validateAgentRequestPayloadV1(value: unknown): AgentRequestPayloadV1;
export declare function validateAgentSessionReferenceV1(value: unknown): AgentSessionReferenceV1;
export declare function validateAgentRequestSubmissionV1(value: unknown): AgentRequestSubmissionV1;
export declare function isAgentMessagePayload(payload: AgentRequestPayloadV1): payload is AgentMessageRequestPayloadV1;
export declare function isAgentToolContinuationPayload(payload: AgentRequestPayloadV1): payload is AgentToolContinuationRequestPayloadV1;
//# sourceMappingURL=agent-request-payload.d.ts.map