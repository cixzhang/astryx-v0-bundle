import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import stylex from '@stylexjs/unplugin';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.join(root, 'verification'),
  plugins: [
    stylex.vite({
      dev: false,
      useCSSLayers: true,
      styleResolution: 'application-order',
      unstable_moduleResolution: {
        type: 'commonJS',
        rootDir: root,
      },
    }),
    react(),
  ],
  server: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
    fs: {allow: [root]},
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },
  build: {
    outDir: path.join(root, 'dist'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 2500,
  },
});
