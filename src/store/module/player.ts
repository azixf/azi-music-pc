import { formatDateTime } from "@/lib/utils/common";
import {
  KWLyricInfo,
  LyricInfo,
  MusicInfo,
  MusicPlayState,
  PlayMode,
  SongsListType,
  VolumeState,
} from "@/typings/player";
import { defineStore } from "pinia";
import { apiGetKGMusicLyric, apiGetKWLyric } from "@/api";

export const usePlayerStore = defineStore("player", {
  state() {
    return {
      current_info: {
        id: "", // id
        title: "", // 名称
        src: "", // 地址
        hash: "", // hash
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
        play_time: 0, // 播放时间
        play_time_ms: "", // 播放时间格式化
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
      songsList: [] as Array<SongsListType>, // 歌单列表
      playState: "pause" as MusicPlayState, // 歌曲播放状态
      pre_info: null as MusicInfo | null, // 上一首
      next_info: null as MusicInfo | null // 下一首
    };
  },
  actions: {
    // 播放音乐
    async PLAY_MUSIC(info: MusicInfo) {
      this.current_info = info;
      let isIncluded = false;
      // update currentList
      this.currentList.forEach(item => {
        if (item.id === info.id && item.origin === info.origin) {
          isIncluded = true;
        }
      });
      !isIncluded && this.currentList.unshift(info);

      // update recentList
      let isRecentIncluded = false;
      for (let i = 0; i < this.recentList.length; i++) {
        const current = this.recentList[i];
        if (current.id === info.id && current.origin === info.origin) {
          this.recentList.splice(i, 1);
          const time = +new Date();
          info.play_time = time;
          info.play_time_ms = formatDateTime(time, "YYYY-MM-DD HH:mm");
          this.recentList.unshift(info);
          isRecentIncluded = true;
          break;
        }
      }
      !isRecentIncluded && this.recentList.unshift(info);
      await this.GET_LYRIC();
    },
    // 获取歌词
    async GET_LYRIC(): Promise<void> {
      if (!this.current_info.id) return;
      let result: any = "";
      if (this.current_info.origin === "kugou") {
        const [err, data] = await apiGetKGMusicLyric(this.current_info.hash!);
        if (!err) {
          result = data?.data?.items;
        }
      } else if (this.current_info.origin === "kuwo") {
        const id = (this.current_info.id as string).replace("MUSIC_", "");
        const [err, data] = await apiGetKWLyric(id);
        if (!err) {
          console.log("data: ", data);
          const items = transformLyric(data?.data?.lrclist);
          console.log("items: ", items);
          result = items;
        }
      }
      this.current_info.lyric = result;
    },
    // 修改播放模式
    ON_MODE_CHANGE() {
      const len = this.currentList.length;
      if (!this.current_info.title || [0, 1].includes(len)) return;
      const current_index = this.currentList.findIndex(item => item.title === this.current_info.title && item.origin === this.current_info.origin)
      switch (this.mode) {
        case 'loop':
          if (current_index === len - 1) {
            this.next_info = this.currentList[0]
            this.pre_info = this.currentList[current_index - 1]
          } else if (current_index === 0) {
            this.pre_info = this.currentList[len - 1]
            this.next_info = this.currentList[current_index + 1]
          } else {
            this.pre_info = this.currentList[current_index - 1]
            this.next_info = this.currentList[current_index + 1]
          }
          break;
        case 'order':
          if (current_index === 0) {
            this.pre_info = null
            this.next_info = this.currentList[current_index + 1]
          } else if (current_index === len - 1) {
            this.pre_info = this.currentList[current_index - 1]
            this.next_info = null
          } else {
            this.pre_info = this.currentList[current_index - 1]
            this.next_info = this.currentList[current_index + 1]
          }
          break;
        case 'random':
          const pre_index = Math.floor(Math.random() * len)
          const next_index = Math.floor(Math.random() * len)
          this.pre_info = this.currentList[pre_index]
          this.next_info = this.currentList[next_index]
          break;

        case 'single':
          this.pre_info = this.current_info;
          this.next_info = this.current_info;
          break;
      }
    },
    PLAY_WITH_MODE(type: string) {
      if (type === 'next') {
        if (this.next_info) {
          this.PLAY_MUSIC(this.next_info)
          this.ON_MODE_CHANGE()
        }
      } else {
        if (this.pre_info) {
          this.PLAY_MUSIC(this.pre_info)
          this.ON_MODE_CHANGE()
        }
      }
    }
  },
  persist: {
    paths: [
      "current_info",
      "volume",
      "volumeState",
      "autoplay",
      "mode",
      "remember",
      "lyric",
      "currentList",
      "recentList",
      "favoriteList",
      "songsList",
    ],
  },
});

function transformLyric(lyric: Array<KWLyricInfo>): Array<LyricInfo> {
  const arr: Array<LyricInfo> = [];
  for (let i = 0; i < lyric.length; i++) {
    const { lineLyric, time } = lyric[i];
    arr.push({
      content: lineLyric,
      time: Number(time) * 1000,
    });
  }
  return arr;
}
