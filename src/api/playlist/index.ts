import { http } from "@/lib/utils/request"

interface KWPlaylistInfoRequest {
  pid: string | number,
  page: number,
  size: number
}
// 获取库硪歌单详情
export const apiGetKWPlaylistInfo = (
  data: KWPlaylistInfoRequest
) => {
  return http.post('/kuwo/palyListInfo', {
    pid: data.pid,
    page: data.page,
    size: data.size
  })
}

// 获取q鹅歌单详情
export const apiGetQEPlaylistInfo = (id: string) => {
  return http.get(`/qq/getPlaylistIngo/${id}`)
}