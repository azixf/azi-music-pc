<template>
  <div class="playlist-wrapper" v-loading="!state.songsList.length">
    <section class="playlist-top">
      <el-row :gutter="16">
        <el-col :span="6">
          <img
            class="playlist-cover"
            :src="state.cover"
            alt="playlist-cover"
          />
        </el-col>
        <el-col :span="18">
          <div class="playlist-header">
            <div class="playlist-header__tag">歌单</div>
            <div class="playlist-header__name" v-html="state.playlistName"></div>
          </div>
          <div class="playlist-info">
            <span v-if="state.playlistCreator"
              >{{ state.playlistCreator }}创建</span
            >
          </div>
          <div class="playlist-content">
            <div class="playlist-content__playall">
              <svg-icon name="play_fill" size="18px" color="#fff" />
              <span class="cursor">播放全部</span>
              <el-divider direction="vertical" />
              <svg-icon class="cursor" name="add" size="18px" color="#fff" />
            </div>
            <div class="playlist-content__collect">
              <svg-icon name="download" size="18px" />
              <span class="cursor">收藏</span>
            </div>
            <div class="playlist-content__download">
              <svg-icon name="download" size="18px" />
              <span class="cursor">下载全部</span>
            </div>
          </div>
          <div class="playlist-data">
            <span v-if="state.total"
              >歌曲：{{ state.total }}</span
            >
            <span class="m-l-24" v-if="state.listencnt > 0"
              >收听：{{ state.listencnt }}</span
            >
          </div>
          <div class="playlist-tag m-t-16" v-if="state.tags.length > 0">
            <el-tag v-for="tag in state.tags" :key="tag">{{ tag }}</el-tag>
          </div>
        </el-col>
      </el-row>
      <el-row class="m-t-24 m-b-16">
        <el-col :span="6" class="playlist-list__title">歌曲列表</el-col>
        <el-col :span="6" :offset="12">
          <el-input type="text" placeholder="搜索歌单音乐">
            <template #prefix>
              <svg-icon name="search" size="14px"></svg-icon>
            </template>
          </el-input>
        </el-col>
      </el-row>
    </section>
    <section class="playlist-table">
      <el-table :data="state.songsList" stripe>
        <el-table-column type="index" :index="setIndex" width="64" />
        <el-table-column prop="operation" label="操作">
          <div class="playlist-table__operation">
            <svg-icon
              name="heart-fill"
              color="var(--color-primary)"
              size="18px"
            ></svg-icon>
            <svg-icon name="download" size="18px"></svg-icon>
          </div>
        </el-table-column>
        <el-table-column prop="title" label="标题">
          <template #default="{ row }">
            <div class="playlist-table__title">
              <span>{{ type === 'kuwo' ? row.name : row.songname }}</span>
              <span class="flag" v-if="row.hasmv">MV</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="artist" label="歌手">
          <template #default="{ row }" v-if="type !== 'kuwo'">
            <span>{{ row.singer?.[0]?.name || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="album" label="专辑">
          <template #default="{ row }">
            <span>{{ row.albumname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="releaseDate" label="发行日期">
          <template #default v-if="type !== 'kuwo'">
            <span>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="origin" label="来源">
          <span>{{ getOrigin }}</span>
        </el-table-column>
        <el-table-column prop="songTimeMinutes" label="时间">
          <template #default="{ row }" v-if="type !== 'kuwo'">
            <span> {{ duration(row.interval) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="playlist-pagination" v-if="type === 'kuwo'">
      <el-pagination
        background 
        v-model:current-page="pagination.page"
        :page-size="pagination.size"
        layout="prev, pager, next"
        :total="pagination.total"
        @current-change="onPaginationChange"
      />
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: "PlayList",
};
</script>

<script lang="ts" setup>
import { apiGetKWPlaylistInfo, apiGetQQPlaylistInfo } from "@/api";
import { PlaylistInfoData, QQPlaylistInfoData } from "@/typings/playlist";

const state = reactive({
  cover: '',
  playlistName: '',
  playlistCreator: '',
  total: 0,
  listencnt: 0,
  tags: [] as string[],
  songsList: [] as any
})

const pagination = reactive({
  page: 1,
  size: 100,
  total: 100,
});

const route = useRoute();
const type = ref('');
onBeforeMount(() => {
  type.value = route.query.type as string;
  getPlayListInfo();
});

const getPlayListInfo = async () => {
  const { query } = route;
  if (query.type === "kuwo") {
    if (state.songsList?.length) {
        state.songsList = []
      }
    const [e1, r1] = await apiGetKWPlaylistInfo({
      pid: query.pid as string,
      page: pagination.page - 1,
      size: pagination.size,
    })
    if (!e1) {
      pagination.total = r1!.data.total;
      const data = r1!.data as PlaylistInfoData;
      state.cover = data?.img700 || data?.img500 || data?.img300 || data?.img;
      state.listencnt = data.listencnt;
      state.playlistCreator = data.uname;
      state.songsList = data.musicList;
      state.total = data.total;
      state.tags = data.tag?.split(',') || [];
    } 
  } else if (query.type === 'qq') {
    const [e2, r2] = await apiGetQQPlaylistInfo(query.pid as string)
    if (!e2) {
      const data = (r2 as any).cdlist?.[0] as QQPlaylistInfoData;
      if (data) {
        state.cover = data.logo;
        state.listencnt = data.visitnum;
        state.playlistCreator = data.nickname;
        state.playlistName = data.dissname;
        state.tags = data.tags?.map(item => item.name);
        state.songsList = data.songlist;
        state.total = data.total_song_num;
      }
    }
  }
}

const onPaginationChange = () => {
  getPlayListInfo()
}

const setIndex = (idx: number) => {
  return route.query.type === 'kuwo' ? (pagination.page - 1) * pagination.size + idx + 1 : idx + 1;
}

const duration = computed(() => {
  return function (interval: number) {
    const minutes = Math.floor(interval / 60) + '';
    const seconds = (interval % 60 + '').padStart(2, '0');
    return `${minutes}:${seconds}`
  }
})

const getOrigin = computed(():string => {
  const { type } = route.query
  return type as string;
})
</script>

<style lang="scss" scoped>
.playlist {
  &-cover {
    width: 100%;
    height: 100%;
    max-width: 240px;
    max-height: 240px;
    border-radius: var(--radius-default);
  }

  &-header {
    display: flex;
    align-items: center;
    gap: var(--padding-small);
    margin-bottom: var(--padding-small);
    &__tag {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-small);
      padding: 2px 3px;
      color: var(--color-primary);
    }
    &__name {
      font-size: var(--font-extra-large);
      font-weight: var(--font-weight-600);
    }
  }

  &-info {
    span {
      color: var(--color-text);
      font-size: var(--font-small);
    }
    margin-bottom: var(--padding-small);
  }

  &-content {
    display: flex;
    align-items: center;
    gap: var(--padding-small);
    margin-bottom: var(--padding-small);
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

  &-data {
    span {
      font-size: var(--font-small);
      color: var(--color-text);
    }
  }

  &-tag {
    display: flex;
    align-items: center;
    gap: var(--padding-small);
  }

  &-list {
    &__title {
      font-size: var(--font-large);
      font-weight: var(--font-weight-550);
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

    &__title {
      .flag {
        margin-left: var(--padding-mini);
        font-size: var(--font-small);
        font-style: italic;
        cursor: pointer;
        font-weight: var(--font-weight-600);
        color: var(--color-primary);
      }
    }
  }

  &-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--padding-default);
  }
}
</style>
