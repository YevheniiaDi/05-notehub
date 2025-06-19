import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://notehub-public.goit.study/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        configure: proxy => {
          proxy.on('proxyReq', proxyReq => {
            const token = process.env.VITE_NOTEHUB_TOKEN;
            if (token) {
              proxyReq.setHeader('Authorization', `Bearer ${token}`);
            }
          });
        },
      },
    },
  },
});

