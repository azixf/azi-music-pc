<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { setTheme } from './lib/utils/themeUtil';
import { invoke } from '@tauri-apps/api'

onMounted(() => {
  const primaryColor = localStorage.primaryColor || '#ec4141'
  setTheme(primaryColor)
  setTimeout(async () => {
    await invoke('close_splashscreen')
  }, 2000)
})
</script>


<style>
</style>
