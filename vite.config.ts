import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/neta-render',
  build: {
    lib: {
      entry: 'src/core/index.ts', // 工具函数入口文件路径
      formats: ['es'],
    },
  },
});
