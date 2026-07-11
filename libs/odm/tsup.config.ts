import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'], // ◄── Cambiado: Ahora apunta a la raíz de tu src en libs/odm
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    outDir: 'dist',
    tsconfig: 'tsconfig.lib.json', // ◄── Cambiado: Apunta al tsconfig específico de la lib
    external: [
        '@nestjs/common',
        '@nestjs/core',
        '@nestjs/axios',
        '@nestjs/cache-manager', // ◄── Agregado para que no intente empaquetarlo internamente
        'rxjs',
        'dayjs',
        'googleapis'
    ]
});