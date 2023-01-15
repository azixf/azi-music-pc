<template>
  <div :class="['playing-music', 'flex', { visible: modelValue }]">
    <img :src="current_info.cover" alt="cover-bg" class="playing-music-bg" />
    <header>
      <mdi-icon
        name="keyboard_double_arrow_down"
        hover
        color="#fff"
        @click="closeMask"
      />
    </header>
    <main class="flex align-center flex-1">
      <aside>
        <img
          :src="current_info.cover"
          alt="cover"
          class="playing-music-cover"
        />
      </aside>
      <aside class="flex-1 playing-music-lyric">
        <div style="height: 1500px">456</div>
      </aside>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: "PlayingMusic",
  components: {},
};
</script>

<script lang="ts" setup>
import { useStore } from "@/store";

interface PlayingMusicProps {
  modelValue: boolean;
}
defineProps<PlayingMusicProps>();

const emits = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const closeMask = () => {
  emits("update:modelValue", false);
};

const { player } = useStore();
const { current_info } = storeToRefs(player);

onBeforeMount(async () => {
  console.log("current: ", current_info.value);
  await player.GET_LYRIC();
});
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
  transition: top 0.3s, opacity 0.3s;
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
    width: 60vh;
    height: 60vh;
    margin-right: 5vw;
  }
  &-main {
    margin-right: 5vw;
  }
  &-lyric {
    overflow: auto;
    background-color: red;
    height: 60vh;
    &::-webkit-scrollbar {
      display: none;
    }
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
