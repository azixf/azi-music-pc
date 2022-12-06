<template>
  <div class="search-box-wrapper">
    <div class="layout-header-search">
      <div class="layout-header-browser-btns flex align-center">
        <div class="browser-btn back active" title="刷新" @click="refeshWindow">
          <font-icon name="refresh" size="18" color="var(--color-header-icon)" />
        </div>
        <div
          :class="[
            'browser-btn',
            'back',
            {
              active: _router.router.previous.size > 0,
            },
          ]"
          title="后退"
          @click="_router.router.goToPrevious"
        >
          <svg-icon name="arrow-left" color="var(--color-header-icon)" />
        </div>
        <div
          :class="['browser-btn', { active: _router.router.next.size > 0 }]"
          title="前进"
          @click="_router.router.goToNext"
        >
          <svg-icon name="arrow-right" color="var(--color-header-icon)" />
        </div>
      </div>
      <div class="layout-header-input flex align-center">
        <svg-icon name="search" color="#fff" size="14px" class="search-icon" />
        <input type="text" placeholder="请输入" class="search-input" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SearchBox",
};
</script>

<script lang="ts" setup>
import { useStore } from "@/store";

const { _router } = useStore();

const refeshWindow = () => {
  location.reload();
}
</script>

<style lang="scss" scoped>
.search-box-wrapper {
  .layout-header-search {
    display: flex;
    align-items: center;
    .browser-btn {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      background: var(--color-icon-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: not-allowed;
      &.back {
        margin-right: var(--padding-small);
      }
      &.active {
        cursor: pointer;
        &:active {
          opacity: 0.67;
        }
        :deep(.svg-icon) {
          color: #ffffff !important;
        }
      }
    }

    .layout-header-input {
      margin-left: var(--padding-default);
      padding: 0 var(--padding-small);
      width: 200px;
      height: 32px;
      border-radius: 32px;
      background-color: var(--color-icon-bg);
      position: relative;
      .search-icon {
        position: absolute;
        left: 12px;
      }
      .search-input {
        margin-left: var(--padding-large);
        outline: none;
        border: none;
        background-color: transparent;
        color: #ffffff;
        &::placeholder {
          color: var(--color-header-icon);
        }
      }
    }
  }
}
</style>
