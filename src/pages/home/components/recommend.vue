<template>
  <section v-loading="!images.length">
    <el-carousel trigger="click" :interval="4000" type="card" height="20vw">
      <el-carousel-item v-for="img in images" :key="img.id">
        <img :src="img?.pic_info?.url" alt="" class="carousel-img" />
      </el-carousel-item>
    </el-carousel>
  </section>
  <section v-loading="!recommendedList.length">
    <item-title title="kuwo推荐歌单" />
    <el-row :gutter="16">
      <el-col
        class="m-b-16"
        :sm="8"
        :md="8"
        :xl="6"
        :lg="4"
        v-for="item in recommendedList"
        :key="item.id"
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
  <section v-loading="!qRecommendedList.length">
    <item-title title="qq推荐歌单" />
    <el-row :gutter="16">
      <el-col
        class="m-b-16"
        :sm="8"
        :md="8"
        :xl="6"
        :lg="4"
        v-for="item in qRecommendedList"
        :key="item.content_id"
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
  <section v-loading="!newSongsList.length">
    <item-title title="最新音乐" />
    <el-row :gutter="16">
      <el-col class="m-b-16" :span="6" v-for="item in newSongsList" :key="item.hash">
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
  <section v-loading="!mvList.length">
    <item-title title="推荐MV" />
    <el-row :gutter="16">
      <el-col
        class="m-b-16"
        :sm="8"
        :md="8"
        :xl="6"
        :lg="4"
        v-for="item in mvList"
        :key="item.mvhash"
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
  apiGetQQFocusImages,
  apiGetQQRecommendedList,
  apiGetKGNewSongs,
  apiGetKGMvList,
  apiGetKWRecommendedList,
} from "@/api";
import { vClick } from "@/lib/directives";
import { formatDateTime, formatTime } from "@/lib/utils/common";
import { useStore } from "@/store";
import {
  recommendedListItem,
  QRecommendedListItem,
  NewSongsItem,
  MVListItem,
} from "@/typings/home";
import { ElCarousel, ElCarouselItem, ElRow, ElCol } from "element-plus";
const images = ref<any>([]);

const recommendedList = ref<recommendedListItem[]>([]);

const qRecommendedList = ref<QRecommendedListItem[]>([]);

const newSongsList = ref<NewSongsItem[]>([]);

const mvList = ref<MVListItem[]>([]);

onBeforeMount(async () => {
  const [e1, r1] = await apiGetQQFocusImages();
  !e1 && (images.value = (r1 as any).focus.data.content);

  const [e2, r2] = await apiGetKWRecommendedList();
  !e2 && (recommendedList.value = (r2 as any).data?.data?.slice(0, 12));

  const [e3, r3] = await apiGetQQRecommendedList();
  !e3 && (qRecommendedList.value = (r3 as any).recomPlaylist.data.v_hot);

  const [e4, r4] = await apiGetKGNewSongs();
  !e4 && (newSongsList.value = (r4 as any).data.info.slice(0, 12));

  const [e5, r5] = await apiGetKGMvList();
  !e5 && (mvList.value = (r5 as any).data.info.slice(0, 12));
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
  console.log("kugou item: ", item);
  const time = +new Date();
  PLAY_MUSIC({
    id: item.audio_id,
    title: item.songname,
    src: item.hash_high || item.hash,
    hash: item.hash_high || item.hash,
    singer: item.authors[0].author_name,
    singer_id: item.authors[0].author_id,
    detail: item.remark,
    cover: item.album_cover.replace("{size}", "480"),
    time: 0,
    time_ms: "",
    duration: item.duration,
    duration_ms: formatTime(item.duration, true),
    album_id: item.album_id,
    album_name: "",
    mv_id: "",
    mv: item.mvhash,
    origin: "kugou",
    lyric: "",
    progress: 0,
    play_time: time,
    play_time_ms: formatDateTime(time, "YYYY-MM-DD HH:mm"),
  });
};
</script>

<style lang="scss" scoped>
.carousel-img {
  height: 100%;
}
</style>
