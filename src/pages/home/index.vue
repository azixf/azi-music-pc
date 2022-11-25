<template>
  <div class="home-page">
    <el-tabs v-model="actab" @tab-click="onTabClick">
      <el-tab-pane v-for="tab in tabList" :name="tab.name">
        <template #label>
          <div :class="['custom-label', { active: actab === tab.name }]">{{ tab.label }}</div>
        </template>
        <component :is="tab.component"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'HomePage',
}
</script>

<script lang='ts' setup>
import { TabsPaneContext } from 'element-plus';

const tabList = [
  {
    label: '热门推荐',
    name: 'recommended',
    component: defineAsyncComponent(() => import('./components/recommend.vue'))
  },
  {
    label: '歌单',
    name: 'list',
    component: defineAsyncComponent(() => import('./components/list.vue'))
  },
  {
    label: '排行榜',
    name: 'rank',
    component: defineAsyncComponent(() => import('./components/rank.vue'))
  },
  {
    label: '歌手',
    name: 'singer',
    component: defineAsyncComponent(() => import('./components/singer.vue'))
  },
  {
    label: '最新音乐',
    name: 'newest',
    component: defineAsyncComponent(() => import('./components/newest.vue'))
  },
]

const actab = ref('recommended')
const onTabClick = (tab: TabsPaneContext, event: Event) => { 
  console.log(tab, event);
}
</script>

<style lang='scss' scoped>
.custom-label.active {
  font-size: var(--font-large);
  font-weight: var(--font-weight-600);
}
</style>
