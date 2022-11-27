import { CustomRouter } from '@/lib/utils/router'
import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'

export const useCustomRouter = defineStore('router', () => {
  const state = reactive({
    router: new CustomRouter(),
    current: {} as RouteLocationNormalized
  })

  return {
    ...toRefs(state)
  }
})