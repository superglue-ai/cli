import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli.ts"],
  format: ["cjs"],
  target: "node20",
  platform: "node",
  splitting: false,
  clean: true,
  minify: true,
  noExternal: ["@superglue/shared"],
  external: ["commander", "fast-json-patch"],
  banner: { js: "#!/usr/bin/env node" },
  outExtension: () => ({ js: ".js" }),
});
