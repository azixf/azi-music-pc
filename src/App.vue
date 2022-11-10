<template>
  <router-view v-slot="{ Component }">
    <keep-alive v-if="$route.meta.keepAlive">
      <component :is="Component"></component>
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive"></component>
  </router-view>
</template>

<style scoped>
</style>
