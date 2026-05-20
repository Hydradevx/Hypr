import path, { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import fg from 'fast-glob'

const commandEntries = Object.fromEntries(
  fg
    .sync("src/main/bot/commands/**/*.ts")
    .map((file) => [
      path.relative(
        "src/main",
        file.slice(0, -3)
      ),
      path.resolve(file),
    ])
);

export default defineConfig({
 main: {
    build: {
      rollupOptions: {
        input: {
          index: path.resolve("src/main/index.ts"),
          ...commandEntries,
        },
      },
    },
  },
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
