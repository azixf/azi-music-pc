<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { setTheme } from "./lib/utils/themeUtil";
import { invoke } from "@tauri-apps/api";
import { appWindow, UserAttentionType } from "@tauri-apps/api/window";
import { useStore } from "./store";

const { system } = useStore();
const { onTop } = storeToRefs(system);
onMounted(() => {
  // set custom theme
  const primaryColor = localStorage.primaryColor || "#ec4141";
  setTheme(primaryColor);

  // prevent using context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  })
  
  setTimeout(async () => {
    // close splash window
    await invoke("close_splashscreen");
    await appWindow.requestUserAttention(UserAttentionType.Informational);
    appWindow.setAlwaysOnTop(onTop.value);
  }, 1500);
});
</script>
