import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
              @import "./src/scss/_variables.scss";
              @import "./src/scss/_mixins.scss";
              @import "./src/scss/_base.scss";
              @import "./src/scss/_fonts.scss";
              @import "./src/scss/_forms.scss";
              @import "./src/scss/_buttons.scss";
            `
      }
    }
  }
})
