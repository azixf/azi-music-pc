<template>
  <div class="play-music-pic" @click="showPlayingMusic">
    <div class="play-music-mask">
      <svg-icon name="arrow-up" color="#eee" />
    </div>
    <img src="@/assets/vue.svg" alt="" />
  </div>
  <div class="play-name text-ellipsis cursor">晴天</div>
  <playing-music v-model="visible" />
</template>

<script lang="ts">
import PlayingMusic from './playingMusic.vue';
export default {
  name: "MusicCover",
  components: {
    PlayingMusic
  }
};
</script>

<script lang="ts" setup>
const visible = ref(false)
const showPlayingMusic = () => {
  visible.value = true
}
</script>

<style lang="scss" scoped>
.play-music-pic {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-small);
  margin-right: var(--padding-small);
  cursor: pointer;
  &:hover {
    .play-music-mask {
      display: flex;
    }
  }
  .play-music-mask {
    position: absolute;
    width: 40px;
    height: 40px;
    background: var(--color-mask);
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;
  }
  img {
    object-fit: cover;
  }
}
.play-name {
  width: 120px;
}
</style>
