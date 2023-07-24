<template>
  <div class="recent-wrapper">
    <div class="flex justify-between align-end">
      <div class="flex align-end">
        <h1 class="recent-title">最近播放</h1>
        <span>总共{{ recentList.length }}首</span>
      </div>
      <el-popconfirm title="确认清空最近播放列表?" @confirm="clearRecentList">
        <template #reference>
          <el-button text>清空列表</el-button>
        </template>
      </el-popconfirm>
    </div>
    <el-button
      class="m-t-16 m-b-10"
      type="primary"
      round
      :disabled="!recentList.length"
      @click="playAll(recentList)"
    >
      <mdi-icon name="play_arrow" class="m-r-8" color="#fff" />
      <span>播放全部</span>
    </el-button>
    <el-table
      :data="recentList"
      highlight-current-row
      stripe
      @row-dblclick="playMusic"
      @row-contextmenu="onContextmenuOpened"
    >
      <el-table-column
        type="index"
        label="序号"
        :index="setIndex"
        width="60"
      ></el-table-column>
      <el-table-column prop="title" label="标题">
        <template #default="{ row }">
          <span v-html="row.title"></span>
        </template>
      </el-table-column>
      <el-table-column prop="singer" label="歌手">
        <template #default="{ row }">
          <span v-html="row.singer"></span>
        </template>
      </el-table-column>
      <el-table-column prop="origin" label="来源"></el-table-column>
      <el-table-column prop="play_time_ms" label="播放时间"></el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
  </div>
  <Contextmenu ref="contextmenuRef"></Contextmenu>
</template>

<script lang="ts">
export default {
  name: "RecentPage",
  components: {
    Contextmenu: defineAsyncComponent(() => import('@/components/common/contextmenu.vue'))
  }
};
</script>

<script lang="ts" setup>
import { usePlayMusic } from "@/lib/hooks/usePlayMusic";
import { useStore } from "@/store";
import { MusicInfo } from "@/typings/player";

const { player } = useStore();
const { recentList } = storeToRefs(player);

const setIndex = (index: number): number => {
  return index + 1;
};

const clearRecentList = () => {
  recentList.value = [];
};

const { play, playAll } = usePlayMusic();
const playMusic = (row: MusicInfo) => {
  console.log('play: ', row);
  
  play(row);
};

const contextmenuRef = ref()
const onContextmenuOpened = (row: MusicInfo, _: any, event: MouseEvent) => {
  contextmenuRef.value.showContextmenu(row, recentList.value, event);
};

</script>

<style lang="scss" scoped>
.recent-title {
  margin: 0 var(--padding-default) 0 0;
}

.recent-play-all {
  height: 32px;
  width: 14vw;
  margin: 16px 0;
  border-radius: 16px;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  span {
    color: #fff;
  }
  &:active {
    filter: brightness(120%);
  }
}
</style>
