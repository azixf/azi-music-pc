<template>
  <div :class="['nav-item', { active: props.active, 'sub-title': props.type === 'second' }]">
      <span class="flex align-center">
        <span :class="{ 'm-r-8': $slots.prefix }">
          <slot name="prefix"></slot>
        </span>
        <span class="nav-item-label">
          {{label}}
        </span>
      </span>
      <span>
        <slot name="suffix"></slot>
      </span>
    </div>
</template>

<script lang='ts'>
  export default {
    name: 'Navitem'
  }
</script>

<script lang='ts' setup>
interface NavItemProps {
  active?: boolean
  label: string
  type?: 'main' | 'second'
}

const props = withDefaults(defineProps<NavItemProps>(), {
  active: false,
  type: 'main'
})
</script>

<style lang='scss' scoped>
.nav-item {
    padding: var(--padding-small);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--padding-mini);
    &.active {
      .nav-item-label {
        font-size: var(--font-extra-large);
        font-weight: var(--font-weight-600);
      }
      background: var(--color-nav-hover);
      border-radius: var(--radius-small);
    }
    &:hover {
      background: var(--color-nav-hover);
      border-radius: var(--radius-small);
    }
    &.sub-title {
      padding: var(--padding-default) var(--padding-small);
      color: var(--color-subtitle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: auto;
      &:hover {
        background-color: unset;
      }
      span {
        font-size: var(--font-small);
      }
      :deep(.svg-icon) {
        cursor: pointer;
      }
    }
  }
</style>
