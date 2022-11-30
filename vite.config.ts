import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import vueComponents from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { svgBuilder } from './src/lib/plugins/svgBuilder'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Inspecet from 'vite-plugin-inspect'

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
    vueJsx(),
    vueComponents({
      dts: './src/typings/vue-component.d.ts',
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    autoImport({
      dts: './src/typings/auto-import.d.ts',
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    svgBuilder('./src/assets/svg/'),
    Icons({
      autoInstall: true
    }),
    Inspecet()
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
