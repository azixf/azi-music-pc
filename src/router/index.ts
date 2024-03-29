import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useStore } from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("@/pages/home/index.vue"),
        meta: {
          title: "首页",
          cache: true,
        },
      },
      {
        path: "collection",
        name: "collection",
        component: () => import("@/pages/collection/index.vue"),
        meta: {
          title: "我的喜欢"
        },
      },
      {
        path: "playlist",
        name: "playlist",
        component: () => import("@/pages/playlist/index.vue"),
        meta: {
          title: "播放列表",
          cache: true,
        },
      },
      {
        path: "download",
        name: "download",
        component: () => import("@/pages/download/index.vue"),
        meta: {
          title: "本地与下载",
        },
      },
      {
        path: "recent",
        name: "recent",
        component: () => import("@/pages/recent/index.vue"),
        meta: {
          title: "最近播放",
        },
      },
      {
        path: "search",
        name: "search",
        component: () => import("@/pages/search/index.vue"),
        meta: {
          title: "搜索",
          cache: true
        },
      },
      {
        path: "setting",
        name: "setting",
        component: () => import("@/pages/setting/index.vue"),
        meta: {
          title: "设置",
        },
      },
      {
        path: "songslit",
        name: "songslist",
        component: () => import("@/pages/songslist/index.vue"),
        meta: {
          title: "歌单",
        },
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  const { _router } = useStore();
  _router.current = to;
  if (to.fullPath !== from.fullPath || from.fullPath !== "/") {
    _router.router.previous.push(from);
  }
  next();
});

router.afterEach(() => {
  const content = document.querySelector(".layout-page-content");
  content && (content.scrollTop = 0);
});

export default router;
