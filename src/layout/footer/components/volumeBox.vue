<template>
  <div class="volume-box">
    <div @click="onVolumeClicked">
      <svg-icon name="volume_high" />
    </div>
    <el-slider class="custom-slider" v-model="volume" vertical height="80px" size="small" />
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
const onVolumeClicked = () => {
  console.log(volume.value, volumeState.value);
}
</script>

<style lang="scss" scoped>
.volume-box {
  position: relative;
  &:hover .volume-percentage-box {
    display: block;
  }
  .svg-icon {
    cursor: pointer;
  }
  .custom-slider {
    position: absolute;
    top: -57px;
    left: -8px;
  }
}
</style>
