import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/home/index.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        }
      },
      {
        path: 'playlist',
        component: () => import('@/pages/playlist/index.vue'),
        meta: {
          title: '播放列表',
          keepAlive: true
        }
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router