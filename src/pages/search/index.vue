<template>
  <div class="search-page" v-loading="loading">
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
              v-if="!isSongExistInCollecton(row.musicrid, system.musicOrigin)"
              @click="addToCollection(row)"
            ></mdi-icon>
            <mdi-icon
              name="favorite"
              hover
              color="var(--color-primary)"
             v-else
              @click="
                removeSongFormCollection(row.musicrid, system.musicOrigin)
              "
            ></mdi-icon>
            <mdi-icon name="queue" hover></mdi-icon>
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
</template>
<script lang="ts">
export default {
  name: "SearchPage",
};
</script>
<script lang="ts" setup>
import { useStore } from "@/store";
import { apiGetKWSongOrMV, apiKWSearch } from "@/api";
import { useLoading } from "@/lib/hooks/useLoading";
import { usePlayMusic } from "@/lib/hooks/usePlayMusic";
import { MusicInfo } from "@/typings/player";
import { useContextMenu } from "@/lib/hooks/useContextMenu";
import { useCollection } from "@/lib/hooks/useCollection";
const { system } = useStore();
const { keyword } = storeToRefs(system);

const page = ref(1);
const size = ref(30);
const total = ref(0);

interface KWResultInterface {
  musicrid: string;
  album: string;
  albumid: string;
  albumpic: string;
  artist: string;
  artistid: number;
  duration: number;
  hasmv: number;
  name: string;
  pic: string;
  pic120: string;
  score100: string;
  songTimeMinutes: string;
  rid: number;
}

const { loading, exec } = useLoading();

const result = ref<Array<KWResultInterface>>([]);
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
      result.value = data?.data.list as Array<KWResultInterface>;
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
const playMusic = async (row: KWResultInterface) => {
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
const { openContextmenu } = useContextMenu();
const onContextmenuOpend = async (
  row: KWResultInterface,
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
  openContextmenu(musicInfo, recentList.value, event);
};

const {
  isSongExistInCollecton,
  addSongToCollection,
  removeSongFormCollection,
} = useCollection();
const addToCollection = async (row: KWResultInterface) => {
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
