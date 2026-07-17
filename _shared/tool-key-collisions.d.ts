import { Tool } from "./types.js";
/**
 * The execution runtime merges payload inputs, step results, credentials,
 * pagination vars, and file refs into one flat sourceData namespace. These
 * constants define the key space reserved by the runtime; tool inputs and
 * step ids must not collide with it. Single source of truth for tool save-time
 * validation, schedule payload validation, tool-chain payload sanitization, and
 * skill docs.
 */
export declare const RESERVED_RUNTIME_KEYS: readonly ["__files__", "currentItem", "sg_auth_email", "sg_auth_jwt"];
/**
 * Injected into request vars only while a step actually paginates. Payload
 * inputs with these names OVERRIDE the runtime's pagination counters
 * (requestVars = { ...paginationVars, ...payload, ...credentials }), so they
 * are rejected only when the tool has a step with active pagination —
 * on non-paginated tools they are legitimate domain inputs.
 */
export declare const PAGINATION_RUNTIME_KEYS: readonly ["page", "offset", "cursor", "limit", "pageSize"];
export type ToolKeyCollisionKind = "reserved" | "pagination" | "credential" | "step-id" | "duplicate-step-id";
export interface ToolKeyCollision {
    key: string;
    source: "input" | "stepId";
    kind: ToolKeyCollisionKind;
    message: string;
}
export interface ToolPayloadKeyCollision {
    key: string;
    kind: Exclude<ToolKeyCollisionKind, "duplicate-step-id">;
    message: string;
}
/**
 * Extract the domain input key names a tool declares, unwrapping the legacy
 * request-envelope schema shape ({ payload: {...}, credentials: {...} })
 * where the runtime payload keys live under properties.payload.properties.
 */
export declare function getToolDeclaredInputKeys(inputSchema: unknown): string[];
export declare function toolHasActivePagination(tool: Pick<Tool, "steps">): boolean;
/**
 * Validate a tool's declared input keys and step ids against the reserved
 * runtime key space. The credential check is a prefix rule: any key starting
 * with `<systemId>_` for a system the tool references is rejected, whether
 * or not that credential exists today — credentials change after tools
 * are saved, so reserving the whole namespace is the only check that stays
 * correct without re-validating every tool on every credential change.
 * The rule is fully static: referenced system ids come from the tool's own
 * steps, so no datastore access is needed.
 */
export declare function collectToolKeyCollisions({ tool, }: {
    tool: Pick<Tool, "steps" | "inputSchema">;
}): ToolKeyCollision[];
export declare function formatToolKeyCollisionError(collisions: ToolKeyCollision[]): string;
/**
 * Identify caller-supplied payload keys that collide with the runtime
 * namespace of a specific tool. Used to reject saved static schedule payloads
 * and sanitize generated tool-chain payloads before they reach the target tool.
 * Only colliding keys are flagged — undeclared passthrough keys are a supported
 * pattern and must be preserved.
 */
export declare function getCollidingRuntimePayloadKeys({ payload, tool, }: {
    payload: Record<string, unknown>;
    tool: Pick<Tool, "steps">;
}): ToolPayloadKeyCollision[];
export declare function formatPayloadKeyCollisionError(collisions: ToolPayloadKeyCollision[]): string;
//# sourceMappingURL=tool-key-collisions.d.ts.map