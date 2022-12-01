<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { setTheme } from './lib/utils/themeUtil';
import { invoke } from '@tauri-apps/api'
import { appWindow } from '@tauri-apps/api/window'
import { useStore } from './store';

const { system } = useStore()
const { onTop } = storeToRefs(system)
onMounted(() => {
  const primaryColor = localStorage.primaryColor || '#ec4141'
  setTheme(primaryColor)
  setTimeout(async () => {
    await invoke('close_splashscreen');
    appWindow.setAlwaysOnTop(onTop.value);
  }, 2000)
})
</script>


<style>
</style>
