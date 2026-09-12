import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { algovisionApiPlugin } from './vite-plugin-api.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), algovisionApiPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // Fallback to internal Vite plugin if Express server is not running
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            // Silently fall back to vite plugin
          });
        }
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('canvas-confetti')) {
              return 'vendor-confetti';
            }
          }
        }
      }
    }
  }
})


