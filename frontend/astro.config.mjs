import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    devOptions: {
        hostname: '0.0.0.0',
        port: 4321, // specify the port if not default
    },
    outDir: './docs', // specify the output directory
});
