<template>
  <section>
    <el-carousel :interval="4000" type="card" height="20vw">
      <el-carousel-item v-for="img in images">
        <img :src="img?.pic_info?.url" alt="" class="carousel-img" />
      </el-carousel-item>
    </el-carousel>
  </section>
  <section>
    <item-title title="库硪推荐歌单" />
    <el-row :gutter="16">
      <el-col
        class="m-b-16"
        :sm="6"
        :md="6"
        :lg="4"
        v-for="item in recommendedList"
      >
        <list-item
          :src="item.img"
          :detail="item.info"
          show-mask
          :mask-text="item.name"
        ></list-item>
      </el-col>
    </el-row>
  </section>
  <section>
    <item-title title="Q鹅推荐歌单" />
    <el-row :gutter="16">
      <el-col
        class="m-b-16"
        :sm="6"
        :md="6"
        :lg="4"
        v-for="item in qRecommendedList"
      >
        <list-item :src="item.cover" :detail="item.title" center />
      </el-col>
    </el-row>
  </section>
  <section>
    <item-title title="最新音乐" />
    <!-- <div class="new-music-list">
      <new-item v-for="item in 12" />
    </div> -->
    <el-row :gutter="16">
      <el-col
        class="m-b-16"
        :span="6"
        v-for="item in newSongsList"
      >
        <new-item :src="item.album_cover.replace('{size}', 480)" width="8vw" center :music="item.songname" :singer="item.authors[0].author_name" :mv="item.mvhash" />
      </el-col>
    </el-row>
  </section>
  <item-title title="推荐MV" />
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
} from "@/api";

const images = ref<any>([]);

interface recommendedListItem {
  img: string;
  uname: string;
  img700: string;
  img300: string;
  userName: string;
  img500: string;
  total: number;
  name: string;
  listencnt: number;
  id: number;
  musicList: string;
  desc: string;
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

const newSongsList = ref<any>([])

onBeforeMount(() => {
  getFocusImages().then((res: any) => {
    images.value = res.focus.data.content;
  });
  getRecommendedList().then((res: any) => {
    recommendedList.value = res.data.list;
  });
  getQRecommendedList().then((res: any) => {
    qRecommendedList.value = res.recomPlaylist.data.v_hot;
  });
  getKGNewSongs().then((res: any) => {
    console.log(res);
    newSongsList.value = res.data.info.slice(0, 12);
  });
});
</script>

<style lang="scss" scoped>
.carousel-img {
  height: 100%;
}
</style>
