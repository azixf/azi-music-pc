import { useStore } from "@/store";
import { MusicInfo, MusicOriginType } from "@/typings/player";
import { ElNotification } from "element-plus";

export const useCollection = () => {
  const { player } = useStore();
  const { favoriteList } = storeToRefs(player);

  const addSongToCollection = (music: MusicInfo) => {
    if (isSongExistInCollecton(music.id!, music.origin!)) {
      ElNotification({
        title: "添加失败",
        message: "歌曲已存在到我的喜欢",
        duration: 800,
        type: 'warning'
      });
      return;
    }
    favoriteList.value.unshift(music);
    ElNotification({
      title: "添加成功",
      message: "歌曲已添加到我的喜欢",
      duration: 800,
      type: 'success'
    });
  };

  const removeSongFormCollection = (id: string, origin: MusicOriginType) => {
    const idx = favoriteList.value.findIndex(
      item => item.id === id && item.origin === origin
    );
    if (idx > -1) {
      favoriteList.value.splice(idx, 1);
      ElNotification({
        title: "删除成功",
        message: "歌曲已从我的喜欢移除",
        duration: 800,
        type: 'success'
      });
    }
  };

  const isSongExistInCollecton = (
    id: string | number,
    origin: MusicOriginType
  ) => {
    return favoriteList.value.some(
      item => item.id == id && item.origin === origin
    );
  };

  return {
    addSongToCollection,
    removeSongFormCollection,
    isSongExistInCollecton,
  };
};
