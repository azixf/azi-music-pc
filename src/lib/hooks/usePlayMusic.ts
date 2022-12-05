import { useStore } from "@/store";
import { MusicInfo } from "@/store/module/player";
import { formatDateTime } from "../utils/common";

export const usePlayMusic = () => {
  const { player } = useStore();
  const play = (item: MusicInfo) => {
    item.progress = 0;
    item.time = 0;
    item.time_ms = '0:00';
    const time = +new Date();
    item.play_time = time;
    item.play_time_ms = formatDateTime(new Date(), 'YYYY-MM-DD HH:mm')
    player.PLAY_MUSIC(item);
  }
  return {
    play
  }
}