<template>
  <div class="item-title-wrapper">
    <span>{{ title }}</span>
    <svg-icon name="arrow-right" @click="onIconClick"/>
  </div>
</template>

<script lang='ts'>
  export default {
    name: 'ItemTitle'
  }
</script>

<script lang='ts' setup>
interface ItemTitleProps {
  title: string
}
defineProps<ItemTitleProps>();

const $emit = defineEmits<{ (event: 'click'): void }>()

const onIconClick = () => {
  $emit('click');
}
</script>

<style lang='scss' scoped>
.item-title-wrapper {
  display: flex;
  align-items: center;
  padding: var(--padding-default) 0;
  span {
    font-size: var(--font-extra-large);
    font-weight: var(--font-weight-600);
    margin-right: var(--padding-default);
  }
  .svg-icon {
    cursor: pointer;
  }
}
</style>
