<template>
  <div class="list-item-wrapper flex flex-col">
    <div class="list-item-bg flex-1">
      <img :src="src" alt="music-cover" :style="{ width, height: width}" />
      <div :class="[ center ? 'center' : 'icon-wrapper']" v-if="showIcon">
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
  width?: string
  showMask?: boolean,
  maskText?: string,
  center?: boolean,
  detail?: string,
  showIcon?: boolean,
  src: string
}

withDefaults(defineProps<ListItemProps>(), {
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
  height: 100%;
  .list-item-bg {
    position: relative;
    border-radius: var(--radius-default);
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
    }
    .icon-wrapper {
      position: absolute;
      padding: var(--padding-mini);
      border-radius: 50%;
      background-color: #Fff;
      right: var(--padding-small);
      bottom: var(--padding-small);
      display: none;
    }
    .center {
      position: absolute;
      padding: var(--padding-small);
      border-radius: 50%;
      background-color: #ffffff;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%) translateZ(0); 
      display: none;
    }
    &:hover {
      .icon-wrapper, .center {
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
    width: 100%;
    word-break: break-all;
    color: var(--color-text);
    font-size: var(--font-small);
  }
}
</style>
