<template>
  <div class="play-music-pic" @click="showPlayingMusic" v-show="!visible">
    <div class="play-music-mask">
      <svg-icon name="arrow-up" color="#eee" />
    </div>
    <img :src="(player.current_info.cover || DefaultImg)" alt="music-cover" />
  </div>
  <div class="play-music-operation" v-show="visible">
    <div class="play-music-icon">
      <font-icon name="arrow-down" @click="visible = false" />
    </div>
    <div class="play-music-icon-wrapper" title="我的喜欢">
      <font-icon name="tubiaozhizuomoban-" />
    </div>
    <div class="play-music-icon-wrapper m-l-8" title="收藏到歌单">
      <font-icon name="add1" />
    </div>
  </div>
  <div class="play-name" v-show="!visible">
    <div class="song-name" :title="player.current_info.title" v-html="player.current_info.title"></div>
    <div class="song-singer" v-html="player.current_info.singer"></div>
  </div>
  <playing-music v-model="visible" />
</template>

<script lang="ts">
import DefaultImg from '@/assets/img/default.jpg'
import { useStore } from "@/store";
import PlayingMusic from "./playingMusic.vue";
export default {
  name: "MusicCover",
  components: {
    PlayingMusic,
  },
};
</script>

<script lang="ts" setup>
const { player } = useStore()

const visible = ref(false);
const showPlayingMusic = () => {
  visible.value = true;
};
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
    width: 40px;
    height: 40px;
  }
}
.play-music-operation {
  display: flex;
  align-items: center;

  .play-music-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: var(--padding-small);
  }
  .play-music-icon-wrapper {
    border: 2px solid var(--color-border);
    border-radius: 50%;
    padding: var(--padding-mini);
  }
}

.play-name {
  .song-name {
    width: 80px;
    @extend .text-ellipsis;
  }
  .song-singer {
    font-size: 12px;
    color: var(--color-text);
    font-style: italic;
    margin-top: var(--padding-mini);
  }
}
</style>
