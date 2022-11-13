<template>
  <nav class="layout-nav">
    <div class="nav-item active">发现音乐</div>
    <div class="nav-item">
      <span class="flex align-center">
        <slot name="prefix" class="prefix-icon">
          <svg-icon name="heart" size="18px" />
        </slot>
        <span>私人FM</span>
      </span>
      <span>
        <svg-icon name="Heartbeat" size="18px" />
      </span>
    </div>
    <div class="sub-title">
      <span>创建的歌单</span>
      <span>
        <svg-icon name="add" size="14px" color="var(--color-subtitle)" />
      </span>
    </div>
    <div class="nav-item">
      <span class="flex align-center">
        <slot name="prefix" class="prefix-icon">
          <svg-icon name="heart" size="18px" />
        </slot>
        <span>私人FM</span>
      </span>
      <span>
        <svg-icon name="add" size="18px" />
      </span>
    </div>
  </nav>
</template>

<script lang='ts'>
  export default {
    name: 'LayoutNav'
  }
</script>

<script lang='ts' setup>
import type { DropdownOption } from 'naive-ui'
const options: DropdownOption[] = [
  {
    label: '创建歌单',
    key: 1
  }
]
</script>

<style lang='scss' scoped>
.layout-nav {
  padding: var(--padding-default) 0 var(--padding-default) var(--padding-default);
  .nav-item {
    padding: var(--padding-mini) var(--padding-small);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--padding-mini);
    &.active {
      font-size: var(--font-extra-large);
      font-weight: var(--font-weight-600);
      background: var(--color-nav-hover);
      border-radius: var(--radius-small);
    }
    &:hover {
      background: var(--color-nav-hover);
      border-radius: var(--radius-small);
    }
    :slotted(.prefix-icon) {
      margin-right: var(--padding-default);
    }
  }
  .sub-title {
    padding: var(--padding-default) var(--padding-small);
    color: var(--color-subtitle);
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: var(--font-small);
    }
    .svg-icon {
      cursor: pointer;
    }
  }
}
</style>
