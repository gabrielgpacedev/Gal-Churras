import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serve o app em https://<user>.github.io/Gal-Churras/
  base: '/Gal-Churras/',
  server: {
    // expõe o dev server na rede local para testar no celular
    host: true,
  },
})
