import {
  emitContext,
  Contextmenu,
  ContextmenuItem,
  ContextmenuSubmenu,
} from "vue3-contextmenu";
import MdiIcon from "@/components/mdi-icon/index.vue";

import "@/style/contextmenu.scss";
import { useStore } from "@/store";
import { usePlayMusic } from "./usePlayMusic";
import { MusicInfo } from "@/typings/player";

export const useContextMenu = () => {
  const { player } = useStore();
  const { songsList } = storeToRefs(player);

  const info = ref<MusicInfo>();
  const { play } = usePlayMusic();
  const playMusic = () => {
    play(info.value!);
  };

  const list = ref<Array<MusicInfo>>([]);
  const playMusicForNext = () => {};

  const deleteMusicInFromList = () => {};

  const contextmenuComponent = {
    name: "ContextmenuComp",
    setup() {
      return () => {
        return (
          <Contextmenu name="context-menu">
            <ContextmenuItem onClick={() => playMusic()}>
              <div class="v-contextmenu-item-content">
                <MdiIcon name="play_circle_outline" />
                <span>播放</span>
              </div>
            </ContextmenuItem>
            <ContextmenuItem divider>
              <div class="v-contextmenu-item-content">
                <MdiIcon name="fast_forward" />
                <span>下一首播放</span>
              </div>
            </ContextmenuItem>
            {info.value?.album_name ? (
              <ContextmenuItem>
                <div class="v-contextmenu-item-content">
                  <MdiIcon name="album" />
                  <span title={info.value?.album_name}>
                    专辑: {info.value?.album_name}
                  </span>
                </div>
              </ContextmenuItem>
            ) : null}
            {info.value?.singer ? (
              <ContextmenuItem>
                <div class="v-contextmenu-item-content">
                  <MdiIcon name="account_circle" />
                  <span title={info.value?.singer}>
                    歌手: {info.value?.singer}
                  </span>
                </div>
              </ContextmenuItem>
            ) : null}
            <ContextmenuSubmenu
              v-slots={{
                label: () => (
                  <div class="v-contextmenu-item-content">
                    <MdiIcon name="post_add" />
                    <span>收藏到歌单</span>
                  </div>
                ),
              }}
            >
              <ContextmenuItem>
                <div class="v-contextmenu-item-content">
                  <MdiIcon name="playlist_add" />
                  <span>新增歌单</span>
                </div>
              </ContextmenuItem>
              {songsList.value.map(item => {
                return (
                  <ContextmenuItem>
                    <div class="v-contextmenu-item-content">
                      <MdiIcon name="queue_music" />
                      <span>歌单名</span>
                    </div>
                  </ContextmenuItem>
                );
              })}
            </ContextmenuSubmenu>
            <ContextmenuItem>
              <div class="v-contextmenu-item-content">
                <MdiIcon name="arrow_circle_down" />
                <span>下载</span>
              </div>
            </ContextmenuItem>
            <ContextmenuItem>
              <div class="v-contextmenu-item-content">
                <MdiIcon name="delete_forever" />
                <span>从列表中删除</span>
              </div>
            </ContextmenuItem>
          </Contextmenu>
        );
      };
    },
  };

  const instance = createApp(contextmenuComponent);
  instance.mount(document.createElement("div"));

  const openContextmenu = (
    row: MusicInfo,
    ls: Array<MusicInfo>,
    e: MouseEvent
  ) => {
    info.value = row;
    list.value = ls;
    emitContext(e, { name: "context-menu" });
  };
  return {
    openContextmenu,
  };
};
