import { useStore } from "@/store";
import { MusicInfo } from "@/typings/player";
import { formatDateTime } from "../utils/common";
import {
  ElMessageBox,
  ElRadio,
  ElRadioGroup,
  MessageBoxData,
} from "element-plus";

export const usePlayMusic = () => {
  const { player } = useStore();
  const { currentList } = storeToRefs(player);

  const play = (item: MusicInfo) => {
    item.progress = 0;
    item.time = 0;
    item.time_ms = "0:00";
    const time = +new Date();
    item.play_time = time;
    item.play_time_ms = formatDateTime(new Date(), "YYYY-MM-DD HH:mm");
    player.PLAY_MUSIC(item);
  };

  const playAllMode = ref("1");
  const playAll = (list: Array<MusicInfo>) => {
    ElMessageBox({
      title: "播放提示",
      message: () => {
        return (
          <ElRadioGroup v-model={playAllMode.value}>
            <ElRadio label="1">加入到播放列表</ElRadio>
            <ElRadio label="2">直接替换播放列表</ElRadio>
          </ElRadioGroup>
        );
      },
    })
      .then((result: MessageBoxData) => {
        if (result === "confirm") {
          if (playAllMode.value === "1") {
            const arr: Array<MusicInfo> = [];
            list.forEach((item, index) => {
              if (
                currentList.value.findIndex(
                  currentItem =>
                    currentItem.id === item.id &&
                    currentItem.origin === item.origin
                ) < 0
              ) {
                currentList.value.splice(index, 1);
                arr.push(item);
              }
            });
            currentList.value = arr.concat(currentList.value);
          } else {
            currentList.value = list;
          }
          const item = currentList.value[0];
          play(item);
        }
      })
      .catch(e => e);
  };

  return {
    play,
    playAll,
  };
};
