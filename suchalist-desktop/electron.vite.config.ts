import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@/components': resolve('src/renderer/src/components'),
        '@/stores': resolve('src/renderer/src/stores'),
        '@/services': resolve('src/renderer/src/services')
      }
    },
    plugins: [react()]
  }
});
