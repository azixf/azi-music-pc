import { useStore } from "@/store";
import { MusicInfo, SongsListType } from "@/typings/player";
import { ElMessage } from "element-plus";
import { v4 as UUID4 } from "uuid";
import { formatDateTime } from "../utils/common";

export const usePlaylist = () => {
  const { player } = useStore();
  const { songsList } = storeToRefs(player);

  const createPlaylist = (name: string) => {
    const isExists = !!_findPlaylistByName(name);
    if (isExists) {
      ElMessage.warning("已存在同名歌单，请重新创建");
      return false;
    }
    const date = formatDateTime(+new Date(), "YYYY-MM-DD HH:mm");
    const newSongsList: SongsListType = {
      id: UUID4(),
      name,
      create_at: date,
      update_at: date,
      songs_list: [],
    };
    songsList.value.push(newSongsList);
    return true;
  };

  const addSongToPlaylist = (name: string, song: MusicInfo) => {
    const playlist = _findPlaylistByName(name);
    if (!playlist) {
      ElMessage.error("歌单不存在");
      return false;
    }
    const { songs_list } = playlist;
    if (!!_ifSongInPlaylist(song, songs_list)) {
      ElMessage.warning("歌曲已存在");
      return false;
    }
    songs_list.unshift(song);
    return true;
  };

  const _findPlaylistByName = (name: string) => {
    return songsList.value.find(item => item.name === name);
  };

  const removePlaylist = (name: string) => {
    const index = songsList.value.findIndex(item => item.name === name);
    if (index > -1) {
      songsList.value.splice(index, 1);
    }
  };

  const removeSongFromPlayList = (song: MusicInfo, name: string) => {
    const playlist = _findPlaylistByName(name);
    if (!!playlist) {
      const index = _ifSongInPlaylist(song, playlist.songs_list);
      if (index > -1) {
        playlist.songs_list.splice(index);
      }
    }
  };

  const _ifSongInPlaylist = (song: MusicInfo, pl: Array<MusicInfo>) => {
    return pl.findIndex(
      item => item.id === song.id && item.origin === song.origin
    );
  };

  const getSongsList = () => {
    return songsList.value;
  };

  return {
    createPlaylist,
    addSongToPlaylist,
    removePlaylist,
    removeSongFromPlayList,
    getSongsList
  };
};
