import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "ui",
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../build/web",
    emptyOutDir: true,
    rollupOptions: {
      input: "ui/index.html",
    },
  },
});
