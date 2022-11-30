<template>
  <el-config-provider :locale="zhCn">
    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.cache" :key="key"></component>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.cache" :key="key"></component>
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
