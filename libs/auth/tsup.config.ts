import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true, // Genera los archivos .d.ts automáticamente
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: true,
    tsconfig: './tsconfig.lib.json',
});