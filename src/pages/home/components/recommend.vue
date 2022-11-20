<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item  v-for="item, index in 4">
      <img :src="imgs[index]" alt="" class="carousel-img" />
    </el-carousel-item>
  </el-carousel>
  <item-title title="推荐歌单" />
  <div class="recommended-list">
    <list-item v-for="item in 6" />
  </div>
  <item-title title="最新音乐" />
  <item-title title="推荐MV" />
</template>

<script lang='ts'>
  export default {
    name: 'HomeRecommend'
  }
</script>

<script lang='ts' setup>
const imgs = [
  'https://w.wallhaven.cc/full/0w/wallhaven-0wq1q7.jpg',
  'https://w.wallhaven.cc/full/8x/wallhaven-8x27zo.png',
  'https://w.wallhaven.cc/full/0w/wallhaven-0wq1q7.jpg',
  'https://w.wallhaven.cc/full/8x/wallhaven-8x27zo.png'
]
</script>

<style lang='scss' scoped>
.carousel-img {
  height: 200px;
  width: 350px;
}

.recommended-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--padding-default);
}

</style>
