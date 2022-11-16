import { defineStore } from 'pinia'

export type VolumeState = 'muted' | 'low' | 'high'

export const usePlayerStore = defineStore('player', {
  state() {
    return {
      volume: 50, // 音量
      volumeState: 'low' as VolumeState, // 音量状态高、低、静音
      lyric: false, // 是否显示歌词
      currentList: [], // 正在播放列表
      recentList: [], // 最近播放
      favoriteList: [], // 我的收藏
      songsList: [], // 歌单列表
    }
  },
  persist: true
})