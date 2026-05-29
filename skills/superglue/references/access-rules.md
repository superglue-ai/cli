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
- Effective tool visibility also requires access to every system referenced by that tool's request steps

## System Permissions

- `systems: "ALL"` — every current and future system is allowed
- `systems: ["gmail", "stripe"]` — only these specific systems are allowed
- System access is binary by system ID: listed means allowed, omitted means denied.

## Tool/System Entanglement

A saved tool is effectively visible and runnable only when both are true:

1. The user has tool access through at least one role.
2. The user has access to every `systemId` referenced by the tool's request steps.

When granting a tool, inspect the tool's request-step `systemId` values and grant required systems when the user should be able to see or run the tool.

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
