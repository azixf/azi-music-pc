<template>
  <header data-tauri-drag-region class="layout-header-wrapper flex align-center justify-between">
    <div class="layout-header-logo flex align-center">
      <svg-icon name="netease-cloud-music-fill" color="#ffffff" size="32px"></svg-icon>
      <strong class="logo-text">4U</strong>
    </div>
    <div class="layout-header-search">
      <div class="layout-header-browser-btns flex align-center">
        <div class="browser-btn back">
          <svg-icon name="arrow-left" color="var(--color-header-icon)"></svg-icon>
        </div>
        <div class="browser-btn forward">
          <svg-icon name="arrow-right" color="var(--color-header-icon)"></svg-icon>
        </div>
      </div>
      <div class="layout-header-input flex align-center">
        <svg-icon name="search" color="#fff" size="14px" class="search-icon" />
        <input type="text" placeholder="请输入"  class="search-input"/>
      </div>
    </div>
    <div class="layout-header-operations">
      <skin-comp />
      <svg-icon name="settings" color="var(--color-header-icon)"/>
      <el-divider direction="vertical"/>
      <svg-icon name="minus" size="18px" color="var(--color-header-icon)" @click="onOperateWindow('minify')"/>
      <svg-icon name="full_screen" size="18px" color="var(--color-header-icon)" @click="onOperateWindow('toggleMaxize')" />
      <svg-icon name="close" size="18px" color="var(--color-header-icon)" @click="onOperateWindow('close')" />
    </div>
  </header>
  <el-dialog v-model="closeDialogVisible" title="关闭应用" width="45%">
    <el-form ref="modalForm" :model="form">
      <p>
        <el-radio-group v-model="form.closeType">
          <el-radio label="close">直接关闭应用</el-radio>
          <el-radio label="hide">最小化到托盘</el-radio>
        </el-radio-group>
      </p>
      <el-checkbox v-model="form.remembered" label="始终如此" border />
      <div slot="footer">
        <el-button type="primary">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script lang='ts'>
import SkinComp from './components/skin.vue'
export default {
  name: 'LayoutHeader',
  components: {
      SkinComp
    }
}
</script>

<script lang='ts' setup>
import { appWindow } from '@tauri-apps/api/window'

const modalForm = ref()
const form = reactive({
  remembered: false,
  closeType: 'hide'
})
const closeDialogVisible = ref(false)

type WindowOperitionType = 'minify' | 'toggleMaxize' | 'close'
const onOperateWindow = (type: WindowOperitionType) => {
  if (type === 'minify') {
    appWindow.minimize()
  } else if (type === 'toggleMaxize') {
    appWindow.toggleMaximize()
  } else {
    const isDirectlyClose = localStorage.directlyClose || false
    if (isDirectlyClose) return appWindow.close()
    closeDialogVisible.value = true
  }
}
</script>

<style lang='scss' scoped>
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
    cursor: pointer;
    &.back {
      margin-right: var(--padding-small);
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
