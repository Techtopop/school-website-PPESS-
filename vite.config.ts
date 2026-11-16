import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// `vite build --mode offline` makes a self-contained copy that opens by double-clicking index.html (no web server).
export default defineConfig(({ mode }) => {
  const offline = mode === "offline";
  return {
    base: offline ? "./" : "/",
    plugins: [react(), tailwindcss(), ...(offline ? [viteSingleFile()] : [])],
    define: { __OFFLINE__: offline },
    build: offline ? { outDir: "dist-offline" } : {},
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  };
});
