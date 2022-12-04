import { getKeys } from "@/lib/utils/common";
import { defineStore } from "pinia";

export type VolumeState = "muted" | "low" | "high";
export type MusicOriginType = "qq" | "kuwo" | "kugou" | "netease";
export type MusicPlayState = "loading" | "pause" | "playing";
export interface MusicInfo {
  id?: string | number; // id
  title?: string; // 名称
  src?: string; // 地址
  singer?: string; // 歌手
  singer_id?: string; // 歌手id
  detail?: string; // 详情
  cover?: string; // 封面
  time?: number; // 播放进度
  time_ms?: string; // 播放进度 mm:ss
  progress?: number,
  duration?: number; // 时长
  duration_ms?: string; // 时长 mm:ss
  album_name?: string; // 专辑名称
  album_id?: string | number; // 专辑id
  mv_id?: string | number; // mv id
  mv?: string; // mv地址
  origin?: MusicOriginType; // 来源
  lyric?: string; // 歌词
}

export type PlayMode = "random" | "loop" | "single" | "order";

export const usePlayerStore = defineStore("player", {
  state() {
    return {
      current_info: {
        id: "", // id
        title: "", // 名称
        src: "", // 地址
        singer: "", // 歌手
        detail: "", // 详情
        cover: "", // 封面
        time: 0, // 播放进度 - 时间
        time_ms: "0.00", // 播放进度 mm:ss
        duration: 0, // 时长
        progress: 0, // 进度条进度 - 百分比
        duration_ms: "0.00", // 时长 mm:ss
        album_name: "", // 专辑名称
        album_id: "", // 专辑id
        mv: "", // mv地址
        origin: undefined, // 来源
        lyric: "", // 歌词
      } as MusicInfo,
      volume: 50, // 音量
      volumeState: "low" as VolumeState, // 音量状态高、低、静音
      autoplay: false, // 是否自动播放
      mode: "order" as PlayMode, // 循环播放
      remember: false, // 记住进度
      lyric: false, // 是否显示歌词
      currentList: [] as Array<MusicInfo>, // 正在播放列表
      recentList: [] as Array<MusicInfo>, // 最近播放
      favoriteList: [] as Array<MusicInfo>, // 我的收藏
      songsList: [], // 歌单列表
      playState: "pause" as MusicPlayState, // 歌曲播放状态
    };
  },
  actions: {
    PLAY_MUSIC(info: Required<MusicInfo>) {
      this.current_info = info;
      let isIncluded = false;
      this.currentList.forEach((item) => {
        if (item.id === info.id && item.origin === info.origin) {
          isIncluded = true;
        }
      })
      !isIncluded && this.currentList.unshift(info);
    },
    UPDATE_MUSIC_INFO(id: string, info: MusicInfo) {
      if (id === this.current_info.id) {
        getKeys(info).forEach((key) => {
          this.current_info[key] = info[key] as any
        })
      }
    }
  },
  persist: true,
});
