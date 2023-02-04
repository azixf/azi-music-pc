<template>
  <Contextmenu name="context-menu">
    <ContextmenuItem @click="playMusic">
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
    <ContextmenuItem v-if="info?.album_name">
      <div class="v-contextmenu-item-content">
        <MdiIcon name="album" />
        <span :title="info?.album_name">
          专辑: {{ info?.album_name }}
        </span>
      </div>
    </ContextmenuItem>
    <ContextmenuItem v-if="info?.singer">
      <div class="v-contextmenu-item-content">
        <MdiIcon name="account_circle" />
        <span :title="info?.singer"> 歌手: {{ info?.singer }} </span>
      </div>
    </ContextmenuItem>
    <ContextmenuSubmenu>
      <template #label>
        <div class="v-contextmenu-item-content">
          <MdiIcon name="post_add" />
          <span>收藏到歌单</span>
        </div>
      </template>
      <ContextmenuItem>
        <div class="v-contextmenu-item-content" @click="addPlaylist">
          <MdiIcon name="playlist_add" />
          <span>新增歌单</span>
        </div>
      </ContextmenuItem>
      <template v-for="item in songsList">
        <ContextmenuItem>
          <div class="v-contextmenu-item-content" @click="addSong(item)">
            <MdiIcon name="queue_music" />
            <span>{{ item.name }}</span>
          </div>
        </ContextmenuItem>
      </template>
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
  <playlist-box v-model="showDialog"></playlist-box>
</template>
<script lang="ts">
export default {
  name: "DemoComp",
};
</script>
<script lang="ts" setup>
import {
  emitContext,
  Contextmenu,
  ContextmenuItem,
  ContextmenuSubmenu,
} from "vue3-contextmenu";

import "@/style/contextmenu.scss";
import { useStore } from "@/store";
import { usePlayMusic } from "@/lib/hooks/usePlayMusic";
import { MusicInfo, SongsListType } from "@/typings/player";
import { usePlaylist } from "@/lib/hooks/userPlaylist";
import { ElMessage } from "element-plus";

const { player } = useStore();
const { songsList } = storeToRefs(player);

const info = ref<MusicInfo>();
const list = ref<Array<MusicInfo>>([]);

// 播放歌曲
const { play } = usePlayMusic();
const playMusic = () => {
  play(info.value!);
};

const { addSongToPlaylist } = usePlaylist()
// 新增歌单
const showDialog = ref(false)
const addPlaylist = () => {
  showDialog.value = true;
}

const addSong = (item: SongsListType) => {
  const res = addSongToPlaylist(item.name, info.value!);
  if (res) {
    ElMessage.success('歌曲添加成功')
  }
}

// 显示右键菜单
function showContextmenu(row: MusicInfo, ls: Array<MusicInfo>, e: MouseEvent) {
  info.value = row;
  list.value = ls;
  emitContext(e, { name: "context-menu" });
}

defineExpose({
  showContextmenu,
});
</script>
<style lang="scss" scoped></style>
