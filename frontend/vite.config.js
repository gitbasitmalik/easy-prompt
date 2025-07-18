import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/login': {
        target: 'http://localhost:8000/api/auth',
        changeOrigin: true,
      },
      '/register': {
        target: 'http://localhost:8000/api/auth',
        changeOrigin: true,
      }
    }
  }
})
