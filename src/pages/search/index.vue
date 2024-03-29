<template>
  <div class="search-page" v-loading="loading">
    <h2 class="m-b-10">
      <mdi-icon name="search" />
      搜索结果
    </h2>
    <el-table
      :data="result"
      stripe
      highlight-current-row
      @row-dblclick="playMusic"
      @row-contextmenu="onContextmenuOpend"
    >
      <el-table-column type="index" :index="setIndex" width="64" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-space>
            <mdi-icon
              name="favorite_border"
              hover
              title="添加到我的喜欢"
              v-if="!isSongExistInCollecton(row.musicrid, system.musicOrigin)"
              @click="addToCollection(row)"
            ></mdi-icon>
            <mdi-icon
              name="favorite"
              hover
              title="移出我的喜欢"
              color="var(--color-primary)"
              v-else
              @click="
                removeSongFormCollection(row.musicrid, system.musicOrigin)
              "
            ></mdi-icon>
            <mdi-icon name="queue" title="收藏到歌单" hover></mdi-icon>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌曲名">
        <template #default="{ row }">
          <span v-html="row.name"></span>
        </template>
      </el-table-column>
      <el-table-column prop="artist" label="歌手">
        <template #default="{ row }">
          <span v-html="row.artist"></span>
        </template>
      </el-table-column>
      <el-table-column prop="album" label="专辑">
        <template #default="{ row }">
          <span v-html="row.album"></span>
        </template>
      </el-table-column>
      <el-table-column prop="songTimeMinutes" label="时长"></el-table-column>
      <template #empty>
        <el-empty description="未查询到数据" />
      </template>
    </el-table>
    <div class="flex justify-end">
      <el-pagination
        v-model:current-page="page"
        :page-size="size"
        layout="prev, pager, next, sizes, total"
        background
        :total="total"
        class="m-t-16"
        @current-change="getSearchResult"
        @size-change="onSizeChange"
      />
    </div>
  </div>
  <Contextmenu ref="contextmenuRef"></Contextmenu>
</template>
<script lang="ts">
export default {
  name: "SearchPage",
  components: {
    Contextmenu: defineAsyncComponent(
      () => import("@/components/common/contextmenu.vue")
    ),
  },
};
</script>
<script lang="ts" setup>
import { useStore } from "@/store";
import { apiGetKWSongOrMV, apiKWSearch } from "@/api";
import { useLoading } from "@/lib/hooks/useLoading";
import { usePlayMusic } from "@/lib/hooks/usePlayMusic";
import { KWMusicInfo, MusicInfo } from "@/typings/player";
import { useCollection } from "@/lib/hooks/useCollection";
const { system } = useStore();
const { keyword } = storeToRefs(system);

const page = ref(1);
const size = ref(30);
const total = ref(0);

const { loading, exec } = useLoading();

const result = ref<Array<KWMusicInfo>>([]);
const getSearchResult = () => {
  exec(async () => {
    result.value = [];
    const [err, data] = await apiKWSearch(
      keyword.value,
      page.value,
      size.value
    );
    if (!err) {
      console.log("data: ", data);
      total.value = Number(data?.data.total);
      result.value = data?.data.list as Array<KWMusicInfo>;
    }
  });
};

watch(
  () => keyword.value,
  value => {
    console.log("search value: ", value);
    if (!keyword.value) return;
    getSearchResult();
  },
  {
    immediate: true,
  }
);

const setIndex = (index: number) => {
  return (page.value - 1) * size.value + 1 + index;
};

const onSizeChange = (current: number) => {
  size.value = current;
  page.value = 1;
  getSearchResult();
};

const getMusicSrc = async (rid: number) => {
  const [err, data] = await apiGetKWSongOrMV(rid + "", "mp3");
  console.log("data: ", data);
  let src = "";
  if (!err) {
    src = data?.data || "";
  }
  return src;
};

const { play } = usePlayMusic();
const playMusic = async (row: KWMusicInfo) => {
  const src = await getMusicSrc(row.rid);
  console.log(src);
  const musicInfo: MusicInfo = {
    id: row.musicrid,
    title: row.name,
    src,
    hash: "",
    singer: row.artist,
    detail: "",
    cover: row.pic,
    time: 0,
    time_ms: "0:00",
    duration: row.duration,
    progress: 0,
    duration_ms: row.songTimeMinutes,
    album_name: row.album,
    album_id: row.albumid,
    mv: "",
    origin: "kuwo",
    lyric: "",
    play_time: 0,
    play_time_ms: "",
  };
  play(musicInfo);
};

const { player } = useStore();
const { recentList } = storeToRefs(player);
const contextmenuRef = ref()
const onContextmenuOpend = async (
  row: KWMusicInfo,
  _: any,
  event: MouseEvent
) => {
  const src = await getMusicSrc(row.rid);
  const musicInfo: MusicInfo = {
    id: row.musicrid,
    title: row.name,
    src,
    hash: "",
    singer: row.artist,
    detail: "",
    cover: row.pic,
    time: 0,
    time_ms: "0:00",
    duration: row.duration,
    progress: 0,
    duration_ms: row.songTimeMinutes,
    album_name: row.album,
    album_id: row.albumid,
    mv: "",
    origin: system.musicOrigin,
    lyric: "",
    play_time: 0,
    play_time_ms: "",
  };
  contextmenuRef.value.showContextmenu(musicInfo, recentList.value, event);
};

const {
  isSongExistInCollecton,
  addSongToCollection,
  removeSongFormCollection,
} = useCollection();
const addToCollection = async (row: KWMusicInfo) => {
  const src = await getMusicSrc(row.rid);
  console.log("src: ", src);
  const musicInfo: MusicInfo = {
    id: row.musicrid,
    title: row.name,
    src,
    hash: "",
    singer: row.artist,
    detail: "",
    cover: row.pic,
    time: 0,
    time_ms: "0:00",
    duration: row.duration,
    progress: 0,
    duration_ms: row.songTimeMinutes,
    album_name: row.album,
    album_id: row.albumid,
    mv: "",
    origin: system.musicOrigin,
    lyric: "",
    play_time: 0,
    play_time_ms: "",
  };
  addSongToCollection(musicInfo);
};
</script>
<style lang="scss" scoped></style>
