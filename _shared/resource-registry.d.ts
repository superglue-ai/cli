import type { ResourceKind, ResourceKindDefinition } from "./types.js";
export declare const RESOURCE_DEFINITIONS: {
    readonly tool: {
        readonly label: "Tool";
        readonly pluralLabel: "Tools";
        readonly collectionKey: "tools";
        readonly memberDefaultPermission: "editor";
        readonly pickerDefaultPermission: "editor";
    };
    readonly system: {
        readonly label: "System";
        readonly pluralLabel: "Systems";
        readonly collectionKey: "systems";
        readonly memberDefaultPermission: "editor";
        readonly pickerDefaultPermission: "editor";
    };
    readonly credential: {
        readonly label: "Credential";
        readonly pluralLabel: "Credentials";
        readonly collectionKey: "credentials";
        readonly memberDefaultPermission: "editor";
        readonly pickerDefaultPermission: "viewer";
    };
    readonly playbook: {
        readonly label: "Playbook";
        readonly pluralLabel: "Playbooks";
        readonly collectionKey: "playbooks";
        readonly memberDefaultPermission: "editor";
        readonly pickerDefaultPermission: "editor";
    };
    readonly artifact: {
        readonly label: "Artifact";
        readonly pluralLabel: "Artifacts";
        readonly collectionKey: "artifacts";
        readonly memberDefaultPermission: "editor";
        readonly pickerDefaultPermission: "editor";
    };
};
export declare const RESOURCE_KINDS: ResourceKind[];
export declare function isResourceKind(value: unknown): value is ResourceKind;
export declare function getResourceDefinition(kind: ResourceKind): ResourceKindDefinition;
//# sourceMappingURL=resource-registry.d.ts.map