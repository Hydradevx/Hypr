import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "ui",
  base: "./",
  plugins: [react()],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "ui/index.html",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "ui"),
    },
  },
});
