<template>
  <header class="layout-header-wrapper flex align-center justify-between">
    <div class="layout-header-logo flex align-center">
      <img src="/logo.png" alt="logo" class="layout-header-logo-img" />
      <strong class="logo-text">4U Music</strong>
    </div>
    <search-box />
    <div class="layout-header-operations">
      <skin-comp />
      <mdi-icon
        name="settings"
        hover
        color="var(--color-header-icon)"
        @click="$router.push({ name: 'setting' })"
      />
      <el-divider direction="vertical" />
      <window-operation />
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: "LayoutHeader",
  components: {
    SkinComp: defineAsyncComponent(() => import("./components/skin.vue")),
    windowOperation: defineAsyncComponent(
      () => import("./components/windowOperation.vue")
    ),
    SearchBox: defineAsyncComponent(() => import("./components/searchBox.vue")),
  },
};
</script>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout-header-wrapper {
  -webkit-app-region: drag;
  height: 100%;
  background: var(--color-primary);
  padding: 0 var(--padding-default);
}

.layout-header-logo {
  -webkit-app-region: no-drag;
  &-img {
    width: 24px;
    height: 24px;
    margin-right: var(--padding-small);
  }
  .logo-text {
    color: #ffffff;
    margin-left: var(--padding-small);
    font-size: 18px;
    font-weight: 600;
    margin-right: 2vw;
  }
}

.layout-header-operations {
  -webkit-app-region: no-drag;
  display: flex;
  align-items: center;
  gap: 0 var(--padding-default);
}
</style>
