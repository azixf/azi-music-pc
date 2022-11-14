import { defineStore } from 'pinia'

export type CloseMethod = 'close' | 'hide' | 'none'

export const useSystemStore = defineStore('system', {
  state() {
    return {
      theme: 'default',
      primaryColor: '#ec4141',
      closeType: 'none' as CloseMethod
    }
  },
  getters: {

  },
  actions: {
  },
  persist: true
})