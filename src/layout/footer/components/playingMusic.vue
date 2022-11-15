<template>
  <div :class="['playing-music', { visible: modelValue }]">
    <header>
      <svg-icon name="arrow-down" @click="closeMask" />
    </header>
    <main>
      main
    </main>
    <footer class="playing-music-footer">
      <div>
        <svg-icon name="heart" />
        <svg-icon name="heart-fill" color="var(--color-primary)" />
      </div>
      <div class="audio-operation">
        <audio-player />
        <volume-box />
        <playing-list />
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import AudioPlayer from './audioPlayer.vue';
import VolumeBox from './volumeBox.vue';
import PlayingList from './playingList.vue';
export default {
  name: "PlayingMusic",
  components: {
    AudioPlayer,
    VolumeBox,
    PlayingList
  }
};
</script>

<script lang="ts" setup>
interface PlayingMusicProps {
  modelValue: boolean;
}
defineProps<PlayingMusicProps>();

const emits = defineEmits<{ (event: "update:modelValue", value: boolean): void }>();

const closeMask = () => {
  emits("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
.playing-music {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 100vh;
  left: 0;
  z-index: 10;
  background-color: #fff;
  transition: top .3s;
  will-change: top;
  padding: var(--padding-default);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &.visible {
    top: 0;
  }
  .svg-icon {
    cursor: pointer;
  }
  &-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--padding-large);
    .audio-operation {
      display: flex;
      align-items: center;
      gap: var(--padding-default);
    }
  }
}
</style>
