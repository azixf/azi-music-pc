<template>
  <i :class="iconClass" :style="iconStyle" v-bind="$attrs"></i>
</template>

<script lang='ts'>
  export default {
    name: 'FontIcon'
  }
</script>

<script lang='ts' setup>
import { StyleValue } from 'vue';

interface FontIconProps {
  name: string,
  size?: string | number,
  color?: string,
  cursor?: boolean,
  hoverColor?: string
}

const props = withDefaults(defineProps<FontIconProps>(), {
  color: '#333333',
  size: 24,
  cursor: true,
  hoverColor: ''
})

const iconClass = computed((): string => {
  return props.hoverColor ? `iconfont icon-${props.name} icon-hover` : `iconfont icon-${props.name}`
})

const iconStyle = computed((): StyleValue => {
  return {
    fontSize: props.size + 'px',
    color: props.color,
    cursor: props.cursor ? 'pointer' : 'normal'
  }
})
</script>

<style lang='scss' scoped>
.icon-hover {
  &:hover {
    color: v-bind('props.hoverColor') !important;
  }
}
</style>
