<template>
  <nav class="layout-nav">
    <nav-item
      v-for="(item, index) in navItemList"
      :label="item.label"
      :active="activeIndex === index"
      :type="item.type"
      :key="item.id"
      @click="onNavItemClick(item)"
    >
      <template #prefix v-if="item.prefix">
        <component :is="item.prefix"></component>
      </template>
      <template #suffix v-if="item.suffix">
        <component :is="item.suffix"></component>
      </template>
    </nav-item>
  </nav>
</template>

<script lang="ts">
import { VNode } from "vue";
import SvgIcon from '@/components/common/svgIcon.vue';
import { usePlaylist } from '@/lib/hooks/userPlaylist';
export default {
  name: "LayoutNav",
  components: {
    NavItem: defineAsyncComponent(() => import('./components/navItem.vue'))
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

usePlaylist()

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
const onNavItemClick = (item: NavItemType) => {
  if (item.type === "main" && !!item.route) {
    router.push(item.route!);
  }
};

const route = useRoute()
watch(() => route, () => {
  const query = route.query
  let params = ''
  Object.keys(query).map((item, index) => {
    params += `${index === 0 ? '' : '&'}${item}=${query[item]}`
  })
  const path = params ? route.path + '?' + params : route.path
  console.log('path: ', path);
  const matchedPath = navItemList.value.find(item => item.route === path)
  console.log(matchedPath);
  activeIndex.value = matchedPath?.id ?? -1
}, {
  immediate: true,
  deep: true
})
</script>

<style lang="scss" scoped>
.layout-nav {
  padding: var(--padding-default) 0 var(--padding-default)
    var(--padding-default);
}
</style>
