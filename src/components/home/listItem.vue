<template>
  <div class="list-item-wrapper">
    <div class="list-item-bg">
      <img :src="src" alt="" />
      <div class="icon-wrapper" v-if="showIcon">
        <svg-icon name="play_fill" size="18px" color="red" />
      </div>
      <div class="mask text-2-ellipsis" v-if="showMask">
        {{ maskText }}
      </div>
    </div>
    <div class="list-item-detail text-2-ellipsis">
      {{ detail }}
    </div>
  </div>
</template>

<script lang='ts'>
  export default {
    name: 'ListItem'
  }
</script>

<script lang='ts' setup>
interface ListItemProps {
  width?: string,
  height?: string,
  showMask?: boolean,
  maskText?: string,
  center?: boolean,
  detail?: string,
  showIcon?: boolean,
  src: string
}

withDefaults(defineProps<ListItemProps>(), {
  width: '160px',
  height: '160px',
  showMask: false,
  maskText: '',
  center: false,
  detail: '',
  showIcon: true
})


</script>

<style lang='scss' scoped>
.list-item-wrapper {
  cursor: pointer;
  .list-item-bg {
    position: relative;
    border-radius: var(--radius-default);
    overflow: hidden;
    > img {
      width: v-bind(width);
      height: v-bind(height);
    }
    .icon-wrapper {
      position: absolute;
      padding: var(--padding-mini);
      border-radius: 50%;
      background-color: #Fff;
      right: var(--padding-small);
      bottom: var(--padding-small);
      display: none;
      &.center {
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%) translateZ(0);
      }
    }
    &:hover {
      .icon-wrapper {
      display: block;
      }
      .mask {
        top: 0;
      }
    }
    .mask {
      position: absolute;
      top: -40px;
      left: 0;
      width: 100%;
      height: 40px;
      padding: var(--padding-mini) var(--padding-small);
      background-color: rgba(0,0,0,.3);
      color: var(--color-bg);
      font-size: var(--font-small);
      transition: top .3s;
      will-change: top;
    }
  }
  .list-item-detail {
    padding-top: var(--padding-small);
    width: v-bind(width);
    word-break: break-all;
    color: var(--color-text);
    font-size: var(--font-small);
  }
}
</style>
