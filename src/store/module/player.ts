import { formatDateTime, formatTime } from "@/lib/utils/common";
import {
  KGMusicInfo,
  KWLyricInfo,
  KWMusicInfo,
  LyricInfo,
  MusicInfo,
  MusicOriginType,
  MusicPlayState,
  PlayMode,
  QQMusicInfo,
  SongsListType,
  VolumeState,
} from "@/typings/player";
import { defineStore } from "pinia";
import {
  apiGetKGMusicLyric,
  apiGetKWLyric,
  apiGetKWSongOrMV,
  apiGetQQLyric,
  apiGetQQMusic,
  apiKGVerifyMusicByHash,
} from "@/api";
import { ElMessage } from "element-plus";
import { parseLrc } from "@/lib/utils/lyric";

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
      next_info: null as MusicInfo | null, // 下一首
    };
  },
  actions: {
    // 播放音乐
    async PLAY_MUSIC(info: MusicInfo) {
      let result: { src: string; pic: string } | undefined;
      if (!info.src || info.origin === 'qq') {
        result = await this.GET_MUSIC_SRC(info.hash!, info.origin!);
      }
      if (result) {
        info.src = result.src;
        result.pic && (info.cover = result.pic);
      }
      info.time = 0
      info.time_ms = "0.00"
      info.progress = 0
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
    // 修改播放模式
    ON_MODE_CHANGE() {
      const len = this.currentList.length;
      if (!this.current_info.title || [0, 1].includes(len)) return;
      const current_index = this.currentList.findIndex(
        item =>
          item.title === this.current_info.title &&
          item.origin === this.current_info.origin
      );
      switch (this.mode) {
        case "loop":
          if (current_index === len - 1) {
            this.next_info = this.currentList[0];
            this.pre_info = this.currentList[current_index - 1];
          } else if (current_index === 0) {
            this.pre_info = this.currentList[len - 1];
            this.next_info = this.currentList[current_index + 1];
          } else {
            this.pre_info = this.currentList[current_index - 1];
            this.next_info = this.currentList[current_index + 1];
          }
          break;
        case "order":
          if (current_index === 0) {
            this.pre_info = null;
            this.next_info = this.currentList[current_index + 1];
          } else if (current_index === len - 1) {
            this.pre_info = this.currentList[current_index - 1];
            this.next_info = null;
          } else {
            this.pre_info = this.currentList[current_index - 1];
            this.next_info = this.currentList[current_index + 1];
          }
          break;
        case "random":
          const pre_index = Math.floor(Math.random() * len);
          const next_index = Math.floor(Math.random() * len);
          this.pre_info = this.currentList[pre_index];
          this.next_info = this.currentList[next_index];
          break;

        case "single":
          this.pre_info = this.current_info;
          this.next_info = this.current_info;
          break;
      }
    },
    // 下一首、上一首播放
    PLAY_WITH_MODE(type: string) {
      if (type === "next") {
        if (this.next_info) {
          this.PLAY_MUSIC(this.next_info);
          this.ON_MODE_CHANGE();
        } else {
          ElMessage.warning("没有下一曲");
        }
      } else {
        if (this.pre_info) {
          this.PLAY_MUSIC(this.pre_info);
          this.ON_MODE_CHANGE();
        } else {
          ElMessage.warning("没有上一曲");
        }
      }
    },
    // 将不同类型的歌曲信息转换成通用MusicInfo类型
    GET_MUSIC_INFO(row: QQMusicInfo | KGMusicInfo | KWMusicInfo): MusicInfo {
      let music_info: MusicInfo = {};
      if ("musicrid" in row) {
        const time = +new Date();
        music_info = {
          id: row.musicrid,
          title: row.name,
          src: "",
          hash: row.rid + "",
          singer: row.artist,
          detail: "",
          cover: row.pic,
          time: 0,
          time_ms: "0.00",
          duration: row.duration,
          progress: 0,
          duration_ms: row.songTimeMinutes,
          album_name: row.album,
          album_id: row.albumid,
          mv: "",
          origin: "kuwo",
          lyric: "",
          play_time: time,
          play_time_ms: formatDateTime(time, "YYYY-MM-DD HH:mm"),
        };
      } else if ("strMediaMid" in row) {
        let singer = "";
        if (row.singer && row.singer.length) {
          row.singer.forEach(item => {
            singer += item.name + ";";
          });
          singer = singer.slice(0, singer.length - 1);
        }
        const time = +new Date();
        music_info = {
          id: row.songid,
          title: row.songname,
          src: "",
          hash: row.songmid,
          singer,
          detail: "",
          cover: "",
          time: 0,
          time_ms: "0.00",
          duration: row.interval,
          progress: 0,
          duration_ms: formatTime(row.interval),
          album_id: row.albummid,
          album_name: row.albumname,
          mv: "",
          origin: "qq",
          lyric: "",
          play_time: time,
          play_time_ms: formatDateTime(time, "YYYY-MM-DD HH:mm"),
        };
      } else if ("hash" in row) {
        const time = +new Date();
        music_info = {
          id: row.audio_id,
          title: row.songname,
          src: "",
          hash: row.hash_high || row.hash,
          singer: row.authors[0].author_name,
          singer_id: row.authors[0].author_id,
          detail: row.remark,
          cover: row.album_cover.replace("{size}", "480"),
          time: 0,
          time_ms: "",
          duration: row.duration,
          duration_ms: formatTime(row.duration, true),
          album_id: row.album_id,
          album_name: "",
          mv_id: "",
          mv: row.mvhash,
          origin: "kugou",
          lyric: "",
          progress: 0,
          play_time: time,
          play_time_ms: formatDateTime(time, "YYYY-MM-DD HH:mm"),
        };
      }
      return music_info;
    },
    // 获取歌曲播放链接
    async GET_MUSIC_SRC(
      hash: string,
      origin: MusicOriginType
    ): Promise<{ src: string; pic: string } | undefined> {
      let src = "";
      let pic = "";
      if (origin === "kuwo") {
        const [err, data] = await apiGetKWSongOrMV(hash + "", "mp3");
        if (!err) {
          src = data?.data || "";
        }
        if (!src) {
          ElMessage.warning("该歌曲不支持播放");
          return;
        }
      } else if (origin === "qq") {
        const [err, data] = await apiGetQQMusic(hash);
        if (!err) {
          if (data?.data) {
            src = data.data.url;
            pic = data.data.pic;
          }
        }
        if (!src) {
          ElMessage.warning("该歌曲不支持播放");
          return;
        }
      } else if (origin === "kugou") {
        const [err, data] = await apiKGVerifyMusicByHash(hash);
        if (!err) {
          if (data?.data) {
            src = data.data.url;
            pic = data.data.pic;
          }
        }
        if (!src) {
          ElMessage.warning("该歌曲不支持播放");
          return;
        }
      }
      return {
        src,
        pic,
      };
    },
    // 获取不同平台歌曲的歌词并格式化
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
          const items = transformKWLyric(data?.data?.lrclist);
          result = items;
        }
      } else if (this.current_info.origin === "qq") {
        const [err, res] = await apiGetQQLyric(this.current_info.hash!);
        if (!err) {
          if ((res as any).lyric) {
            result = parseLrc((res as any).lyric).items;
          }
        }
      }

      function transformKWLyric(lyric: Array<KWLyricInfo>): Array<LyricInfo> {
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

      this.current_info.lyric = result;
    },
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
