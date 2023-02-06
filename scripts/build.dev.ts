import { build } from "esbuild";

build({
  entryPoints: ["./client/index.ts"],
  outfile: "build/client/client.js",
  minify: false,
  platform: "node",
  bundle: true,
  tsconfig: "client/tsconfig.json",
  watch: {
    onRebuild(error: unknown) {
      if (error) console.error("[client] build failed:", error);
      else console.log("[client] build succeeded");
    },
  },
})
  .catch(() => process.exit(1))
  .then(() => {
    console.log("Watching client");
  });

build({
  entryPoints: ["./server/index.ts"],
  outfile: "build/server/server.js",
  platform: "node",
  minify: false,
  tsconfig: "server/tsconfig.json",
  bundle: true,
  watch: {
    onRebuild(error: unknown) {
      if (error) console.error("[server] build failed:", error);
      else console.log("[server] build succeeded");
    },
  },
})
  .catch(() => process.exit(1))
  .then(() => {
    console.log("Watching server");
  });
