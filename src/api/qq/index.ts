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