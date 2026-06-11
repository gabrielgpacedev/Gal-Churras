import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.svg', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'GalChurras',
        short_name: 'GalChurras',
        description: 'Kits de churrasco dos melhores açougues, direto na sua casa',
        lang: 'pt-BR',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#2e0808',
        background_color: '#1a0505',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // cacheia tudo que o build gera, incluindo as imagens dos kits/açougues
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,ico}'],
      },
    }),
  ],
  // GitHub Pages serve o app em https://<user>.github.io/Gal-Churras/
  base: '/Gal-Churras/mobile/galchurras-web',
  server: {
    // expõe o dev server na rede local para testar no celular
    host: true,
  },
})
