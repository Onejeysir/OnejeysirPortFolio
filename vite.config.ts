import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': 'http://127.0.0.1:3001',
      '/robots.txt': 'http://127.0.0.1:3001',
      '/sitemap.xml': 'http://127.0.0.1:3001',
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
})
