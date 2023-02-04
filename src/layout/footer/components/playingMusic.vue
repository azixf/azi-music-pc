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
        <p
          v-for="(lyric, index) in current_info.lyric"
          :class="[{ active: index === activeIndex }, `item-${index}`]"
          v-html="(lyric as LyricInfo).content"
        ></p>
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
import { LyricInfo } from "@/typings/player";
import { getStyle } from "@/lib/utils/common";

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

const activeIndex = ref(-1);

watch(
  () => current_info.value.time,
  (cur) => {
    const len = current_info.value.lyric?.length;
    if (len) {
      for (let i = 0; i < len; i++) {
        const item = current_info.value.lyric![i] as LyricInfo;
        const gap = Math.abs(item.time - cur! * 1000);
        if (gap <= 500) {
          activeIndex.value = i;
          break;
        }
      }
      const wrapper = document.querySelector(
        ".playing-music-lyric"
      ) as HTMLElement;
      const height = getStyle(wrapper, "height");
      const activeItem = document.querySelector(
        `.item-${activeIndex.value}`
      ) as HTMLElement;
      if (activeItem) {
        const offsetTop = activeItem.offsetTop;
        wrapper.scrollTo({
          behavior: "smooth",
          top: offsetTop - height + height / 4,
        });
      }
    }
  }
);
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
    object-fit: cover;
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
    height: 60vh;
    padding: var(--padding-default) 0;
    &::-webkit-scrollbar {
      display: none;
    }
    p {
      text-align: center;
      line-height: 2;
      &.active {
        color: var(--color-primary);
        font-size: var(--font-extra-large);
        font-weight: var(--font-weight-600);
      }
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
