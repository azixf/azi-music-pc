import { defineStore } from 'pinia'

export type CloseMethod = 'close' | 'hide' | 'none'

export const useSystemStore = defineStore('system', {
  state() {
    return {
      theme: '',
      primaryColor: '',
      closeType: 'node' as CloseMethod
    }
  },
  getters: {

  },
  actions: {
  },
  persist: true
})