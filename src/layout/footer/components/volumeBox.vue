<template>
  <div class="volume-box">
    <div @click="onVolumeClicked">
      <svg-icon name="volume_high" v-show="!muted && volumeState === 'high'" />
      <svg-icon name="volume_low" v-show="!muted && volumeState === 'low'" />
      <svg-icon name="close_volume" size="24px" v-show="muted" />
    </div>
    <el-slider class="custom-slider" v-model="volume" vertical height="80px" size="small" @change="onAudioProgressChanged" />
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
  console.log(current);
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
  &:hover .custom-slider {
    display: block;
  }
  .svg-icon {
    cursor: pointer;
  }
  .custom-slider {
    position: absolute;
    top: -78px;
    left: -8px;
    display: none;
  }
}
</style>
