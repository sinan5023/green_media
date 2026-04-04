import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Put GSAP in its own chunk — large lib, rarely changes, gets cached separately
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap':  ['gsap'],
          'react': ['react', 'react-dom'],
        },
      },
    },
    // Warn only above 800 kB per chunk
    chunkSizeWarningLimit: 800,
    // No sourcemaps in production
    sourcemap: false,
    // Inline tiny assets (<4 kB) instead of extra requests
    assetsInlineLimit: 4096,
    // Minify CSS
    cssMinify: true,
  },

  // Faster dev server
  server: {
    hmr: true,
    cors: true,
  },

  // Optimise pre-bundling
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger', 'react', 'react-dom'],
  },
})
