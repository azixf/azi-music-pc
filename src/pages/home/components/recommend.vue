<template>
  <section>
    <el-carousel trigger="click" :interval="4000" type="card" height="20vw">
      <el-carousel-item v-for="img in images">
        <img :src="img?.pic_info?.url" alt="" class="carousel-img" />
      </el-carousel-item>
    </el-carousel>
  </section>
  <section v-click-outside>
    <item-title title="库硪推荐歌单" />
    <el-row :gutter="16">
      <el-col
        class="m-b-16"
        :sm="8"
        :md="8"
        :xl="6"
        :lg="4"
        v-for="item in recommendedList"
      >
        <list-item
          :src="item.img"
          :detail="item.name"
          :show-mask="!!item.info"
          :mask-text="item.info"
          @click="onKWPlaylistClick(item)"
        ></list-item>
      </el-col>
    </el-row>
  </section>
  <section>
    <item-title title="Q鹅推荐歌单" />
    <el-row :gutter="16">
      <el-col
        class="m-b-16"
        :sm="8"
        :md="8"
        :xl="6"
        :lg="4"
        v-for="item in qRecommendedList"
      >
        <list-item
          :src="item.cover"
          :detail="item.title"
          center
          @click="onQEPlaylistClick(item)"
        />
      </el-col>
    </el-row>
  </section>
  <section>
    <item-title title="最新音乐" />
    <el-row :gutter="16">
      <el-col class="m-b-16" :span="6" v-for="item in newSongsList">
        <new-item
          :src="item.album_cover.replace('{size}', '480')"
          width="8vw"
          center
          :music="item.songname"
          :singer="item.authors[0].author_name"
          :mv="!!item.mvhash"
          v-click="() => play(item)"
        />
      </el-col>
    </el-row>
  </section>
  <section>
    <item-title title="推荐MV" />
    <el-row :gutter="16">
      <el-col
        class="m-b-16"
        :sm="8"
        :md="8"
        :xl="6"
        :lg="4"
        v-for="item in mvList"
      >
        <mv-item
          :cover="item.album_cover.replace('{size}', '480')"
          :name="item.videoname"
          :author="item.singername"
          :info="item.description"
          :playcount="item.playcount"
        />
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts">
export default {
  name: "HomeRecommend",
};
</script>

<script lang="ts" setup>
import {
  getFocusImages,
  getRecommendedList,
  getQRecommendedList,
  getKGNewSongs,
  getKGMvList,
} from "@/api";
import { vClick, vClickOutside } from "@/lib/directives";
import { formatTime } from "@/lib/utils/common";
import { useStore } from "@/store";
const images = ref<any>([]);

interface recommendedListItem {
  id: string;
  img: string;
  name: string;
  uid: string;
  info: string;
}

const recommendedList = ref<recommendedListItem[]>([]);

interface QRecommendedListItem {
  cover: string;
  listen_num: number;
  rcmdtemplate: string;
  title: string;
  content_id: number;
}

const qRecommendedList = ref<QRecommendedListItem[]>([]);

type AuthorArray = Array<{
  author_id: string;
  author_name: string;
  sizable_cover: string;
}>;

interface NewSongsItem {
  audio_id: number;
  album_cover: string;
  "320hash"?: string;
  album_id: string;
  authors: AuthorArray;
  cover: string;
  duration: number;
  filename: string;
  filesize: number;
  hash: string;
  hash_high: string;
  mvhash: string;
  remark: string;
  songname: string;
  sort: number;
}

const newSongsList = ref<NewSongsItem[]>([]);

interface MVListItem {
  album_audio_id: string;
  album_cover: string;
  authors: AuthorArray;
  description: string;
  duration: number;
  fhd_filesize: number;
  fhd_hash: string;
  hd_hash: string;
  img: string;
  ld_filesize: string;
  ld_hash: string;
  mvhash: string;
  playcount: number;
  publish: string;
  qhd_filesize: string;
  qhd_hash: string;
  remark: string;
  sd_filesize: string;
  sd_hash: string;
  singername: string;
  title: string;
  videoid: number;
  videoname: string;
}

const mvList = ref<MVListItem[]>([]);

onBeforeMount(() => {
  getFocusImages().then((res: any) => {
    images.value = res.focus.data.content;
  });
  getRecommendedList().then((res: any) => {
    recommendedList.value = res.data?.data?.slice(0, 12);
  });
  getQRecommendedList().then((res: any) => {
    qRecommendedList.value = res.recomPlaylist.data.v_hot;
  });
  getKGNewSongs().then((res: any) => {
    newSongsList.value = res.data.info.slice(0, 12);
  });
  getKGMvList().then((res: any) => {
    mvList.value = res.data.info.slice(0, 12);
  });
});

const router = useRouter();
const onKWPlaylistClick = (item: recommendedListItem) => {
  router.push({
    path: "/playlist",
    query: {
      type: "kuwo",
      pid: item.id,
    },
  });
};

const onQEPlaylistClick = (item: QRecommendedListItem) => {
  console.log(item);
  router.push({
    path: "/playlist",
    query: {
      type: "qq",
      pid: item.content_id,
    },
  });
};

const { player } = useStore();
const { PLAY_MUSIC } = player;
const play = (item: NewSongsItem) => {
  console.log(item);
  PLAY_MUSIC({
    id: item.audio_id,
    title: item.songname,
    src: item.hash,
    singer: item.authors[0].author_name,
    singer_id: item.authors[0].author_id,
    detail: item.remark,
    cover: item.cover,
    time: 0,
    time_ms: '',
    duration: item.duration,
    duration_ms: formatTime(item.duration),
    album_id: item.album_id,
    album_name: '',
    mv_id: '',
    mv: item.mvhash,
    origin: 'kugou',
    lyric: '',
    progress: 0
  })
};
</script>

<style lang="scss" scoped>
.carousel-img {
  height: 100%;
}
</style>
