import type { AgentStreamChunk, Message, ToolCall } from "./types.js";
export interface ToolMutation {
    input?: ToolCall["input"];
    status?: ToolCall["status"];
    frontendOutput?: ToolCall["frontendOutput"];
    llmOutput?: ToolCall["llmOutput"];
    resultMetadata?: ToolCall["resultMetadata"];
    error?: ToolCall["error"] | null;
    startTime?: ToolCall["startTime"];
    endTime?: ToolCall["endTime"];
    confirmationState?: string | null;
    confirmationData?: unknown;
}
export declare function applyToolMutation(tool: ToolCall, mutation: ToolMutation): ToolCall;
export declare function mutateToolCallInMessages(messages: Message[], toolCallId: string, mutation: ToolMutation): Message[];
export declare function buildStreamingAssistantMessage(id: string): Message;
export declare function parseToolOutput(value: unknown): Record<string, unknown> | null;
export declare function parseAgentStreamEventLine(line: string): Record<string, any> | null;
export declare function extractLoadedSkillsFromMessages(messages: Message[]): string[];
export declare function stopActiveTool(tool: ToolCall): ToolCall;
export declare function appendContentToMessage(message: Message, content: string): Message;
export declare function updateMessageWithData(message: Message, data: any, targetMessage: Message): Message;
export declare function findAwaitingConfirmationToolCallIds(messages: Message[]): string[];
export declare function declineAwaitingConfirmationTools(messages: Message[]): Message[];
export declare function findAndResumeMessageWithTool(messages: Message[], toolCallId: string): {
    messages: Message[];
    targetMessage: Message | null;
};
export declare function serializeToolCallForPersistence(tool: ToolCall): ToolCall;
export declare function serializeMessageForPersistence(message: Message): Message;
export type AgentTranscriptOutcome = "streaming" | "completed" | "paused";
export interface AgentTranscriptState {
    messages: Message[];
    assistantMessageId: string | null;
    outcome: AgentTranscriptOutcome;
}
export interface ApplyAgentStreamChunkOptions {
    createAssistantMessageId: () => string;
}
export declare function createAgentTranscriptState(messages?: Message[], assistantMessageId?: string | null): AgentTranscriptState;
export declare function applyAgentStreamChunk(state: AgentTranscriptState, chunk: AgentStreamChunk, options: ApplyAgentStreamChunkOptions): AgentTranscriptState;
//# sourceMappingURL=agent-message-state.d.ts.map