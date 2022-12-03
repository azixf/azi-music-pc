<template>
  <label>
    选择文件
    <input ref="input" type="file" id="file">
  </label>
</template>

<script lang='ts'>
  export default {
    name: 'TestPage'
  }
</script>

<script lang='ts' setup>
const input = ref()
onMounted(() => {
  input.value.onchange = function (e: any) {
    console.log(e.target.path);
  }
})
</script>

<style lang='scss' scoped>
</style>
