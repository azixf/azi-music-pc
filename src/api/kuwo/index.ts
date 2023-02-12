import { http } from "@/lib/utils/request";
import { KWPlaylistInfoRequest } from "@/typings/api";

// 获取kuwo歌单详情
export const apiGetKWPlaylistInfo = (data: KWPlaylistInfoRequest) => {
  return http.post("/kuwo/palyListInfo", {
    pid: data.pid,
    page: data.page,
    size: data.size,
  });
};

// 获取kuwo推荐歌单
export const apiGetKWRecommendedList = () => {
  return http.post("/kuwo/rcmPlayList", {
    order: "new",
    page: 0,
    size: 20,
  });
};

// kuwou搜索提示
export const apiGetKWSearchTips = (keyword: string) => {
  return http.post("/kuwo/searchSelections", {
    key: keyword,
  });
};

// kuwo搜索
export const apiKWSearch = (key: string, page: number, size: number) => {
  return http.post("/kuwo/searchByKey", {
    key,
    page,
    size,
  });
};

// kuwo获取歌曲或MV
export const apiGetKWSongOrMV = (rid: string, type: "mp3" | "mp4") => {
  return http.post("/kuwo/mvOrMusic", {
    rid,
    type,
  });
};

// kuwo获取歌词
export const apiGetKWLyric = (id: string) => {
  return http.get(`/kuwo/lyric/${id}`);
};

// kuwo获取歌单
export const apiGetKWList = (data: {
  order: 'new' | 'hot',
  page: number,
  size: number
}) => {
  return http.post('/kuwo/rcmPlayList', data)
}

// kuwo获取榜单菜单
export const apiGetKWMenu = () => {
  return http.get('/kuwo/musicMenu')
}

// kuwo获取排行榜歌曲
export const apiGetKWBang = (data: {
  bangId: string,
  page: number,
  size: number
}) => {
  return http.post('/kuwo/musicList', data)
}