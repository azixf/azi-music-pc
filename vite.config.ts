import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import vueComponents from "unplugin-vue-components/vite";
import autoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import electron, { onstart } from "vite-plugin-electron";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  server: process.env.VSCODE_DEBUG
    ? {
        host: pkg.debug.env.VITE_DEV_SERVER_HOSTNAME,
        port: pkg.debug.env.VITE_DEV_SERVER_PORT,
      }
    : undefined,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/style/_mixins.scss";`,
      },
    },
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
    electron({
      main: {
        entry: "electron/main/index.ts",
        vite: {
          build: {
            sourcemap: true,
            outDir: "dist/electron/main",
          },
          plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
        },
      },
      preload: {
        input: {
          index: path.join(__dirname, "electron/preload/index.ts"),
        },
        vite: {
          build: {
            sourcemap: "inline",
            outDir: "dist/electron/preload",
          },
        },
      },
      renderer: {},
    }),
  ],
  esbuild: {
    pure: ["console.log"],
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 8192,
    minify: process.env.NODE_ENV === "production" ? "esbuild" : false,
    sourcemap: process.env.NODE_ENV !== "production"
  },
});
