import type { ResourceGrant, ResourceGrantInput, ResourceGrantSource, ResourceKind, ResourcePermission, Role, RoleResourceGrantInput } from "./types.js";
export type CheckResult = {
    allowed: boolean;
    error?: string;
};
export declare function toResourceRef(kind: ResourceKind, id: string): string;
export declare function toWildcardResourceRef(kind: ResourceKind): string;
export declare function parseResourceRef(resourceRef: string): {
    kind: ResourceKind;
    id: string;
    isWildcard: boolean;
} | null;
export declare function getWildcardResourceRef(resourceRef: string): string | null;
export declare function normalizeResourcePermissions(permissions: readonly ResourcePermission[] | null | undefined): ResourcePermission[];
export declare function permissionSatisfies(granted: ResourcePermission, required: ResourcePermission): boolean;
export declare function highestResourcePermission(permissions: readonly ResourcePermission[]): ResourcePermission | undefined;
export declare function grantHasPermission(grant: Pick<ResourceGrant, "permissions" | "revokedAt">, required: ResourcePermission): boolean;
export declare function grantMatchesResource(grant: Pick<ResourceGrant, "resourceRef" | "revokedAt">, resourceRef: string): boolean;
export declare function getEffectiveResourcePermissions(grants: readonly Pick<ResourceGrant, "resourceRef" | "permissions" | "revokedAt">[], resourceRef: string): ResourcePermission[];
export declare function hasResourcePermission(grants: readonly Pick<ResourceGrant, "resourceRef" | "permissions" | "revokedAt">[], resourceRef: string, required: ResourcePermission): boolean;
export declare function getRoleResourceGrants(roles: readonly Pick<Role, "resourceGrants">[]): ResourceGrant[];
export declare function getAllowedResourceIds(grants: readonly Pick<ResourceGrant, "resourceRef" | "permissions" | "revokedAt">[], kind: ResourceKind, required: ResourcePermission): string[] | undefined;
export declare function getAllowedToolIds(roles: readonly Pick<Role, "resourceGrants">[], permission?: ResourcePermission): string[] | undefined;
export declare function getAllowedSystemIds(roles: readonly Pick<Role, "resourceGrants">[], permission?: ResourcePermission): string[] | undefined;
/**
 * Picks the resource the user has held longest: earliest matching grant
 * createdAt, tie-broken by the resource's own createdAt. Collapses to the single
 * item in the one-item case so a newly added/shared resource never steals the
 * default (credential-decoupling §3).
 */
export declare function pickLongestHeldResource<T extends {
    id: string;
    createdAt?: Date;
}>(items: readonly T[], grants: readonly Pick<ResourceGrant, "resourceRef" | "revokedAt" | "createdAt">[], kind: ResourceKind): T | undefined;
export declare function getAllowedCredentialsIds(roles: readonly Pick<Role, "resourceGrants">[], permission?: ResourcePermission): string[] | undefined;
export declare function getEffectiveCredentialsPermissions(roles: readonly Pick<Role, "resourceGrants">[], credentialsId: string): ResourcePermission[];
export declare function getEffectiveToolPermissions(roles: readonly Pick<Role, "resourceGrants">[], toolId: string): ResourcePermission[];
export declare function getEffectiveSystemPermissions(roles: readonly Pick<Role, "resourceGrants">[], systemId: string): ResourcePermission[];
export declare function checkResourcePermission(roles: readonly Pick<Role, "resourceGrants">[], kind: ResourceKind, resourceId: string, permission: ResourcePermission): CheckResult;
export declare function isToolAllowed(roles: readonly Pick<Role, "resourceGrants">[], toolId: string, permission?: ResourcePermission): CheckResult;
export declare function isSystemVisible(roles: readonly Pick<Role, "resourceGrants">[], systemId: string, permission?: ResourcePermission): CheckResult;
export declare function hasAllSystems(roles: readonly Pick<Role, "resourceGrants">[], permission?: ResourcePermission): boolean;
export declare function hasAllTools(roles: readonly Pick<Role, "resourceGrants">[], permission?: ResourcePermission): boolean;
export declare function getResourceGrantSources(grants: readonly ResourceGrant[], resourceRef: string, requiredPermission?: ResourcePermission): ResourceGrantSource[];
export declare function getSharePermissionForResource(grants: readonly ResourceGrant[], resourceRef: string): ResourcePermission | undefined;
export declare function getAccessRulePermissionForResource(grants: readonly ResourceGrant[], resourceRef: string): ResourcePermission | undefined;
export declare function hasAdminBaseRole(roles: readonly Pick<Role, "id" | "isBaseRole">[]): boolean;
export declare function resolveResourceAccessForRoles({ roles, resource, userId, }: {
    roles: readonly Pick<Role, "resourceGrants">[];
    resource: {
        kind: ResourceKind;
        id: string;
        ownerUserId?: string;
    };
    userId: string;
}): {
    permissions: ResourcePermission[];
    sources: ResourceGrantSource[];
    sharePermission?: ResourcePermission;
    accessRulePermission?: ResourcePermission;
    maxPermission?: ResourcePermission;
};
export declare function normalizeResourceGrantInput(grant: ResourceGrantInput): ResourceGrantInput;
export declare function normalizeRoleResourceGrantInput(grant: RoleResourceGrantInput): ResourceGrantInput;
export declare const PREDEFINED_ROLE_IDS: readonly ["admin", "member"];
export declare const RESERVED_ROLE_IDS: readonly ["admin", "member", "__admin__"];
export declare const RESERVED_ROLE_NAMES: readonly ["member", "admin"];
export declare function isPredefinedRole(roleId: string): boolean;
export declare function isReservedRoleId(roleId: string): boolean;
export declare function isReservedRoleName(name: string): boolean;
export declare function hasRole(roles: {
    id: string;
}[], roleId: string): boolean;
export declare function getRoleIds(roles: {
    id: string;
}[]): string[];
export declare function getBaseRole<T extends {
    isBaseRole?: boolean;
}>(roles: T[]): T | null;
export declare function getBaseRoleId(roles: {
    id: string;
    isBaseRole?: boolean;
}[]): string | null;
export declare function getPersonalRole<T extends {
    id: string;
    isPersonalRole?: boolean;
}>(roles: T[]): T | null;
export declare function getPersonalRoleId(roles: {
    id: string;
    isPersonalRole?: boolean;
}[]): string | null;
//# sourceMappingURL=rbac-utils.d.ts.map