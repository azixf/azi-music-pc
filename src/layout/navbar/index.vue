<template>
  <nav class="layout-nav">
    <!-- <nav-item label="发现音乐" active></nav-item>
    <nav-item label="私人FM"></nav-item>
    <nav-item label="我的音乐" type="second"></nav-item>
    <nav-item label="我喜欢的音乐">
      <template #prefix>
        <svg-icon name="heart" size="18px" />
      </template>
    </nav-item>
    <nav-item label="本地与下载">
      <template #prefix>
        <svg-icon name="download" size="18px" />
      </template>
    </nav-item>
    <nav-item label="最近播放">
      <template #prefix>
        <svg-icon name="recent" size="18px" style="transform: scale(1.6);" />
      </template>
    </nav-item>
    <nav-item label="创建歌单" type="second">
      <template #suffix>
        <svg-icon name="add" size="14px" color="var(--color-subtitle)" />
      </template>
    </nav-item> -->
    <nav-item
      v-for="(nav, index) in navItemList"
      :label="nav.label"
      :active="activeIndex === index"
      :type="nav.type"
      @click="onNavItemClick(nav, index)"
    >
      <template #prefix v-if="nav.prefix">
        <component :is="nav.prefix"></component>
      </template>
      <template #suffix v-if="nav.suffix">
        <component :is="nav.suffix"></component>
      </template>
    </nav-item>
  </nav>
</template>

<script lang="ts">
import { VNode } from "vue";
import NavItem from "./components/navItem.vue";
import SvgIcon from "@/components/common/svgIcon.vue";
export default {
  name: "LayoutNav",
  components: {
    NavItem,
    SvgIcon
  },
};
</script>

<script lang="ts" setup>
const activeIndex = ref(0);

interface NavItemType {
  id: number;
  label: string;
  type?: "main" | "second";
  route?: string;
  prefix?: VNode;
  suffix?: VNode;
}

const navItemList = ref<NavItemType[]>([
  {
    id: 0,
    label: "发现音乐",
    type: "main",
    route: "/",
  },
  {
    id: 1,
    label: "我的音乐",
    type: "second",
  },
  {
    id: 2,
    label: "我喜欢的音乐",
    route: "/playlist?type=favorite",
    type: "main",
    prefix: h(SvgIcon, {
      name: 'heart',
      size: '18px'
    }, {}),
  },
  {
    id: 3,
    label: "本地与下载",
    route: "/download",
    type: "main",
    prefix: h(SvgIcon, {
      name: 'download',
      size: '18px'
    })
  },
  {
    id: 4,
    label: "最近播放",
    route: "/recent",
    type: "main",
    prefix: h(SvgIcon, {
      name: 'recent',
      size: '18px',
      style: {
        transform: 'scale(1.6)'
      }
    })
  },
  {
    id: 5,
    label: "创建歌单",
    type: "second",
    suffix: h(SvgIcon, {
      name: 'add',
      size: '14px',
      color: 'var(--color-subtitle)',
      onclick: () => {
        console.log('add')
      }
    })
  },
]);

const router = useRouter();
const onNavItemClick = (item: NavItemType, index: number) => {
  if (item.type === "main" && item.route) {
    activeIndex.value = index;
    router.push(item.route);
  }
};
</script>

<style lang="scss" scoped>
.layout-nav {
  padding: var(--padding-default) 0 var(--padding-default)
    var(--padding-default);
}
</style>
