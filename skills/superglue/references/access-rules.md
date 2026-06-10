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
- `share` — explicit user-to-user sharing through the app/agent sharing flow.

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

Personal roles are per-user containers for ownership, share, and explicit access-rule grants.

- Each user can have at most one personal role.
- Ownership grants are added automatically when a user creates a tool or system.
- Personal role grants are unioned with the user's other roles.
- Managed via the Personal Roles tab in Access Rules and backend role APIs.

## Sharing Semantics

V1 sharing targets organization users only. It does not share directly to base roles or custom roles.

- Sharing writes `source: "share"` grants into the target user's personal role.
- A user can grant only permissions up to their own effective access: viewer can grant viewer, editor can grant viewer or editor.
- If the target already has the requested permission or stronger from any active grant, sharing is redundant and should be blocked.
- If the target has viewer access and the acting user can grant editor, sharing can promote the user to editor through the personal `source: "share"` grant.
- Sharing a tool also grants viewer access to required systems when the recipient lacks system access.
- Tool sharing is atomic. If any selected user or required system grant cannot be applied, nothing is shared.
- Normal users cannot unshare in V1. Admin cleanup should use Access Rules/admin grant management.

## Auto-Grant On Resource Creation

When a user creates a new tool or system, the backend automatically grants ownership access to the creator's personal role:

- New tool created -> `ownership` grant on `tool:<toolId>` with `editor`.
- New system created -> `ownership` grant on `system:<systemId>` with `editor`.

This only affects the creator's personal role, not base roles or additional custom roles.
