import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5500,
    host: true,
    strictPort: false, // 允许自动寻找可用端口
    // 确保正确处理模块文件
    fs: {
      strict: false,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
          utils: ['lodash'],
        },
      },
    },
  },
});
