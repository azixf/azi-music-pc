// kuwo
export interface MusicListItem {
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

export interface PlaylistInfoData {
  desc: string;
  id: number;
  img: string;
  img300: string;
  img500: string;
  img700: string;
  info: string;
  isOfficial: number;
  listencnt: number;
  musicList: Array<MusicListItem>;
  name: string;
  tag: string;
  total: number;
  uPic: string;
  uname: string;
  userName: string;
}

// qq
export interface QQSongList  {
  albumdesc: string,
  albumid: number,
  albummid: string,
  albumname: string,
  singer: Array<{ id: number, mid: string, name: string }>,
  interval: number,
  songid: number,
  songmid: string,
  songname: string,
  strMediaMid: string
}

export interface QQPlaylistInfoData {
  album_pic_mid: string,
  coveradurl: string,
  cur_song_num: number,
  desc: string,
  dissid: number,
  dissname: string,
  headurl: string,
  ifpicurl: string,
  logo: string,
  nick: string,
  nickname: string,
  pic_dpi: string,
  singerid: number,
  songlist: Array<QQSongList>,
  songnum: number,
  total_song_num: number,
  tags: Array<{id: number, name: string, pid: number}>,
  visitnum: number
}