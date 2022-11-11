import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layout/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router