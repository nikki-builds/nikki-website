import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 4521,
    strictPort: true,
    // Let Vercel's preview sandbox (*.vercel.run) open the dev server
    allowedHosts: ['.vercel.run'],
  },
  preview: {
    host: '0.0.0.0',
    port: 4521,
    strictPort: true,
  },
})
