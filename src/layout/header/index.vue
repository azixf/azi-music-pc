<template>
  <header
    data-tauri-drag-region
    class="layout-header-wrapper flex align-center justify-between"
  >
    <div class="layout-header-logo flex align-center">
      <svg-icon
        name="netease-cloud-music-fill"
        color="#ffffff"
        size="32px"
      ></svg-icon>
      <strong class="logo-text">4U Music</strong>
    </div>
    <div class="layout-header-search">
      <div class="layout-header-browser-btns flex align-center">
        <div
          :class="[
            'browser-btn',
            'back',
            {
              active: _router.router.previous.size > 0,
            },
          ]"
          @click="_router.router.goToPrevious"
        >
          <svg-icon
            name="arrow-left"
            color="var(--color-header-icon)"
          ></svg-icon>
        </div>
        <div :class="['browser-btn', { active: _router.router.next.size > 0 }]" @click="_router.router.goToNext">
          <svg-icon
            name="arrow-right"
            color="var(--color-header-icon)"
          ></svg-icon>
        </div>
      </div>
      <div class="layout-header-input flex align-center">
        <svg-icon name="search" color="#fff" size="14px" class="search-icon" />
        <input type="text" placeholder="请输入" class="search-input" />
      </div>
    </div>
    <div class="layout-header-operations">
      <skin-comp />
      <svg-icon name="settings" color="var(--color-header-icon)" />
      <el-divider direction="vertical" />
      <window-operation />
    </div>
  </header>
</template>

<script lang="ts">
import { useStore } from "@/store";
import SkinComp from "./components/skin.vue";
import windowOperation from "./components/windowOperation.vue";
export default {
  name: "LayoutHeader",
  components: {
    SkinComp,
    windowOperation,
  },
};
</script>

<script lang="ts" setup>
const { _router } = useStore();
</script>

<style lang="scss" scoped>
.layout-header-wrapper {
  height: 100%;
  background: var(--color-primary);
  padding: 0 var(--padding-default);
}

.layout-header-logo {
  .logo-text {
    color: #ffffff;
    margin-left: var(--padding-small);
    font-size: 18px;
    font-weight: 600;
  }
}

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

.layout-header-operations {
  display: flex;
  align-items: center;
  gap: 0 var(--padding-default);
  .svg-icon {
    cursor: pointer;
    &:hover {
      color: #ffffff !important;
    }
  }
}
</style>
