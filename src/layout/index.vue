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
      <keep-alive>
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

<script lang='ts'>
import LayoutHeader from './header/index.vue';
import LayoutFooter from './footer/index.vue';
import LayoutNav from './navbar/index.vue';
export default {
  name: 'LayoutPage',
  components: {
    LayoutHeader,
    LayoutFooter,
    LayoutNav
  }
}
</script>

<script lang='ts' setup>
const route = useRoute()
const key = computed(() => {
  const path = route.path
  const query = route.query
  let params = ''
  Object.keys(query).forEach((item) => {
    params +=  `${item}=${query[item]}&`
  })
  return params ? path + '?' + params.slice(0, params.length) : path;
})
</script>

<style lang='scss' scoped>
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
      border-right: 1px solid var(--color-border);
    }
    .layout-page-content {
      flex: 1;
      height: calc(100vh - 118px);
      overflow: auto;
      padding: var(--padding-default) var(--padding-large);
    }
  }
  &-footer {
    height: 64px;
    border-top: 1px solid var(--color-border);
  }
}
</style>
