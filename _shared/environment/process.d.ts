import type { RawDeploymentEnvironment } from "./types.js";
export declare function readProcessDeploymentEnvironment(): RawDeploymentEnvironment;
export declare function readProcessEnvironmentValue(name: string): string | undefined;
export declare function writeProcessEnvironmentValue(name: string, value: string): void;
export declare function isProcessEnvironmentValue(name: string, value: string): boolean;
export declare function readProcessEnvironmentSnapshot(names: readonly string[]): Record<string, string | undefined>;
//# sourceMappingURL=process.d.ts.map