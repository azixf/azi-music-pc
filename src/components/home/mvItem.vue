<template>
  <div class="mv-item-wrapper">
    <img :src="cover" alt="bg" />
    <div class="mv-item-mask" v-if="!!info">
      {{ info }}
    </div>
    <div class="mv-item-detail">
      <p class="mv-name">{{ name }}</p>
      <p class="mv-author">{{ author }}</p>
    </div>
    <div class="mv-item-count">
      播放量：{{ playcount }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MvItem",
};
</script>

<script lang="ts" setup>
interface MVItemProp {
  cover: string,
  name: string,
  author: string,
  info?: string,
  playcount?: number
}

withDefaults(defineProps<MVItemProp>(), {
  info: '',
   playcount: 0
})
</script>

<style lang="scss" scoped>
.mv-item-wrapper {
  position: relative;
  border-radius: var(--radius-small);
  overflow: hidden;
  cursor: pointer;
  > img {
    width: 100%;
  }
  &:hover {
    .mv-item-mask {
      top: 0;
    }
  }
  .mv-item-mask {
    position: absolute;
    top: -60px;
    transition: top .3s;
    will-change: top;
    left: 0;
    width: 100%;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    background-color: rgba(0, 0, 0, 0.2);
    padding: var(--padding-small);
    color: #ffffff;
    z-index: 2;
  }

  .mv-item-count {
    position: absolute;
    top: var(--padding-mini);
    right: var(--padding-mini);
    z-index: 1;
    height: 20px;
    line-height: 20px;
    color: #ffffff;
  }

  .mv-item-detail {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .mv-name {
      font-style: italic;
      letter-spacing: 2px;
      padding: var(--padding-mini) 0;
    }
    .mv-author {
      font-size: var(--font-small);
      padding: var(--padding-mini) 0;
      color: var(--color-text);
    }
  }
}
</style>
