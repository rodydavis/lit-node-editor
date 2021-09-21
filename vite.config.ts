import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: '/lit-node-editor/',
  build: {
    lib: {
      entry: "src/node-editor.ts",
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});