import {
  emitContext,
  Contextmenu,
  ContextmenuItem,
  ContextmenuSubmenu,
} from "vue3-contextmenu";
import FontIcon from "@/components/common/fontIcon.vue";

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
    play(info.value!)
  }
  
  const list = ref<Array<MusicInfo>>([]);
  const playMusicForNext = () => {

  }

  const deleteMusicInFromList = () => {

  }


  const contextmenuComponent = {
    name: "ContextmenuComp",
    setup() {
      return () => {
        return (
          <Contextmenu name="context-menu">
            <ContextmenuItem onClick={() => playMusic()}>
              <div class="v-contextmenu-item-content">
                <FontIcon name="play" size="16" />
                <span>播放</span>
              </div>
            </ContextmenuItem>
            <ContextmenuItem divider>
              <div class="v-contextmenu-item-content">
                <FontIcon name="iconfontplay2" size="16" />
                <span>下一首播放</span>
              </div>
            </ContextmenuItem>
            {info.value?.album_name ? (
              <ContextmenuItem>
                <div class="v-contextmenu-item-content">
                  <FontIcon name="album-line" size="18" />
                  <span>专辑: { info.value?.album_name }</span>
                </div>
              </ContextmenuItem>
            ) : null}
            {info.value?.singer ? (
              <ContextmenuItem>
                <div class="v-contextmenu-item-content">
                  <FontIcon name="person" size="16" />
                  <span>歌手: { info.value?.singer }</span>
                </div>
              </ContextmenuItem>
            ) : null}
            <ContextmenuSubmenu
              v-slots={{
                label: () => (
                  <div class="v-contextmenu-item-content">
                    <FontIcon name="add1" size="18" />
                    <span>收藏到歌单</span>
                  </div>
                ),
              }}
            >
              <ContextmenuItem>
                <div class="v-contextmenu-item-content">
                  <FontIcon name="addto" size="18" />
                  <span>新增歌单</span>
                </div>
              </ContextmenuItem>
              {songsList.value.map(item => {
                return (
                  <ContextmenuItem>
                    <div class="v-contextmenu-item-content">
                      <FontIcon name="music-list" size="18" />
                      <span>歌单名</span>
                    </div>
                  </ContextmenuItem>
                );
              })}
            </ContextmenuSubmenu>
            <ContextmenuItem>
              <div class="v-contextmenu-item-content">
                <FontIcon name="download1" size="16" />
                <span>下载</span>
              </div>
            </ContextmenuItem>
            <ContextmenuItem>
              <div class="v-contextmenu-item-content">
                <FontIcon name="delete" size="18" />
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

  const openContextmenu = (row: MusicInfo, ls: Array<MusicInfo>, e: MouseEvent) => {
    info.value = row;
    list.value = ls;
    emitContext(e, { name: "context-menu" });
  };
  return {
    openContextmenu,
  };
};
