import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://jhedai.com',
      dynamicRoutes: [
        '/',
        '/servicios',
        '/nosotros',
        '/blog',
        '/contacto',
      ],
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
        {
          userAgent: 'GPTBot',
          allow: '/',
          crawlDelay: 2,
        },
        {
          userAgent: 'ChatGPT-User',
          allow: '/',
          crawlDelay: 2,
        },
        {
          userAgent: 'Claude-Web',
          allow: '/',
        },
        {
          userAgent: 'anthropic-ai',
          allow: '/',
        },
        {
          userAgent: 'Google-Extended',
          allow: '/',
        },
        {
          userAgent: 'PerplexityBot',
          allow: '/',
          crawlDelay: 1,
        },
        {
          userAgent: 'YouBot',
          allow: '/',
          crawlDelay: 1,
        },
      ],
    }),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files > 10KB
    }),
    // Brotli compression (better than gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
    }),
  ],
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'three', '@react-three/fiber'],
  },
})
