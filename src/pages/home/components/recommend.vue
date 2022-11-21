<template>
  <el-carousel :interval="4000" type="card" height="180px">
    <el-carousel-item  v-for="img in images">
      <img :src="img?.pic_info?.url" alt="" class="carousel-img" />
    </el-carousel-item>
  </el-carousel>
  <item-title title="库硪推荐歌单" />
  <div class="recommended-list">
    <list-item v-for="item in recommendedList" :src="item.img" :detail="item.info" show-mask :mask-text="item.name" />
  </div>
  <item-title title="Q鹅推荐歌单"></item-title>
  <item-title title="最新音乐" />
  <item-title title="推荐MV" />
</template>

<script lang='ts'>
  export default {
    name: 'HomeRecommend'
  }
</script>

<script lang='ts' setup>
import { getFocusImages, getRecommendedList } from '@/api';

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

onBeforeMount(() => {
  getFocusImages().then((res: any) => {
    images.value = res.focus.data.content;
  })
  getRecommendedList().then((res: any) => {
    recommendedList.value = res.data.list.slice(0, 8);
  })
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

</style>
