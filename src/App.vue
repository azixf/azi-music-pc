<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { setTheme } from "./lib/utils/themeUtil";
import { useStore } from "./store";
import { ipcRenderer } from "electron";

const { system } = useStore();
const { onTop } = storeToRefs(system);
onMounted(() => {
  // set custom theme
  const primaryColor = localStorage.primaryColor || "#ec4141";
  setTheme(primaryColor);

  ipcRenderer.send("set-on-top", onTop.value);

  ipcRenderer.send("check-update");
  ipcRenderer.on("update-message", (evt, ...args) => {
    console.log('args: ', args);
  });
});
</script>
