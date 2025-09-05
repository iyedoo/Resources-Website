// .vitepress/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  vite: {
    assetsInclude: ['**/*.pdf'], // makes Vite process PDFs as assets
  }
})

