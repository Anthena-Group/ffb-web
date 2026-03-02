import { defineConfig } from "tsup";

export default defineConfig({
  "splitting": true,
  "format": ['cjs', 'esm'], // CommonJS and ES Module formats
  "dts": true,
  "outDir": 'dist',
  "sourcemap": true,
  "clean": true,
  "minify": true,
  "entry": [
    "src/index.ts"
  ]
});