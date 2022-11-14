<template>
  <div class="audio-player">
    <div class="music-operation-btns">
      <svg-icon name="loop" size="20px" />
      <svg-icon name="skip_previous" size="20px" />
      <svg-icon name="play_fill" size="20px" />
      <svg-icon name="skip-next" size="20px" />
      <svg-icon name="add_to_list" size="20px" />
    </div>
    <div class="music-progress-bar">
      <span>0:00</span>
      <div class="progress-bar-box">
        <el-progress :percentage="50" :show-text="false" />
      </div>
      <span>3:45</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AudioPlayer",
};
</script>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  .music-operation-btns {
    display: flex;
    gap: 0 var(--padding-default);
    .svg-icon {
      cursor: pointer;
    }
  }
  .music-progress-bar {
    margin-top: var(--padding-small);
    display: flex;
    align-items: center;
    .progress-bar-box {
      width: 260px;
      cursor: pointer;
      margin: var(--padding-small);
    }
    span {
      font-size: 12px;
    }
  }
}
</style>
