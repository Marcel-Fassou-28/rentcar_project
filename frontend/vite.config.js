import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // mets ici le port que tu veux
    open: true, // optionnel : ouvre automatiquement le navigateur
  },
})
