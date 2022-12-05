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
    <div class="recent-play-all" @click="playAll">
      <font-icon name="add" class="m-r-8" color="#fff" />
      <span>播放全部</span>
    </div>
    <el-table :data="recentList">
      <el-table-column type="index" label="序号" :index="setIndex" width="60"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="singer" label="歌手"></el-table-column>
      <el-table-column prop="origin" label="来源"></el-table-column>
      <el-table-column prop="play_time" label="播放时间"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
export default {
  name: "RecentPage",
};
</script>

<script lang="ts" setup>
import { usePlayAll } from '@/lib/hooks/usePlayAll';
import { useStore } from '@/store';

const { player } = useStore();
const { recentList } = storeToRefs(player);
const { playAll } = usePlayAll(recentList.value);

const setIndex = (index: number): number => {
  return index + 1;
}

const clearRecentList = () => {
  recentList.value = [];
}
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
