import { defineConfig } from 'astro/config';
import astroPwa from '@vite-pwa/astro';

const base = process.env.BASE_PATH ?? '/';
const site = process.env.SITE_URL ?? 'https://example.github.io';

export default defineConfig({
  site,
  base,
  integrations: [
    astroPwa({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'favicon.svg',
        'offline-image.svg',
        'apple-touch-icon-v2.png',
        'icon-192-v2.png',
        'icon-512-v2.png'
      ],
      manifest: {
        name: 'Trip Assistant',
        short_name: 'Trip Guide',
        description: 'Offline-ready road trip guide for iPhone home screen.',
        theme_color: '#1f4e5f',
        background_color: '#f6f4eb',
        display: 'standalone',
        orientation: 'portrait',
        scope: base,
        start_url: base,
        icons: [
          {
            src: `${base}icon-192-v2.png`,
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: `${base}icon-512-v2.png`,
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: `${base}icon-512-v2.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: `${base}index.html`,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?.*)?$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'trip-remote-images',
              cacheableResponse: {
                statuses: [0, 200]
              },
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});
