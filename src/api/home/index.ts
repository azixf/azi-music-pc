import { get, post } from '@/lib/request/request';

// 获取推荐歌单
export const getRecommendedList = () => {
  return post('/kuwo/getRecommendSongList', {
    id: 'rcm',
    page: 0,
    size: 10
  })
}