<template>
  <div class="new-item-wrapper">
    <div class="new-item-left">
      <list-item center v-bind="$attrs" />
    </div>
    <div class="new-item-right">
      <div class="song-name">{{ music }}</div>
      <div class="song-singer">
        <span class="flag" v-if="mv">
          <mdi-icon name="music_video"  />
        </span>
        <span>{{ singer }}</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  export default {
    name: 'NewItem'
  }
</script>

<script lang='ts' setup>
interface NewItemProps {
  music: string,
  singer: string,
  mv?: boolean
}

withDefaults(defineProps<NewItemProps>(), {
  mv: false
})
</script>

<style lang='scss' scoped>
.new-item-wrapper {
  display: flex;
  .new-item-left {
    margin-right: var(--padding-default);
  }
  .new-item-right {
    padding: var(--padding-mini) 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .song-name {
      color: var(--color-title);
      font-style: italic;
      cursor: pointer;
    }
    .song-singer {
      color: var(--color-text);
      span {
        font-size: var(--font-small);
        cursor: pointer;
      }
      .flag {
        color: var(--color-primary);
        padding-right: var(--padding-mini);
        font-weight: var(--font-weight-600);
        font-style: italic;
        cursor: pointer;
      }
    }
  }
}
</style>
