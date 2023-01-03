import { http } from '@/lib/utils/request';

// 获取焦点图
export const getFocusImages = () => {
  return http.get('/qq/getMultiple/focus')
}

// 获取kuwo推荐歌单
export const getRecommendedList = () => {
  return http.post('/kuwo/rcmPlayList', {
    order: 'new',
    page: 0,
    size: 20
  })
}

// 获取qq推荐歌单
export const getQRecommendedList = () => {
  return http.get('/qq/getMultiple/recomPlaylist') 
}

// 获取kugou最新音乐
export const getKGNewSongs = () => {
  return http.post('/kugou/getNewSongs', {
    type: 1,
    page: 0,
    size: 20
  })
}

// 获取kugou推荐MV
export const getKGMvList = () => {
  return http.get('/kugou/getMVList')
}