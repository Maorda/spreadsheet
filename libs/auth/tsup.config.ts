import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    // CORRECCIÓN 2: Desactivamos minify para mantener legibles los stack traces en backend
    minify: false,
    // CORRECCIÓN 3: Blindamos los externals para evitar que tsup intente empaquetar Nest o RxJS
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