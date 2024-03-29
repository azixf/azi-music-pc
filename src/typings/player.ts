// 音量
export type VolumeState = "muted" | "low" | "high";
// 来源
export type MusicOriginType = "qq" | "kuwo" | "kugou" | "netease";
// 播放状态
export type MusicPlayState = "loading" | "pause" | "playing";

// 通用歌词信息
export interface LyricInfo {
  time: number;
  content: string;
}

// kuwo歌词信息
export interface KWLyricInfo {
  lineLyric: string;
  time: string;
}

// 正在播放歌曲
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

// 播放模式
export type PlayMode = "random" | "loop" | "single" | "order";

// 自建歌单
export interface SongsListType {
  id: string;
  name: string;
  create_at: string;
  update_at: string;
  songs_list: Array<MusicInfo>;
}

// kuwo歌曲信息
export interface KWMusicInfo {
  rid: number;
  musicrid: string;
  album: string;
  albumid: number;
  albumpic: string;
  artist: string;
  artistid: number;
  duration: number;
  hasmv: number;
  name: string;
  pic: string;
  pic120: string;
  songTimeMinutes: string;
  releaseDate: string;
}

// kuwo歌单信息
export interface KWPlaylistInfo {
  desc: string;
  id: number;
  img: string;
  img300: string;
  img500: string;
  img700: string;
  info: string;
  isOfficial: number;
  listencnt: number;
  musicList: Array<KWMusicInfo>;
  name: string;
  tag: string;
  total: number;
  uPic: string;
  uname: string;
  userName: string;
}

// kuwo排行榜菜单信息
export interface KWRankMenuInfo {
  name: string;
  list: Array<{
    id: string;
    intro: string;
    name: string;
    pic: string;
    pub: string;
    source: string;
    sourceid: string;
  }>;
}

// qq歌曲信息
export interface QQMusicInfo {
  albumdesc: string;
  albumid: number;
  albummid: string;
  albumname: string;
  singer: Array<{ id: number; mid: string; name: string }>;
  interval: number;
  songid: number;
  songmid: string;
  songname: string;
  strMediaMid: string;
  pay: { payplay: number, payinfo: number }
}

// qq推荐歌曲信息
export interface QQRecommendedMusicInfo {
  cover: string;
  listen_num: number;
  rcmdtemplate: string;
  title: string;
  content_id: number;
}

// qq歌单信息
export interface QQPlaylistInfo {
  album_pic_mid: string;
  coveradurl: string;
  cur_song_num: number;
  desc: string;
  dissid: number;
  dissname: string;
  headurl: string;
  ifpicurl: string;
  logo: string;
  nick: string;
  nickname: string;
  pic_dpi: string;
  singerid: number;
  songlist: Array<QQMusicInfo>;
  songnum: number;
  total_song_num: number;
  tags: Array<{ id: number; name: string; pid: number }>;
  visitnum: number;
}

// kugou歌曲信息
export interface KGMusicInfo {
  audio_id: number;
  album_cover: string;
  "320hash"?: string;
  album_id: string;
  authors: Array<{
    author_id: string;
    author_name: string;
    sizable_cover: string;
  }>;
  cover: string;
  duration: number;
  filename: string;
  filesize: number;
  hash: string;
  hash_high: string;
  mvhash: string;
  remark: string;
  songname: string;
  sort: number;
}

// kugou mv信息
export interface KGMVInfo {
  album_audio_id: string;
  album_cover: string;
  authors: Array<{
    author_id: string;
    author_name: string;
    sizable_cover: string;
  }>;
  description: string;
  duration: number;
  fhd_filesize: number;
  fhd_hash: string;
  hd_hash: string;
  img: string;
  ld_filesize: string;
  ld_hash: string;
  mvhash: string;
  playcount: number;
  publish: string;
  qhd_filesize: string;
  qhd_hash: string;
  remark: string;
  sd_filesize: string;
  sd_hash: string;
  singername: string;
  title: string;
  videoid: number;
  videoname: string;
}

// kugou歌曲解析信息
export interface KGVerifyInfo {
  author: string;
  avatar: string;
  name: string;
  pic: string;
  url: string;
}
