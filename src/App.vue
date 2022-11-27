<template>
  <el-config-provider :locale="zhCn">
    <!-- <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.keepAlive">
        <component :is="Component"></component>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive"></component>
    </router-view> -->
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { setTheme } from './lib/utils/themeUtil';


onMounted(() => {
  const primaryColor = localStorage.primaryColor || '#ec4141'
  setTheme(primaryColor)
})
</script>


<style>
</style>
