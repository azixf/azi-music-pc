<template>
  <el-row>
    <el-col :span="6">
      <img
        class="songslist-cover"
        src="https://img4.kuwo.cn/star/albumcover/120/32/88/1567952196.jpg"
        alt="songslist-cover"
      />
    </el-col>
    <el-col :span="12" :offset="1">
      <el-space direction="vertical" alignment="flex-start">
        <el-space>
          <el-tag>歌单</el-tag>
          <h1 style="margin: 0">{{ $route.query.name }}</h1>
          <mdi-icon name="edit" hover />
        </el-space>
        <div>{{ songsList?.create_at }}创建</div>
        <el-space>
          <el-button
            type="primary"
            round
            :disabled="!songsList?.songs_list.length"
          >
            <mdi-icon name="play_arrow" color="#ffffff" />
            播放全部
          </el-button>
          <el-button round :disabled="!songsList?.songs_list.length">
            <mdi-icon name="download" />
            下载全部
          </el-button>
        </el-space>
        <div>歌曲：{{ songsList?.songs_list.length }}</div>
      </el-space>
    </el-col>
  </el-row>
  <el-table :data="songsList?.songs_list">
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="title" label="歌曲"></el-table-column>
    <el-table-column prop="singer" label="歌手"></el-table-column>
    <el-table-column prop="album_name" label="专辑"></el-table-column>
    <el-table-column prop="duration_ms" label="时间"></el-table-column>
    <template #empty>
      <el-empty description="歌单暂未添加歌曲"></el-empty>
    </template>
  </el-table>
</template>
<script lang="ts">
export default {
  name: "SongsList",
};
</script>
<script lang="ts" setup>
import { usePlaylist } from "@/lib/hooks/userPlaylist";
import { MusicInfo, SongsListType } from "@/typings/player";

const route = useRoute();
const songsList = ref<SongsListType>();

const { getSongsListByName } = usePlaylist();
watch(
  () => route,
  (cur, pre) => {
    const name = cur.query.name as string;
    const songsObjList = getSongsListByName(name);
    console.log("songsObj: ", songsObjList);
    if (songsObjList.length > 0) {
      songsList.value = songsObjList[0];
    }
  },
  {
    immediate: true,
  }
);
</script>
<style lang="scss" scoped>
.songslist-cover {
  width: 100%;
  height: 100%;
}
</style>
