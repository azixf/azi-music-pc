<template>
  <footer class="layout-footer">
    <div class="layout-footer-left">
      <div class="play-music-pic">
        <div class="play-music-mask">
          <svg-icon name="arrow-up" color="#eee" />
        </div>
        <img src="@/assets/vue.svg" alt="" />
      </div>
      <div class="play-name text-ellipsis cursor">晴天</div>
    </div>
    <div class="layout-footer-center">
      <audio-player />
    </div>
    <div class="layout-footer-right">
      <volume-box />
      <div class="musiclist-box">
        <svg-icon name="musiclist" />
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import VolumeBox from "./components/volumeBox.vue";
import AudioPlayer from './components/audioPlayer.vue';
export default {
  name: "LayoutFooter",
  components: {
    VolumeBox,
    AudioPlayer
  },
};
</script>

<script lang="ts" setup>
const link =
  "https://m10.music.126.net/20221114201556/137d0c379474b9c1cc19406566cc8cad/yyaac/obj/wonDkMOGw6XDiTHCmMOi/14052042262/e61d/287b/5a26/a3edc1cf276e864f38b71d8b261f4cd3.m4a";
</script>

<style lang="scss" scoped>
.layout-footer {
  height: 100%;
  padding: var(--padding-default);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left {
    display: flex;
    align-items: center;
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
  }

  &-right {
    display: flex;
    gap: 0 var(--padding-small);
    .svg-icon {
      cursor: pointer;
    }
  }
}
</style>
