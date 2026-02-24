import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

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
  ],
})
