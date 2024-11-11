import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx', 'resources/js/App_DocumentViewr.jsx'],
            refresh: true,
        }),
        react(), // Add this line for React support
    ], build: {
        outDir: 'dist', // Ensure this is set to 'dist'
    },
});
