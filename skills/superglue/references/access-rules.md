# Access Rules (RBAC)

On superglue, roles define binary tool-level and system-level allowlists. Users can have multiple roles. Roles and access rules are only available on enterprise organizations.

## Data Model

```typescript
interface Role {
  id: string;
  name: string;
  description?: string;
  tools: "ALL" | string[];
  systems: "ALL" | string[];
  isBaseRole?: boolean;
}
```

Only `"ALL"` means open access. Empty arrays, missing fields, or `null` mean no direct access from that role.

## Tool Permissions

- `tools: "ALL"` — every tool is allowed, including tools created in the future
- `tools: ["tool-id-1", "tool-id-2"]` — only these specific tools are allowed
- Tool visibility is based on the tool allowlist only

## System Permissions

- `systems: "ALL"` — every current and future system is allowed
- `systems: ["gmail", "stripe"]` — only these specific systems are allowed
- System access is binary by system ID: listed means allowed, omitted means denied.

## Visibility and Execution Surfaces

- **Tools** — list/detail, agent views, VFS, REST detail, and tool history use tool allowlist only
- **Systems** — list/detail, agent views, VFS, docs, credentials, and `call_system` use system allowlist only
- **Execution** — running a tool requires tool access plus access to every system referenced by the executed tool config
- **Runs** — visible only when the user has tool access and access to every system captured on that run
- **Schedules** — visibility and editing are tool-only; system access can still block execution later
- **MCP** — config shows configured tools; runtime registration uses tool allowlist, and execution still checks referenced systems

## Multi-Role Semantics

Users can have multiple roles. Resolution is union:

| Layer   | Semantics                                             |
| ------- | ----------------------------------------------------- |
| Tools   | If any role allows a tool, the tool ID is allowed     |
| Systems | If any role allows a system, the system ID is allowed |

Assigned roles can add access but cannot remove access granted by another role.

## Base Roles

Every user has exactly one base role:

- **`admin`** — full access to everything. The admin role is immutable.
- **`member`** — default for org team members. Starts with `tools: "ALL"`, `systems: "ALL"`. Tool and system allowlists can be narrowed. Name and description cannot be changed. Cannot be deleted.

Users can also have additional custom roles on top of their base role. Custom roles are fully editable and can be created/deleted.

## Personal Roles

Admins can create a personal role for a specific user. A personal role is a per-user override that grants individual tool and system access independent of shared roles.

- Each user can have at most one personal role.
- Personal roles use the same `tools` and `systems` allowlist structure.
- Personal role allowlists are unioned with the user's other roles.
- Managed via the Personal Roles tab in Access Rules or the REST API (`POST /v1/users/:userId/personal-role`).

## Auto-Append On Resource Creation

When a user creates a new tool or system, the backend automatically adds it to the creator's personal role:

- New tool created -> appended to the creator's personal role `tools` list
- New system created -> appended to the creator's personal role `systems` list

This only affects the creator's personal role, not base roles or additional custom roles.
