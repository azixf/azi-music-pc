<template>
  <div class="search-page" v-loading="loading">
    <el-table
      :data="result"
      stripe
      highlight-current-row
      @row-dblclick="playMusic"
      @row-contextmenu="onContextMenuOpend"
    >
      <el-table-column type="index" :index="setIndex" width="64" />
      <el-table-column label="操作">
        <el-space>
          <mdi-icon name="favorite_border" hover></mdi-icon>
          <mdi-icon name="queue" hover></mdi-icon>
        </el-space>
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
        :current-size="size"
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
import { apiKWSearch } from "@/api";
import { useLoading } from "@/lib/hooks/useLoading";
import { usePlayMusic } from '@/lib/hooks/usePlayMusic';
import { MusicInfo } from '@/typings/player';
import { useContextMenu } from '@/lib/hooks/useContextMenu';
const { system } = useStore();
const { keyword } = storeToRefs(system);

const page = ref(1);
const size = ref(30);
const total = ref(0);

interface KWResultInterface {
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

const { play } = usePlayMusic()
const playMusic = (row: MusicInfo) => {
  play(row)
}

const { player } = useStore()
const { openContextmenu } = useContextMenu()
const onContextmenuOpend = (row: MusicInfo, _: any, event: MouseEvent) => {
  openContextmenu(row, player.recentList, event)
}
</script>
<style lang="scss" scoped></style>
