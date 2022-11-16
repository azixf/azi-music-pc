<template>
  <el-tooltip placement="top" :content="content">
    <div :class="['music-lyric', { active: lyric }]" @click="onLyricStateChange(lyric)">词</div>
  </el-tooltip>
</template>

<script lang="ts">
export default {
  name: "LyricBox",
};
</script>

<script lang="ts" setup>
import { useStore } from '@/store';
const { player } = useStore()
const { lyric } = storeToRefs(player)

const content = computed(() => {
  let msg = ''
  if (lyric.value) {
    msg = '关闭歌词';
  } else {
    msg = '打开歌词';
  }
  return msg;
})

const onLyricStateChange = (current: boolean) => {
  lyric.value = !current;
}
</script>

<style lang="scss" scoped>
.music-lyric {
  border: 2px solid var(--color-primary);
  cursor: pointer;
  font-size: var(--font-small);
  padding: var(--padding-mini);
  border-radius: 50%;
  &.active {
    font-weight: var(--font-weight-600);
    color: var(--el-color-primary-light-9);
    background-color: var(--color-primary);
  }
}
</style>
