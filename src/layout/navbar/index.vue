<template>
  <nav class="layout-nav">
    <nav-item label="发现音乐" active></nav-item>
    <nav-item label="私人FM">
      <template #prefix>
        <svg-icon name="heart" size="18px" />
      </template>
    </nav-item>
    <nav-item label="创建歌单" type="second">
      <template #suffix>
        <svg-icon name="add" size="14px" color="var(--color-subtitle)" />
      </template>
    </nav-item>
  </nav>
</template>

<script lang="ts">
import NavItem from "./components/navItem.vue";
export default {
  name: "LayoutNav",
  components: {
    NavItem,
  },
};
</script>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.layout-nav {
  padding: var(--padding-default) 0 var(--padding-default)
    var(--padding-default);
  // .nav-item {
  //   padding: var(--padding-mini) var(--padding-small);
  //   cursor: pointer;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   margin-bottom: var(--padding-mini);
  //   &.active {
  //     font-size: var(--font-extra-large);
  //     font-weight: var(--font-weight-600);
  //     background: var(--color-nav-hover);
  //     border-radius: var(--radius-small);
  //   }
  //   &:hover {
  //     background: var(--color-nav-hover);
  //     border-radius: var(--radius-small);
  //   }
  //   :slotted(.prefix-icon) {
  //     margin-right: var(--padding-default);
  //   }
  // }
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
