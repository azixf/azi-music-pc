<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.keepAlive">
        <component :is="Component"></component>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive"></component>
    </router-view>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { GlobalThemeOverrides } from 'naive-ui'
const themeOverrides = ref<GlobalThemeOverrides>({
  common: {
    primaryColor: ''
  }
})

onMounted(() => {
  const primaryColor = getComputedStyle(document.body).getPropertyValue('--color-primary')
  themeOverrides.value.common!.primaryColor = primaryColor
})
</script>


<style>
</style>
