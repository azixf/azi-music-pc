<template>
  <div class="skin-icon" @click="changeDrawerVisible">
    <svg-icon name="skin" size="18px" color="var(--color-header-icon)"/>
  </div>
  <el-drawer v-model="drawerVisible" title="更换皮肤">
    <div class="theme-title">预设主题</div>
    <div class="themes">
      <template v-for="item in Object.keys(themeColorObj)">
        <div :class="[{checked: theme === item },'theme-box']" :style="{ backgroundColor: themes[item]}" @click="onThemeClick(item)">{{ themeColorObj[item]?.title }}</div>
      </template>
    </div>
    <div class="theme-title">自定义主题</div>
    <div>
      <el-color-picker v-model="color" @change="onColorChange" />
    </div>
  </el-drawer>
</template>

<script lang='ts'>
  export default {
    name: 'SkinComp'
  }
</script>

<script lang='ts' setup>
import { ThemeName, themes } from '@/lib/utils/theme'
import { setTheme } from '@/lib/utils/themeUtil';

const themeColorObj: any = ref<any>({})
Object.keys(themes).forEach(item => {
  themeColorObj.value[item] = {
    title: (ThemeName as any)[item]
  }
})

const theme = ref(localStorage.theme || 'default')

const onThemeClick = (current: string) => {
  theme.value = current
  localStorage.theme = current
  setTheme(themes[current])
}

const drawerVisible = ref(false)

const changeDrawerVisible = () => {
  drawerVisible.value = !drawerVisible.value
}

const color = ref(localStorage.primaryColor || '#ec4141')
const onColorChange = (current: string) => {
  color.value = current
  theme.value = 'custom'
  localStorage.theme = 'custom'
  setTheme(color.value)
}
</script>

<style lang='scss' scoped>
.skin-icon {
  .svg-icon {
    cursor: pointer;
    &:hover {
      color: #ffffff;
    }
  }
}

.theme-title {
  margin-bottom: var(--padding-default);
}
.themes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--padding-default);
  margin-bottom: var(--padding-default);
  .theme-box {
    height: 32px;
    border-radius: var(--radius-default);
    text-align: center;
    line-height: 32px;
    color: var(--color-bg);
    font-size: var(--font-small);
    cursor: pointer;
    &:active {
      filter: brightness(130%);
    }
    &.checked {
      filter: blur(2px);
    }
  }
}
</style>
