import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

// Gera os ícones do PWA a partir de public/logo.svg:
//   npx @vite-pwa/assets-generator
export default defineConfig({
  preset: {
    ...minimal2023Preset,
    // logo.svg já é full-bleed (fundo incluso), então sem padding extra
    transparent: { sizes: [64, 192, 512], favicons: [[48, 'favicon.ico']], padding: 0 },
    maskable: { sizes: [512], padding: 0 },
    apple: { sizes: [180], padding: 0 },
  },
  images: ['public/logo.svg'],
})
