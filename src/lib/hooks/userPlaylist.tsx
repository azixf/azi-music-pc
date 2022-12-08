import { useStore } from "@/store"
import { MusicInfo } from "@/typings/player";
import { v4 as UUID4  } from 'uuid';

export const usePlaylist = () => {
  const { player } = useStore();
  const { songsList } = storeToRefs(player);

  const isPlaylistExists = (name: string) => {
    return songsList.value.findIndex(() => {

    })
  }

  const createPlaylist = (name: string) => {

    const id = UUID4();
  }

  const addSongToPlaylist = () => {

  }

  const removePlaylist = () => {

  }

  const removeSongFromPlayList = () => {

  }

  const isSongInPlaylist = (song: MusicInfo, plId: string) => {

  }

  const getSongsList = () => {
    return songsList.value;
  }

  return {
    createPlaylist,
    addSongToPlaylist,
    removePlaylist,
    removeSongFromPlayList,
    isSongInPlaylist,
    getSongsList
  }
}