# Access Rules (RBAC)

On superglue, roles define active resource grants for tools, credentials, playbooks, files, and projects. Files include uploads and agent-written HTML documents and spreadsheets. Systems are not a resource: a system id is a plain string on connections and tool steps. Users can have multiple roles. Roles and access rules are only available on enterprise organizations.

## Data Model

```typescript
interface ResourceGrant {
  roleId: string;
  resourceRef: "<kind>:<encodedId>" | "<kind>:*"; // kind: tool | credential | playbook | file | project
  permissions: Array<"viewer" | "editor">;
  source: "access_rule" | "ownership" | "share" | "project"; // project: computed from project access, never stored
  grantedByUserId?: string;
  revokedAt?: Date;
  revokedByUserId?: string;
}

interface Role {
  id: string;
  name: string;
  description?: string;
  resourceGrants: ResourceGrant[];
  isBaseRole?: boolean;
}
```

Only active grants where `revokedAt` is empty contribute to access. `editor` implies `viewer`.

## Resource Refs

- `<kind>:<encodedId>` — one specific resource, for example `tool:<toolId>` or `credential:<connectionId>`.
- `<kind>:*` — every current and future resource of that kind.

Resource ids are URL-encoded inside `resourceRef`; use shared helpers rather than hand-building refs.

## Permissions

- `viewer` — can see and execute/use the resource.
- `editor` — can mutate/delete/share the resource and includes `viewer`.

Current configured role access and ownership grants are generally stored as `editor`.

## Grant Sources

- `access_rule` — explicit admin/Access Rules edit.
- `ownership` — authorization projection from the resource creator.
- `share` — explicit sharing with an organization user or role.

Ownership source of truth remains the resource row. Ownership grants are a permission projection and should be preserved by ordinary role edits.

## Visibility and Execution Surfaces

- **Tools** — list/detail, agent views, VFS, REST detail, and tool history use tool `viewer`.
- **Connections** — usable with credential `viewer`; changing secrets, name, url, auth, or tunnel requires credential `editor`. System IDs and system knowledge are metadata, not access-controlled resources. `sg system call` needs an accessible connection only when the request uses secrets or the connection url.
- **Execution** — running a tool requires tool `viewer` plus an accessible connection for every referenced system id: an explicit credentials id, the user's starred default, or their longest-held accessible connection.
- **Editing** — updating a tool requires tool `editor`.
- **Runs** — visible with tool `viewer`, limited to the member's own runs when the organization setting "members see only own runs" is on (the default). Admins see all runs.
- **Schedules** — visibility follows current tool behavior; editing requires tool `editor`.
- **MCP** — config shows configured tools; runtime registration uses tool `viewer`, and execution still needs a connection for every referenced system id.

## Multi-Role Semantics

Users can have multiple roles. Resolution is union:

| Layer        | Semantics                                                                      |
| ------------ | ------------------------------------------------------------------------------ |
| Any resource | If any active grant targets the resource, that grant's permission is effective |

Assigned roles can add access but cannot remove access granted by another role.

## Base Roles

Every user has exactly one base role:

- **`admin`** — built-in editor access to resources except credentials. Credentials require ownership or explicit grants. New organizations give admins no credential wildcard. Credential grants are editable. Name and description cannot be changed. Cannot be deleted.
- **`member`** — default for org team members. New organizations seed it with a wildcard `editor` grant for tools. Access-rule grants can be narrowed. Name and description cannot be changed. Cannot be deleted.
- **`service_account`** — API-only users that admins create through `/v1/service-accounts`. Starts with no grants; only its grants are editable. Users cannot be switched to or from it. Service accounts can run granted tools and manage their own credential sets, but cannot log in, use MCP, or read runs.

Users can also have additional custom roles on top of their base role. Custom roles are fully editable and can be created/deleted.

## Personal Roles

Personal roles are per-user containers for ownership and user-targeted share grants.

- Each user can have at most one personal role.
- Ownership grants are added automatically when a user creates a tool, connection, playbook, file, or project.
- Personal role grants are unioned with the user's other roles.
- Ordinary role edits preserve personal roles and their ownership/share grants.

## Sharing Semantics

Sharing supports saved tools, connections, projects, playbooks, and files.

- Targets are organization users or roles. The admin role and personal roles cannot be role targets.
- User-targeted shares live on personal roles; role-targeted shares live on the selected role.
- Sharing requires resource `editor` access. Direct shares grant `viewer` or `editor` through `source: "share"`.
- Editors can update or remove direct shares. Removing one preserves ownership, access-rule grants, and access from other roles.
- Connection sharing and revocation require the connection owner or an admin, even when another user has connection `editor`.
- Recipients can remove their own direct share, including connection shares, without editor access.
- Sharing a tool shares only the tool. The recipient still needs a connection for every system id it references.
- Sharing playbooks does not cascade to their tools or connections.
- Access to a project gives the same access (viewer or editor) to every file and tool linked to it. Removing the file or tool from the project, removing the project access, or archiving the project removes that access. Anyone with access to a project, including viewers, can link a file or tool they can share. Project editors and people who can share a file or tool can remove it from the project. Playbooks and connections are never shared through projects.

## Auto-Grant On Resource Creation

When a user creates a new resource, the backend automatically grants ownership access to the creator's personal role:

- New tool created -> `ownership` grant on `tool:<toolId>` with `editor`.
- New connection created -> `ownership` grant on `credential:<connectionId>` with `editor`.

This only affects the creator's personal role, not base roles or additional custom roles.
