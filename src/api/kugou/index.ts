import { http } from '@/lib/utils/request'

// verify music by hash
export const apiVerifyMusicByHash = (hash: string) => {
  return http.get(`/kugou/verify/${hash}`)
}

// get lyric
export const apiGetMusicLyric = (hash: string) => {
  return http.get(`/kugou/getLyricByHash/${hash}`)
}