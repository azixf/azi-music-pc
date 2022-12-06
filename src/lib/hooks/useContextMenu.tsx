import {
  emitContext,
  Contextmenu,
  ContextmenuItem,
  ContextmenuSubmenu,
} from "vue3-contextmenu";
import FontIcon from "@/components/common/fontIcon.vue";
import { MusicInfo } from "@/store/module/player";

import "@/style/_contextmenu.scss";

export const useContextMenu = () => {
  const contextmenuComponent = {
    name: "ContextmenuComp",
    setup() {
      return () => {
        return (
          <Contextmenu name="context-menu">
            <ContextmenuItem>
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
            <ContextmenuItem>
              <div class="v-contextmenu-item-content">
                <FontIcon name="album-line" size="18" />
                <span>专辑</span>
              </div>
            </ContextmenuItem>
            <ContextmenuItem>
              <div class="v-contextmenu-item-content">
                <FontIcon name="person" size="16" />
                <span>歌手</span>
              </div>
            </ContextmenuItem>
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
                  <span>添加到歌单</span>
                </div>
              </ContextmenuItem>
              <ContextmenuItem>
                <div class="v-contextmenu-item-content">
                  <FontIcon name="music-list" size="18" />
                  <span>歌单名</span>
                </div>
              </ContextmenuItem>
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

  const openContextmenu = (row: MusicInfo, e: MouseEvent) => {
    emitContext(e, { name: "context-menu"});
  };
  return {
    openContextmenu,
  };
};
