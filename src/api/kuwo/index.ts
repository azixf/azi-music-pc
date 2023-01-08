import { http } from "@/lib/utils/request"
import { KWPlaylistInfoRequest } from "@/typings/api"

// 获取kuwo歌单详情
export const apiGetKWPlaylistInfo = (
  data: KWPlaylistInfoRequest
) => {
  return http.post('/kuwo/palyListInfo', {
    pid: data.pid,
    page: data.page,
    size: data.size
  })
}

// 获取kuwo推荐歌单
export const apiGetKWRecommendedList = () => {
  return http.post('/kuwo/rcmPlayList', {
    order: 'new',
    page: 0,
    size: 20
  })
}

// kuwou搜索提示
export const apiGetKWSearchTips = (keyword: string) => {
  return http.post('/kuwo/searchSelections', {
    key: keyword
  })
}



// kuwo搜索
export const apiKWSearch = (key: string, page: number, size: number) => {
  return http.post('/kuwo/searchByKey', {
    key,
    page,
    size
  })
}