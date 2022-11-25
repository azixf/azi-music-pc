<template>
  <section>
    <el-carousel :interval="4000" type="card" height="180px">
      <el-carousel-item  v-for="img in images">
        <img :src="img?.pic_info?.url" alt="" class="carousel-img" />
      </el-carousel-item>
    </el-carousel>
  </section>
  <section>
    <item-title title="库硪推荐歌单" />
    <div class="recommended-list">
      <list-item v-for="item in recommendedList" :src="item.img" :detail="item.info" show-mask :mask-text="item.name" />
    </div>
  </section>
  <section>
    <item-title title="Q鹅推荐歌单" />
    <div class="recommended-list">
      <list-item v-for="item in qRecommendedList" :src="item.cover" :detail="item.title" center />
    </div>
  </section>
  <section>
    <item-title title="最新音乐" />
    <div class="new-music-list">
      <new-item v-for="item in 12" />
    </div>
  </section>
  <item-title title="推荐MV" />
</template>

<script lang='ts'>
  export default {
    name: 'HomeRecommend'
  }
</script>

<script lang='ts' setup>
import { getFocusImages, getRecommendedList, getQRecommendedList } from '@/api';

const images = ref<any>([])

interface recommendedListItem {
  img: string,
  uname: string,
  img700: string,
  img300: string,
  userName: string,
  img500: string,
  total: number,
  name: string,
  listencnt: number,
  id: number,
  musicList: string,
  desc: string,
  info: string
}

const recommendedList = ref<recommendedListItem[]>([])

interface QRecommendedListItem {
  cover: string,
  listen_num: number,
  rcmdtemplate: string,
  title: string,
  content_id: number
}

const qRecommendedList = ref<QRecommendedListItem[]>([])

onBeforeMount(() => {
  // getFocusImages().then((res: any) => {
  //   images.value = res.focus.data.content;
  // })
  // getRecommendedList().then((res: any) => {
  //   recommendedList.value = res.data.list.slice(0, 8);
  // })
  // getQRecommendedList().then((res: any) => {
  //   qRecommendedList.value = res.recomPlaylist.data.v_hot.slice(0, 8)
  // } )
})
</script>

<style lang='scss' scoped>
.carousel-img {
  height: 180px;
}

.recommended-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--padding-default);
}

.new-music-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--padding-small);
}
</style>
