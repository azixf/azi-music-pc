<template>
  <div class="layout-page">
    <div class="layout-page-header">
      <LayoutHeader />
    </div>
    <div class="layout-page-center">
      <div class="layout-page-nav">
        <LayoutNav />
      </div>
      <div class="layout-page-content">
          <router-view v-slot="{ Component }">
            <keep-alive :max="50">
              <component :is="Component" v-if="$route.meta.cache" :key="key"></component>
            </keep-alive>
            <component :is="Component" v-if="!$route.meta.cache" :key="key"></component>
          </router-view>
      </div>
    </div>
    <div class="layout-page-footer">
      <LayoutFooter />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayoutPage",
  components: {
    LayoutHeader: defineAsyncComponent(() => import("./header/index.vue")),
    LayoutFooter: defineAsyncComponent(() => import("./footer/index.vue")),
    LayoutNav: defineAsyncComponent(() => import("./navbar/index.vue")),
  },
};
</script>

<script lang="ts" setup>
const route = useRoute();
const key = computed(() => {
  const path = route.path;
  const query = route.query;
  let params = "";
  Object.keys(query).forEach(item => {
    params += `${item}=${query[item]}&`;
  });
  return params ? path + "?" + params.slice(0, params.length) : path;
});
</script>

<style lang="scss" scoped>
.layout-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  &-header {
    height: 54px;
  }
  &-center {
    display: flex;
    flex: 1;
    .layout-page-nav {
      width: 200px;
      height: calc(100vh - 118px);
      border-right: 1px solid var(--color-border);
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .layout-page-content {
      flex: 1;
      height: calc(100vh - 118px);
      overflow: hidden auto;
      padding: var(--padding-default) var(--padding-large);
    }
  }
  &-footer {
    height: 64px;
    border-top: 1px solid var(--color-border);
  }
}


</style>
