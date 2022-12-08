export interface recommendedListItem {
  id: string;
  img: string;
  name: string;
  uid: string;
  info: string;
}

export interface QRecommendedListItem {
  cover: string;
  listen_num: number;
  rcmdtemplate: string;
  title: string;
  content_id: number;
}

export type AuthorArray = Array<{
  author_id: string;
  author_name: string;
  sizable_cover: string;
}>;

export interface NewSongsItem {
  audio_id: number;
  album_cover: string;
  "320hash"?: string;
  album_id: string;
  authors: AuthorArray;
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

export interface MVListItem {
  album_audio_id: string;
  album_cover: string;
  authors: AuthorArray;
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