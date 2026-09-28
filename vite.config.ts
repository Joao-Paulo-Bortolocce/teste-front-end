import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // O servidor do JSON não envia Access-Control-Allow-Origin, então o
  // navegador bloqueia o fetch direto (CORS). Em dev, o Vite proxya a
  // requisição pelo mesmo origin, contornando o bloqueio server-side.
  server: {
    proxy: {
      '/api/produtos.json': {
        target: 'https://app.econverse.com.br',
        changeOrigin: true,
        rewrite: () => '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
  },
})
