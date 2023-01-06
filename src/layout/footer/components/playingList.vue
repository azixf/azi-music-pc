<template>
  <div class="playing-list" @click="onVisibleToggled">
    <svg-icon name="musiclist" />
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
        <div class="flex justify-between align-center">
          <div class="text">总共{{ currentList.length }}首</div>
          <div class="flex align-center">
            <div class="m-r-8 cursor flex align-center">
              <font-icon name="add1" size="24" class="m-r-4" />
              <span class="text">收藏全部</span>
            </div>
            <div class="text cursor">清空列表</div>
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
            <el-col :span="12" class="text-ellipsis">
              {{ item.title }}
            </el-col>
            <el-col :span="5" class="text-ellipsis">
              {{ item.singer }}
            </el-col>
            <el-col :span="3">
              {{ item.duration_ms }}
            </el-col>
            <el-col :span="4">
              {{ item.origin }}
            </el-col>
          </el-row>
          <font-icon
            name="pause"
            size="16"
            :cursor="false"
            v-show="item.id === current_info.id && playState === 'playing'"
            class="font-icon"
          />
          <font-icon
            name="playfill"
            size="16"
            :cursor="false"
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
</script>

<style lang="scss" scoped>
.playing-list {
  .svg-icon {
    cursor: pointer;
  }
}
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
    &:hover {
      background-color: #efefef;
    }
    &.gap-bg {
      background-color: #efefef;
    }
    .font-icon {
      position: absolute;
      left: 0;
      top: 0;
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
