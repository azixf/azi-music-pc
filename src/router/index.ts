import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useStore } from '@/store'

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
          cache: true
        }
      },
      {
        path: 'playlist',
        component: () => import('@/pages/playlist/index.vue'),
        meta: {
          title: '播放列表'
        }
      },
      {
        path: 'download',
        component: () => import('@/pages/download/index.vue'),
        meta: {
          title: '本地与下载'
        }
      },
      {
        path: 'recent',
        component: () => import('@/pages/recent/index.vue'),
        meta: {
          title: '最近播放'
        }
      },
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  const { _router } = useStore()
  _router.current = to
  if (to.fullPath === from.fullPath && from.fullPath === '/') {
    next()
  } else {
    _router.router.previous.push(from)
    next()
  }
})

export default router