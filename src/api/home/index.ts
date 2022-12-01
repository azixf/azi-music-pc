import { http } from '@/lib/request/request';

// 获取焦点图
export const getFocusImages = () => {
  return http.get('/qq/getMultiple/focus')
}

// 获取库硪推荐歌单
export const getRecommendedList = () => {
  return http.post('/kuwo/rcmPlayList', {
    order: 'new',
    page: 0,
    size: 20
  })
}

// 获取Q鹅推荐歌单
export const getQRecommendedList = () => {
  return http.get('/qq/getMultiple/recomPlaylist') 
}

// 获取库苟最新音乐
export const getKGNewSongs = () => {
  return http.post('/kugou/getNewSongs', {
    type: 1,
    page: 0,
    size: 20
  })
}

// 获取推荐MV
export const getKGMvList = () => {
  return http.get('/kugou/getMVList')
}