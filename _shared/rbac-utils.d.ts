import type { Role, SystemAllowlist } from "./types.js";
export declare function normalizeSystemAllowlist(systems: SystemAllowlist | null | undefined): SystemAllowlist;
export declare function isSystemAllowed(systems: SystemAllowlist, systemId: string): boolean;
export declare const PREDEFINED_ROLE_IDS: readonly ["admin", "member"];
export declare const RESERVED_ROLE_IDS: readonly ["admin", "member", "__admin__"];
export declare const RESERVED_ROLE_NAMES: readonly ["member", "admin"];
export declare function isPredefinedRole(roleId: string): boolean;
export declare function isReservedRoleId(roleId: string): boolean;
export declare function isReservedRoleName(name: string): boolean;
export declare function hasRole(roles: Role[], roleId: string): boolean;
export declare function getRoleIds(roles: Role[]): string[];
export declare function getBaseRole(roles: Role[]): Role | null;
export declare function getBaseRoleId(roles: Role[]): string | null;
export declare function getPersonalRole(roles: Role[]): Role | null;
export declare function getPersonalRoleId(roles: Role[]): string | null;
//# sourceMappingURL=rbac-utils.d.ts.map