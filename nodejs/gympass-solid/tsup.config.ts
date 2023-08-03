import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  target: "es2020",
  format: "esm",
  outDir: 'build',
  platform: 'node',
  clean: true,
})