import type { DeploymentConfigIssue, RawDeploymentEnvironment, SuperglueDeploymentConfig } from "./types.js";
export declare class DeploymentConfigError extends Error {
    readonly issues: DeploymentConfigIssue[];
    constructor(issues: DeploymentConfigIssue[]);
}
export declare function buildDeploymentConfig(raw: RawDeploymentEnvironment): SuperglueDeploymentConfig;
//# sourceMappingURL=parser.d.ts.map