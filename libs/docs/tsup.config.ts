import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: false,
    external: [
        '@spreadsheet/auth', // <-- CRÍTICO: Evita empaquetar la librería hermana dentro de este bundle
        'googleapis',
        'docx',
        '@nestjs/common',
        '@nestjs/core',
        'rxjs',
        'reflect-metadata'
    ],
    tsconfig: './tsconfig.lib.json',
});