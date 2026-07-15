import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: false, // ◄── Cambiado: Mantener stack traces legibles para desarrollo y base de datos
    outDir: 'dist',
    tsconfig: 'tsconfig.lib.json',
    external: [
        '@spreadsheet/auth',     // ◄── CLAVE: No metas a tu hermana en el bundle
        'pg',                    // ◄── No dupliques el motor de postgres
        'pg-native',             // ◄── Evita warnings de compilación nativa en webpack/tsup
        'reflect-metadata',      // ◄── No empaquetar el polyfill global de decoradores
        '@nestjs/common',
        '@nestjs/core',
        '@nestjs/axios',
        '@nestjs/cache-manager',
        'rxjs',
        'dayjs',
        'googleapis'
    ]
});