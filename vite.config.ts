import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueComponents from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { svgBuilder } from './src/lib/plugins/svgBuilder'

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  server: {
    strictPort: true,
    port: 5237
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/style/_mixins.scss";`
      }
    }
  },
  plugins: [
    vue(),
    vueComponents({
      dts: './src/typings/vue-component.d.ts',
      resolvers: [
        ElementPlusResolver()
      ]
    }),
    autoImport({
      dts: './src/typings/auto-import.d.ts',
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [
        ElementPlusResolver()
      ]
    }),
    svgBuilder('./src/assets/svg/'),
  ],
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    target: ['es2021', 'chrome100', 'safari13'],
    assetsDir: 'assets',
    assetsInlineLimit: 8192,
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        chunkFileNames: 'js/[name]-chunk.[hash].js',
        entryFileNames: 'js/[name]-entry.[hash].js'
      }
    }
  }
})
