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
        '@spreadsheet/auth', // Evitamos empaquetar la librería de autenticación aquí
        'googleapis',
        '@nestjs/common',
        '@nestjs/core',
        'rxjs',
        'reflect-metadata'
    ],
    tsconfig: './tsconfig.lib.json',
});