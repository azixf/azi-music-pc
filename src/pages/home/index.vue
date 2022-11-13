<template>
  <div>HomePage</div>
  <el-select v-model="currentTheme" placeholder="请选择" @change="changeTheme">
    <el-option v-for="item in Object.keys(themeColorObj)" :label="themeColorObj[item]?.title" :value="item"></el-option>
  </el-select>
</template>

<script lang='ts'>
  export default {
    name: 'HomePage'
  }
</script>

<script lang='ts' setup>
import { setTheme } from '@/lib/utils/themeUtil'
import { themes, ThemeName } from '@/lib/utils/theme';
const currentTheme = ref('default')

let themesOptions: any = {}
Object.keys(themes).forEach(item => {
  themesOptions[item] = {
    title: (ThemeName as any)[item]
  }
})

const themeColorObj = ref<any>(themesOptions)

const themeObj = ref<any>({})

const changeTheme = (theme: string) => {
  console.log(theme);
  currentTheme.value = theme
  themeObj.value = (themes as any)[theme]
  setTheme(themeObj)
  localStorage.theme = theme
}

</script>

<style lang='scss' scoped>
</style>
