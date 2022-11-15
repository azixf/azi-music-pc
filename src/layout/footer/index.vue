<template>
  <footer class="layout-footer">
    <div class="layout-footer-left">
      <music-cover />
    </div>
    <div class="layout-footer-center">
      <audio-player />
    </div>
    <div class="layout-footer-right">
      <volume-box />
      <playing-list />
    </div>
  </footer>
</template>

<script lang="ts">
import VolumeBox from "./components/volumeBox.vue";
import AudioPlayer from './components/audioPlayer.vue';
import MusicCover from './components/musicCover.vue';
import PlayingList from './components/playingList.vue';
export default {
  name: "LayoutFooter",
  components: {
    VolumeBox,
    AudioPlayer,
    MusicCover,
    PlayingList
  },
};
</script>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.layout-footer {
  height: 100%;
  padding: var(--padding-default);
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  &-left {
    display: flex;
    align-items: center;
  }

  &-right {
    display: flex;
    gap: var(--padding-small);
  }
}
</style>
