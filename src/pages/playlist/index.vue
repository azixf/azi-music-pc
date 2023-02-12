<template>
  <div class="playlist-wrapper" v-loading="!state.songsList.length">
    <section class="playlist-top">
      <el-row :gutter="16">
        <el-col :span="6">
          <img class="playlist-cover" :src="state.cover" alt="playlist-cover" />
        </el-col>
        <el-col :span="18">
          <div class="playlist-header">
            <el-tag>歌单</el-tag>
            <div
              class="playlist-header__name"
              v-html="state.playlistName"
            ></div>
          </div>
          <div class="playlist-info">
            <span v-if="state.playlistCreator"
              >创建by {{ state.playlistCreator }}</span
            >
          </div>
          <div class="playlist-content">
            <el-button type="primary" round>
              <mdi-icon name="play_arrow" color="#fff" />
              播放全部
            </el-button>
            <el-button round>
              <mdi-icon name="favorite_border" hover />
              收藏
            </el-button>
            <el-button round>
              <mdi-icon name="download" hover />
              下载全部
            </el-button>
          </div>
          <div class="playlist-data">
            <span v-if="state.total">歌曲：{{ state.total }}</span>
            <span class="m-l-24" v-if="state.listencnt > 0"
              >收听：{{ state.listencnt }}</span
            >
          </div>
          <div class="playlist-tag m-t-16" v-if="state.tags.length > 0">
            <el-tag v-for="tag in state.tags" :key="tag">{{ tag }}</el-tag>
          </div>
        </el-col>
      </el-row>
      <h1 class="m-t-24 m-b-16">歌单列表</h1>
    </section>
    <section class="playlist-table">
      <el-table
        :data="state.songsList"
        stripe
        highlight-current-row
        @row-dbclick="playMusic"
        @row-contextmenu="onContextmenuOpened"
      >
        <el-table-column type="index" width="64" />
        <el-table-column prop="operation" label="操作">
          <div class="playlist-table__operation">
            <mdi-icon
              name="favorite_border"
              title="添加到我的喜欢"
              hover
            ></mdi-icon>
            <mdi-icon name="download" title="下载" hover></mdi-icon>
          </div>
        </el-table-column>
        <el-table-column prop="title" label="标题">
          <template #default="{ row }">
            <div class="playlist-table__title">
              <span>{{ type === "kuwo" ? row.name : row.songname }}</span>
              <span class="flag" v-if="row.hasmv">
                <mdi-icon name="music_video" />
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="artist" label="歌手">
          <template #default="{ row }">
            <span>{{
              type === "qq" ? row.singer?.[0]?.name || "-" : row.artist
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="album" label="专辑">
          <template #default="{ row }">
            <span>{{ type === "qq" ? row.albumname : row.album }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="releaseDate"
          label="发行日期"
          v-if="type == 'kuwo'"
        >
        </el-table-column>
        <el-table-column prop="origin" label="来源">
          <span>{{ type }}</span>
        </el-table-column>
        <el-table-column prop="songTimeMinutes" label="时间">
          <template #default="{ row }" v-if="type !== 'kuwo'">
            <span> {{ duration(row.interval) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <Contextmenu ref="contextmenuRef"></Contextmenu>
  </div>
</template>

<script lang="ts">
export default {
  name: "PlayList",
  components: {
    Contextmenu: defineAsyncComponent(
      () => import("@/components/common/contextmenu.vue")
    ),
  },
};
</script>

<script lang="ts" setup>
import {
  apiGetKWPlaylistInfo,
  apiGetKWSongOrMV,
  apiGetQQMusic,
  apiGetQQPlaylistInfo,
} from "@/api";
import { usePlayMusic } from "@/lib/hooks/usePlayMusic";
import { formatTime } from "@/lib/utils/common";
import { useStore } from "@/store";
import { KWMusicInfo, KWPlaylistInfo, MusicInfo, MusicOriginType, QQMusicInfo, QQPlaylistInfo } from "@/typings/player";

const state = reactive({
  cover: "",
  playlistName: "",
  playlistCreator: "",
  total: 0,
  listencnt: 0,
  tags: [] as string[],
  songsList: [] as any,
});

const route = useRoute();
const type = ref<MusicOriginType>();
onBeforeMount(() => {
  type.value = route.query.type as MusicOriginType;
  getPlayListInfo();
});

// 获取歌单详情
const getPlayListInfo = async () => {
  const { query } = route;
  if (type.value === "kuwo") {
    if (state.songsList?.length) {
      state.songsList = [];
    }
    const [e1, r1] = await apiGetKWPlaylistInfo({
      pid: query.pid as string,
      page: 0,
      size: 100,
    });
    if (!e1) {
      const data = r1!.data as KWPlaylistInfo;
      state.playlistName = data.name;
      state.cover = data?.img700 || data?.img500 || data?.img300 || data?.img;
      state.listencnt = data.listencnt;
      state.playlistCreator = data.uname;
      state.songsList = data.musicList;
      state.total = data.total;
      state.tags = data.tag?.split(",") || [];
    }
  } else if (type.value === "qq") {
    const [e2, r2] = await apiGetQQPlaylistInfo(query.pid as string);
    if (!e2) {
      const data = (r2 as any).cdlist?.[0] as QQPlaylistInfo;
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
};

const duration = computed(() => {
  return function (interval: number) {
    const minutes = Math.floor(interval / 60) + "";
    const seconds = ((interval % 60) + "").padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
});

const getKWMusicSrc = async (rid: number): Promise<string> => {
  const [err, data] = await apiGetKWSongOrMV(rid + "", "mp3");
  let src = "";
  if (!err) {
    src = data?.data || "";
  }
  return src;
};

const getQQMusicSrc = async (mid: string): Promise<string> => {
  let src = "";
  const [err, data] = await apiGetQQMusic(mid);
  if (!err) {
    src = data?.data?.url || "";
  }
  return src;
};

const getKWMusicInfo = async (row: KWMusicInfo) => {
  const src = await getKWMusicSrc(row.rid);
  const music_info: MusicInfo = {
    id: row.musicrid,
    title: row.name,
    src,
    hash: "",
    singer: row.artist,
    detail: "",
    cover: row.pic,
    time: 0,
    time_ms: "0.00",
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
  return music_info;
};

const getQQMusicInfo = async (row: QQMusicInfo) => {
  const src = await getQQMusicSrc(row.songmid);
  let singer = "";
  if (row.singer && row.singer.length) {
    row.singer.forEach(item => {
      singer += item.name + ";";
    });
    singer = singer.slice(0, singer.length - 1);
  }
  const music_info: MusicInfo = {
    id: row.songid,
    title: row.songname,
    src,
    hash: "",
    singer,
    detail: "",
    cover: "",
    time: 0,
    time_ms: "0.00",
    duration: row.interval,
    progress: 0,
    duration_ms: formatTime(row.interval),
    album_id: row.albummid,
    album_name: row.albumname,
    mv: "",
    origin: "qq",
    lyric: "",
    play_time: 0,
    play_time_ms: "",
  };
  return music_info;
};

const { play, playAll } = usePlayMusic();
const playMusic = async (row: KWMusicInfo | QQMusicInfo) => {
  let music_info: MusicInfo = {};
  if (type.value === "kuwo") {
    music_info = await getKWMusicInfo(row as KWMusicInfo);
  } else if (type.value === "qq") {
    music_info = await getQQMusicInfo(row as QQMusicInfo);
  }
  play(music_info);
};

const playAllMusic = () => {};

const contextmenuRef = ref();
const { player } = useStore();
const { currentList } = storeToRefs(player);
const onContextmenuOpened = (
  row: KWPlaylistInfo | QQPlaylistInfo,
  _: any,
  event: MouseEvent
) => {
  contextmenuRef.value.showContextmenu();
};
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

  &-table {
    &__operation {
      display: flex;
      align-items: center;
      gap: var(--padding-small);
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
