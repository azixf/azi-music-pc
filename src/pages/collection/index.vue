<template>
  <div class="playlist-wrapper">
    <section class="playlist-top">
      <div class="playlist-content">
        <div class="playlist-data" v-if="favoriteList.length > 0">
          <span>歌曲：{{ favoriteList.length }}</span>
        </div>
        <div class="flex align-center">
          <div class="playlist-content__playall m-r-12" @click="playAllMusic">
            <mdi-icon name="play_arrow" color="#fff" />
            <span class="cursor">播放全部</span>
          </div>
          <div class="playlist-content__download">
            <mdi-icon name="download" />
            <span class="cursor">下载全部</span>
          </div>
        </div>
      </div>
    </section>
    <section class="playlist-table">
      <el-table :data="favoriteList">
        <template #empty>
          <el-empty description="暂时没有喜欢的歌曲"></el-empty>
        </template>
        <el-table-column type="index" width="64" />
        <el-table-column prop="operation" label="操作">
          <div class="playlist-table__operation">
            <mdi-icon name="delete" hover />
            <mdi-icon name="download" hover />
          </div>
        </el-table-column>
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
        <el-table-column prop="album_name" label="专辑">
          <template #default="{ row }">
            <span v-html="row.album_name"></span>
          </template>
        </el-table-column>
        <el-table-column prop="origin" label="来源"></el-table-column>
        <el-table-column prop="duration_ms" label="时间"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: "PlayList",
};
</script>

<script lang="ts" setup>
import { useCollection } from "@/lib/hooks/useCollection";
import { usePlayMusic } from "@/lib/hooks/usePlayMusic";
import { useStore } from "@/store";

const { player } = useStore();
const { favoriteList } = storeToRefs(player);

const { play, playAll } = usePlayMusic();
const { isSongExistInCollecton } = useCollection();

const playAllMusic = () => {
  playAll(favoriteList.value);
}

const setIndex = (idx: number) => {
  return idx + 1;
};
</script>

<style lang="scss" scoped>
.playlist {
  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--padding-default);
    &__playall {
      padding: 6px 12px;
      background-color: var(--color-primary);
      border-radius: 20px;
      color: var(--el-color-primary-light-9);
      display: flex;
      align-items: center;
      gap: var(--padding-mini);
    }
    &__download,
    &__collect {
      padding: 6px 16px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: var(--padding-mini);
      border: 1px solid var(--color-border);
    }
  }

  &-table {
    &__operation {
      display: flex;
      align-items: center;
      gap: var(--padding-small);
      :deep(.svg-icon) {
        cursor: pointer;
      }
    }
  }
}
</style>
