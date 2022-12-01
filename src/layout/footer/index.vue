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
export default {
  name: "LayoutFooter",
  components: {
    VolumeBox: defineAsyncComponent(() => import('./components/volumeBox.vue')),
    AudioPlayer: defineAsyncComponent(() => import('./components/audioPlayer.vue')),
    MusicCover: defineAsyncComponent(() => import('./components/musicCover.vue')),
    PlayingList: defineAsyncComponent(() => import('./components/playingList.vue'))
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
