<template>
  <h1>HomePage</h1>
  <el-button type="primary" @click="handleClick">aaa</el-button>
</template>

<script lang='ts'>
  export default {
    name: 'HomePage'
  }
</script>

<script lang='ts' setup>
import { appWindow } from '@tauri-apps/api/window'

enum WindowOperationOptions {
  'minify',
  'fullScreen',
  'close'
}
const handleClick = () => {
  appWindow.minimize()
}
</script>

<style lang='scss' scoped>
</style>
