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
        '@spreadsheet/auth',
        'googleapis',
        '@nestjs/common',
        '@nestjs/core',
        'rxjs',
        'reflect-metadata',
        'docx',
        'class-validator',
        'class-transformer'
    ],
    tsconfig: './tsconfig.lib.json',
});