import { http } from '@/lib/utils/request'

// verify music by hash
export const apiKGVerifyMusicByHash = (hash: string) => {
  return http.get(`/kugou/verify/${hash}`)
}

// get lyric
export const apiGetKGMusicLyric = (hash: string) => {
  return http.get(`/kugou/getLyricByHash/${hash}`)
}

// 获取kugou最新音乐
export const apiGetKGNewSongs = () => {
  return http.post('/kugou/getNewSongs', {
    type: 1,
    page: 0,
    size: 20
  })
}

// 获取kugou推荐MV
export const apiGetKGMvList = () => {
  return http.get('/kugou/getMVList')
}