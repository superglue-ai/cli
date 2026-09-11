# Access Rules (RBAC)

On superglue, roles define active resource grants for tools and systems. Users can have multiple roles. Roles and access rules are only available on enterprise organizations.

## Data Model

```typescript
interface ResourceGrant {
  roleId: string;
  resourceRef: "tool:<encodedId>" | "system:<encodedId>" | "tool:*" | "system:*";
  permissions: Array<"viewer" | "editor">;
  source: "access_rule" | "ownership" | "share";
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

- `tool:<encodedToolId>` — one specific tool.
- `system:<encodedSystemId>` — one specific system.
- `tool:*` — every current and future tool.
- `system:*` — every current and future system.

Resource ids are URL-encoded inside `resourceRef`; use shared helpers rather than hand-building refs.

## Permissions

- `viewer` — can see and execute/use the resource.
- `editor` — can mutate/delete/share the resource and includes `viewer`.

Current configured role access and ownership grants are generally stored as `editor`.

## Grant Sources

- `access_rule` — explicit admin/Access Rules edit.
- `ownership` — authorization projection from the resource creator.
- `share` — explicit sharing with an organization user or role.

Ownership source of truth remains the tool/system row. Ownership grants are a permission projection and should be preserved by ordinary role edits.

## Visibility and Execution Surfaces

- **Tools** — list/detail, agent views, VFS, REST detail, and tool history use tool `viewer`.
- **Systems** — list/detail, agent views, VFS, docs, credentials, and `sg system call` use system `viewer`.
- **Execution** — running a tool requires tool `viewer` plus system `viewer` for every referenced system.
- **Editing** — updating tools/systems requires `editor`.
- **Runs** — visible only when the user has tool `viewer` and system `viewer` for every captured system.
- **Schedules** — visibility follows current tool behavior; editing requires tool `editor`.
- **MCP** — config shows configured tools; runtime registration uses tool `viewer`, and execution still checks referenced systems.

## Multi-Role Semantics

Users can have multiple roles. Resolution is union:

| Layer   | Semantics                                                                  |
| ------- | -------------------------------------------------------------------------- |
| Tools   | If any active grant targets a tool, that grant's permission is effective   |
| Systems | If any active grant targets a system, that grant's permission is effective |

Assigned roles can add access but cannot remove access granted by another role.

## Base Roles

Every user has exactly one base role:

- **`admin`** — full access to everything. The admin role is immutable and has wildcard `editor` grants.
- **`member`** — default for org team members. New organizations seed it with wildcard `editor` grants for tools and systems. Access-rule grants can be narrowed. Name and description cannot be changed. Cannot be deleted.

Users can also have additional custom roles on top of their base role. Custom roles are fully editable and can be created/deleted.

## Personal Roles

Personal roles are per-user containers for ownership and user-targeted share grants.

- Each user can have at most one personal role.
- Ownership grants are added automatically when a user creates a tool or system.
- Personal role grants are unioned with the user's other roles.
- Ordinary role edits preserve personal roles and their ownership/share grants.

## Sharing Semantics

Sharing supports saved tools, systems, credentials, projects, playbooks, artifacts, and files.

- Targets are organization users or roles. The admin role and personal roles cannot be role targets.
- User-targeted shares live on personal roles; role-targeted shares live on the selected role.
- Sharing requires resource `editor` access. Direct shares grant `viewer` or `editor` through `source: "share"`.
- Editors can update or remove direct shares. Removing one preserves ownership, access-rule grants, and access from other roles.
- Credential sharing and revocation require the credential owner or an admin, even when another user has credential `editor`.
- Recipients can remove their own direct share, including credential shares, without editor access.
- Tool sharing grants missing system `viewer` access when the actor can pass it on. Otherwise, nothing is shared.
- Tool sharing does not share credentials. Credential sharing also grants missing viewer access to its owning system.
- Removing a tool or credential share does not remove the required-system shares it created.
- Sharing systems or playbooks does not cascade to their tools, systems, or credentials.
- Project sharing can include manageable current members when requested. It does not share future members or revoke member shares later.

## Auto-Grant On Resource Creation

When a user creates a new tool or system, the backend automatically grants ownership access to the creator's personal role:

- New tool created -> `ownership` grant on `tool:<toolId>` with `editor`.
- New system created -> `ownership` grant on `system:<systemId>` with `editor`.

This only affects the creator's personal role, not base roles or additional custom roles.
