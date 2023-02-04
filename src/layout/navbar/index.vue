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
    <playlist-box v-model="visible"></playlist-box>
  </nav>
</template>

<script lang="ts">
import { VNode } from "vue";
import MdiIcon from "@/components/mdi-icon/index.vue";
import { useStore } from "@/store";
export default {
  name: "LayoutNav",
  components: {
    NavItem: defineAsyncComponent(() => import("./components/navItem.vue")),
  },
};
</script>

<script lang="ts" setup>
const activeIndex = ref(0);

interface NavItemType {
  id: number | string;
  label: string;
  type?: "main" | "second" | "third";
  route?: string;
  prefix?: VNode;
  suffix?: VNode;
}

const visible = ref(false);

const baseItemList = ref<NavItemType[]>([
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
    route: "/collection",
    type: "main",
    prefix: h(
      MdiIcon,
      {
        name: "favorite_border",
      },
      {}
    ),
  },
  {
    id: 3,
    label: "本地与下载",
    route: "/download",
    type: "main",
    prefix: h(MdiIcon, {
      name: "download",
    }),
  },
  {
    id: 4,
    label: "最近播放",
    route: "/recent",
    type: "main",
    prefix: h(MdiIcon, {
      name: "update",
    }),
  },
  {
    id: 5,
    label: "创建歌单",
    type: "second",
    suffix: h(MdiIcon, {
      name: "add",
      hover: true,
      color: "var(--color-subtitle)",
      onclick: () => {
        visible.value = true;
      },
    }),
  },
]);

const navItemList = ref<NavItemType[]>([]);

const router = useRouter();
const onNavItemClick = (item: NavItemType) => {
  if (item.type === "main" && !!item.route) {
    router.push(item.route!);
  } else if (item.type === 'third') {
    router.push({
      name: 'songslist',
      query: {
        name: item.label
      }
    })
  }
};

const routeChangeHandler = () => {
  const query = route.query;
  let params = "";
  Object.keys(query).map((item, index) => {
    params += `${index === 0 ? "" : "&"}${item}=${query[item]}`;
  });
  const path = params ? route.path + "?" + params : route.path;
  console.log("path: ", path);
  const matchedPath = navItemList.value.find(item => item.route === path);
  console.log(matchedPath);
  activeIndex.value =
    typeof matchedPath?.id === "number" ? matchedPath.id ?? -1 : -1;
};

const route = useRoute();
watch(
  () => route,
  () => {
    routeChangeHandler();
  },
  {
    immediate: true,
    deep: true,
  }
);

const { player } = useStore();
const { songsList } = storeToRefs(player);
watch(
  () => songsList.value,
  () => {
    navItemList.value = [...baseItemList.value];
    songsList.value.forEach(item => {
      navItemList.value.push({
        id: item.id,
        label: item.name,
        type: "third",
        prefix: h(MdiIcon, {
          name: 'queue_music',
          hover: true,
          color: 'var(--color-subtitle)'
        })
      });
    });
    routeChangeHandler();
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.layout-nav {
  padding: var(--padding-default) 0 var(--padding-default)
    var(--padding-default);
}
</style>
