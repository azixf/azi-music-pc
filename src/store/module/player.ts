import { defineStore } from 'pinia'

export type VolumeState = 'none' | 'low' | 'high'

export const usePlayerStore = defineStore('player', {
  state() {
    return {
      volume: 50,
      volumeState: 'low' as VolumeState
    }
  },
  persist: true
})