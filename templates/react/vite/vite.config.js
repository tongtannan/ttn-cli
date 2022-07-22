/* eslint-disable */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import loadCssModulePlugin from 'vite-plugin-for-load-css-module';

var path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  // index.html 文件所在的位置
  root: './',
  base: './',
  resolve: {
    alias: {
      mainFields: ['*', '.ts', '.tsx', '.js', '.json'],
      '@': path.resolve(__dirname, '../src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 8200,
    strictPort: false,
    open: true,
    proxy: {
      '/api': {
        // target: `http://cqcp-qa.i.sz.shopee.io`,
        target: `https://cqcp.test.shopee.sg`,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    loadCssModulePlugin({
      include: (id) => id.endsWith('less') && !id.includes('node_modules'),
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style/css.js`,
        },
      ],
    }),
  ],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
});
