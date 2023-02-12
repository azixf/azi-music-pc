<template>
  <section v-loading="!images.length">
    <el-carousel trigger="click" :interval="4000" type="card" height="20vw">
      <el-carousel-item v-for="img in images" :key="img.id">
        <img :src="img?.pic_info?.url" alt="" class="carousel-img" />
      </el-carousel-item>
    </el-carousel>
  </section>
  <section v-loading="!qRecommendedList.length">
    <item-title title="推荐歌单" />
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
          @click="playMusic(item)"
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
  apiGetKGMvList
} from "@/api";
import { usePlayMusic } from "@/lib/hooks/usePlayMusic";
import { useStore } from "@/store";
import { KGMusicInfo, KGMVInfo, QQRecommendedMusicInfo } from "@/typings/player";

const images = ref<any>([]);

const qRecommendedList = ref<QQRecommendedMusicInfo[]>([]);

const newSongsList = ref<KGMusicInfo[]>([]);

const mvList = ref<KGMVInfo[]>([]);

onBeforeMount(async () => {
  const [e1, r1] = await apiGetQQFocusImages();
  !e1 && (images.value = (r1 as any).focus.data.content);

  const [e3, r3] = await apiGetQQRecommendedList();
  !e3 && (qRecommendedList.value = (r3 as any).recomPlaylist.data.v_hot);

  const [e4, r4] = await apiGetKGNewSongs();
  !e4 && (newSongsList.value = (r4 as any).data.info.slice(0, 12));

  const [e5, r5] = await apiGetKGMvList();
  !e5 && (mvList.value = (r5 as any).data.info.slice(0, 12));
});

const router = useRouter();

const onQEPlaylistClick = (item: QQRecommendedMusicInfo) => {
  router.push({
    path: "/playlist",
    query: {
      type: "qq",
      pid: item.content_id,
    },
  });
};

const { play } = usePlayMusic();
const { player } = useStore()
const playMusic = async (item: KGMusicInfo) => {
  const music_info = await player.GET_MUSIC_INFO(item);
  play(music_info);
};
</script>

<style lang="scss" scoped>
.carousel-img {
  height: 100%;
}
</style>
