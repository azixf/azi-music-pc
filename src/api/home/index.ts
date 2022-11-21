import { get, post } from '@/lib/request/request';

// 获取焦点图
export const getFocusImages = () => {
  return get('/qq/getMultiple/focus')
}

// 获取库硪推荐歌单
export const getRecommendedList = () => {
  return post('/kuwo/getRecommendSongList', {
    id: 'rcm',
    page: 0,
    size: 10
  })
}

// 获取Q鹅推荐歌单
export const getQRecommendedList = () => {
  return get('/qq/getMultiple/recomPlaylist') 
}