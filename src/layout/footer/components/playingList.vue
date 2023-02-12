<template>
  <div class="playing-list" @click="onVisibleToggled">
    <mdi-icon name="queue_music" hover title="播放列表" />
  </div>
  <el-drawer
    v-model="musicListVisivle"
    size="40%"
    :show-close="false"
    custom-class="music-list-drawer"
  >
    <template #header>
      <div class="drawer-header">
        <h2 class="m-b-8">正在播放</h2>
        <div class="flex justify-between align-center m-b-12">
          <div class="text">总共{{ currentList.length }}首</div>
          <div class="flex align-center">
            <div class="m-r-8 cursor flex align-center">
              <el-button round size="small">
                <mdi-icon name="library_add" size="16" />
                <span class="text">收藏全部</span>
              </el-button>
            </div>
            <el-button size="small" round @click="clearCurrentList">
              <mdi-icon size="16" name="delete" />
              清空列表
            </el-button>
          </div>
        </div>
      </div>
    </template>
    <div class="drawer-content">
      <ul v-if="currentList.length > 0">
        <li
          :class="{ 'gap-bg': index % 2 === 1 }"
          v-for="(item, index) in currentList"
          :key="item.hash"
          @click="onMusicListItemClicked(item, index)"
        >
          <el-row :gutter="8" align="middle" style="width: 100%">
            <el-col :span="9" class="text-ellipsis">
              <span v-html="item.title"></span>
            </el-col>
            <el-col :span="10" class="text-ellipsis">
              <span v-html="item.singer"></span>
            </el-col>
            <el-col :span="3">
              {{ item.duration_ms }}
            </el-col>
            <el-col :span="2">
              {{ item.origin }}
            </el-col>
          </el-row>
          <mdi-icon
            name="pause"
            size="14"
            v-show="item.id === current_info.id && playState === 'playing'"
            class="font-icon"
          />
          <mdi-icon
            size="14"
            name="play_arrow"
            v-show="item.id === current_info.id && playState === 'pause'"
            class="font-icon"
          />
        </li>
      </ul>
      <div
        class="tips flex space-center p-t-8 p-b-8"
        v-if="currentList.length > 0"
      >
        --到底了--
      </div>
      <el-empty description="暂无数据" v-else></el-empty>
    </div>
  </el-drawer>
</template>

<script lang="ts">
export default {
  name: "PlayingList",
};
</script>

<script lang="ts" setup>
import { usePlayMusic } from "@/lib/hooks/usePlayMusic";
import { useStore } from "@/store";
import { MusicInfo } from "@/typings/player";

const { player } = useStore();
const { currentList, current_info, playState } = storeToRefs(player);

const musicListVisivle = ref(false);

const onVisibleToggled = () => {
  musicListVisivle.value = true;
};

const { play } = usePlayMusic();
const onMusicListItemClicked = (item: MusicInfo, idx: number) => {
  play(item);
};

const clearCurrentList = () => {
  currentList.value = currentList.value.filter(
    item =>
      item.id === current_info.value.id &&
      item.origin === current_info.value.origin
  );
};
</script>

<style lang="scss" scoped>
.text {
  font-size: var(--font-small);
  color: var(--color-text);
}

.drawer-content {
  li {
    width: 100%;
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 var(--padding-default);
    font-size: var(--font-default);
    &:hover {
      background-color: #efefef;
    }
    &.gap-bg {
      background-color: #efefef;
    }
    .font-icon {
      position: absolute;
      left: 0;
      top: 8px;
    }
  }
  .tips {
    color: var(--color-text);
  }
}
</style>
<style lang="scss">
.el-drawer.music-list-drawer {
  .el-drawer__header {
    margin-bottom: 0;
    box-shadow: 0 1px 4px var(--color-border);
  }
  .el-drawer__body {
    padding: 0;
  }
}
</style>
