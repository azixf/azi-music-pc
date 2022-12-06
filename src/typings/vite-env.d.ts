/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.mjs';

declare module 'axios-tauri-adapter';

declare module 'vue3-contextmenu';

declare module 'postcss-px-to-viewport';