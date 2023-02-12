import { http } from "@/lib/utils/request"

// 获取qq歌单详情
export const apiGetQQPlaylistInfo = (id: string) => {
  return http.get(`/qq/getPlaylistIngo/${id}`)
}

// 获取焦点图
export const apiGetQQFocusImages = () => {
  return http.get('/qq/getMultiple/focus')
}

// 获取qq推荐歌单
export const apiGetQQRecommendedList = () => {
  return http.get('/qq/getMultiple/recomPlaylist') 
}

// 根据songmid解析歌曲
export const apiGetQQMusic = (mid: string) => {
  return http.get(`/qq/jiexi/${mid}`)
}

// 根据songmid解析歌词
export const apiGetQQLyric = (mid: string) => {
  return http.get(`/qq/getLyric/${mid}`)
}