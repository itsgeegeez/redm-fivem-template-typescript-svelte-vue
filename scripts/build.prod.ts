import { build } from "esbuild";

build({
  entryPoints: ["./client/index.ts"],
  outfile: "build/client/client.js",
  minify: false,
  platform: "node",
  tsconfig: "client/tsconfig.json",
  bundle: true,
}).catch(() => process.exit(1));

build({
  entryPoints: ["./server/index.ts"],
  outfile: "build/server/server.js",
  minify: false,
  platform: "node",
  tsconfig: "server/tsconfig.json",
  bundle: true,
}).catch(() => process.exit(1));
