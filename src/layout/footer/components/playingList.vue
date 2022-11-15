<template>
  <div class="playing-list">
    <svg-icon name="musiclist" />
  </div>
</template>

<script lang="ts">
export default {
  name: "PlayingList",
};
</script>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.playing-list {
  .svg-icon {
      cursor: pointer;
    }
}
</style>
