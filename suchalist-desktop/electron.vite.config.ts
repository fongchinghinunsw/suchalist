import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@common': resolve('src/common'),
        '@/database': resolve('src/main/database')
      }
    },
    build: {
      rollupOptions: {
        external: ['better-sqlite3']
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@common': resolve('src/common'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/components': resolve('src/renderer/src/components'),
        '@/stores': resolve('src/renderer/src/stores'),
        '@/types': resolve('src/renderer/src/types'),
        '@/utils': resolve('src/renderer/src/utils'),
        '@/services': resolve('src/renderer/src/services')
      }
    },
    plugins: [react()]
  }
});
