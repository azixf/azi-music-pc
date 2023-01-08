import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import vueComponents from "unplugin-vue-components/vite";
import autoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { svgBuilder } from "./src/lib/plugins/svgBuilder";
import postcssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  server: {
    strictPort: true,
    port: 5237,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 2,
            autoprefixer: {
              grid: true,
            },
            features: {
              'logical-properties-and-values': false,
              'prefers-color-scheme-query': false,
              'gap-properties': false,
              'custom-properties': false,
              'place-properties': false,
              'not-pseudo-class': false,
              'focus-visible-pseudo-class': false,
              'focus-within-pseudo-class': false,
              'color-functional-notation': false,
            },
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/style/_mixins.scss";`,
      },
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    vueComponents({
      dts: "./src/typings/vue-component.d.ts",
      resolvers: [ElementPlusResolver()],
    }),
    autoImport({
      dts: "./src/typings/auto-import.d.ts",
      imports: ["vue", "vue-router", "pinia"],
      resolvers: [ElementPlusResolver()],
    }),
    svgBuilder("./src/assets/svg/"),
  ],
  envPrefix: ["VITE_", "TAURI_"],
  esbuild: {
    pure: ["console.log"],
  },
  define: {
    "process.env.TAURI_DEBUG": process.env.TAURI_DEBUG,
  },
  build: {
    target: ["es2021", "chrome100", "safari13"],
    assetsDir: "assets",
    assetsInlineLimit: 8192,
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
      output: {
        chunkFileNames: "js/[name]-chunk.[hash].js",
        entryFileNames: "js/[name]-entry.[hash].js",
      },
    },
  },
});
