<template>
  <div :class="['playing-music', 'flex', { visible: modelValue }]">
    <img :src="current_info.cover" alt="cover-bg" class="playing-music-bg">
    <header>
      <mdi-icon name="keyboard_double_arrow_down" hover color="#fff" @click="closeMask" />
    </header>
    <main class="flex align-center flex-1">
      <aside>
        <img :src="current_info.cover" alt="cover" class="playing-music-cover">
      </aside>
      <aside class="flex-1">
        歌词
      </aside>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: "PlayingMusic",
  components: {
    AudioPlayer: () => defineAsyncComponent(() => import('./audioPlayer.vue')),
    VolumeBox: () => defineAsyncComponent(() => import('./volumeBox.vue')),
    PlayingList: () => defineAsyncComponent(() => import('./playingList.vue'))
  }
};
</script>

<script lang="ts" setup>
import { useStore } from '@/store';

interface PlayingMusicProps {
  modelValue: boolean;
}
defineProps<PlayingMusicProps>();

const emits = defineEmits<{ (event: "update:modelValue", value: boolean): void }>();

const closeMask = () => {
  emits("update:modelValue", false);
};

const { player } = useStore();
const { current_info } = storeToRefs(player)

onBeforeMount(async () => {
  console.log('current: ', current_info.value);
  const res = await player.GET_LYRIC()
  console.log('res: ',  res);
})
</script>

<style lang="scss" scoped>
.playing-music {
  width: 100vw;
  height: calc(100vh - 63px);
  position: absolute;
  top: 100vh;
  left: 0;
  z-index: 10;
  opacity: 0;
  background-color: #fff;
  transition: top .3s, opacity .3s;
  will-change: top, opacity;
  padding: var(--padding-default);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &.visible {
    top: 0;
    opacity: 1;
  }
  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: calc(100vh - 63px);
    width: 100%;
    pointer-events: none;
    opacity: 0.5;
  }
  &-cover {
    width: 45vw;
    height: 45vw;
    margin-right: 5vw;
  }
  &-main {
    margin-right: 5vw;
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
