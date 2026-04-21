import type { SystemPermission, CustomRule, Role } from "./types.js";
export declare function isCustomRulePermission(p: SystemPermission): p is import("./types.js").CustomRulePermission;
export declare function getSystemRules(systems: "ALL" | Record<string, SystemPermission>, systemId: string): CustomRule[];
export declare const PREDEFINED_ROLE_IDS: readonly ["admin", "member", "enduser"];
export declare const RESERVED_ROLE_IDS: readonly ["admin", "member", "enduser", "__admin__"];
export declare const RESERVED_ROLE_NAMES: readonly ["member", "end user", "enduser", "admin"];
export declare function isPredefinedRole(roleId: string): boolean;
export declare function isReservedRoleId(roleId: string): boolean;
export declare function isReservedRoleName(name: string): boolean;
export declare function hasRole(roles: Role[], roleId: string): boolean;
export declare function getRoleIds(roles: Role[]): string[];
export declare function getBaseRole(roles: Role[]): Role | null;
export declare function getBaseRoleId(roles: Role[]): string | null;
//# sourceMappingURL=rbac-utils.d.ts.map