export type VolumeState = "muted" | "low" | "high";
export type MusicOriginType = "qq" | "kuwo" | "kugou" | "netease";
export type MusicPlayState = "loading" | "pause" | "playing";

export interface LyricInfo {
  time: number,
  content: string
}

export interface KWLyricInfo  {
  lineLyric: string
  time: string
}

export interface MusicInfo {
  id?: string | number; // id
  title?: string; // 名称
  src?: string; // 地址
  hash?: string; // hash
  singer?: string; // 歌手
  singer_id?: string; // 歌手id
  detail?: string; // 详情
  cover?: string; // 封面
  time?: number; // 播放进度
  time_ms?: string; // 播放进度 mm:ss
  progress?: number;
  duration?: number; // 时长
  duration_ms?: string; // 时长 mm:ss
  album_name?: string; // 专辑名称
  album_id?: string | number; // 专辑id
  mv_id?: string | number; // mv id
  mv?: string; // mv地址
  origin?: MusicOriginType; // 来源
  lyric?: string | Array<LyricInfo>; // 歌词
  play_time?: number;
  play_time_ms?: string;
}

export type PlayMode = "random" | "loop" | "single" | "order";

export interface SongsListType {
  id: string;
  name: string;
  create_at: string;
  update_at: string;
  songs_list: Array<MusicInfo>;
}
