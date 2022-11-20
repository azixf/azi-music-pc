<template>
  <div class="volume-box">
    <el-popover placement="top" :width="38" popper-class="volume-box-popper">
      <template #reference>
        <div @click="onVolumeClicked">
          <svg-icon name="volume-2" color="var(--color-icon)" v-show="!muted && volumeState === 'high'" />
          <svg-icon name="volume-1" color="var(--color-icon)" v-show="!muted && volumeState === 'low'" />
          <svg-icon name="volume-x" color="var(--color-icon)" size="24px" v-show="muted" />
        </div>
      </template>
      <el-slider v-model="volume" vertical height="80px"  @change="onAudioProgressChanged" />
    </el-popover>
  </div>
</template>

<script lang="ts">
export default {
  name: "VolumeBox",
};
</script>

<script lang="ts" setup>
import { useStore } from '@/store';

const { player } = useStore()
const { volume, volumeState } = storeToRefs(player)
const muted = ref(false)
const tempVolume = ref(0)
const onVolumeClicked = () => {
  if (!muted.value) {
    tempVolume.value = volume.value
    volume.value = 0
  } else {
    volume.value = tempVolume.value
  }
  muted.value = !muted.value
  
}

const onAudioProgressChanged = (value: number) => {
  volume.value = value
}

watch(() => volume.value, (current: number) => {
  if (current === 0) {
    volumeState.value = 'muted'
    muted.value = true
  } else if (current <= 50) {
    volumeState.value = 'low'
    muted.value = false
  } else {
    volumeState.value = 'high'
    muted.value = false
  }
})
</script>

<style lang="scss" scoped>
.volume-box {
  position: relative;
  .svg-icon {
    cursor: pointer;
  }
}
:deep(.el-slider__button) {
  width: 14px;
  height: 14px;
}
:global(.volume-box-popper) {
  min-width: 0 !important;
  padding: var(--padding-default) 0 !important;
}
</style>
