<template>
  <el-config-provider :locale="zhCn">
    <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.keepAlive">
        <component :is="Component"></component>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive"></component>
    </router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { themes } from './lib/utils/theme';
import { setTheme } from './lib/utils/themeUtil';

const themeObj = ref<any>()

onMounted(() => {
  const theme = localStorage.theme || 'default'
  themeObj.value = (themes as any)[theme]
  setTheme(themeObj)
})
</script>


<style>
</style>
