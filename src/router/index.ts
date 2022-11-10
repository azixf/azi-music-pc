import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/home/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router