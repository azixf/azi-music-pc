<template>
  <div class="skin-icon" @click="changeDrawerVisible">
    <svg-icon name="skin" size="18px" color="var(--color-header-icon)" />
  </div>
  <el-drawer v-model="drawerVisible" title="更换皮肤">
    <div class="theme-title">预设主题</div>
    <div class="themes">
        <div
          v-for="item in Object.keys(themeColorObj)"
          :class="[{ checked: theme === item }, 'theme-box']"
          :style="{ backgroundColor: themes[item] }"
          :key="item"
          @click="onThemeClick(item)"
        >
          {{ themeColorObj[item]?.title }}
        </div>
    </div>
    <div class="theme-title">自定义主题</div>
    <div>
      <el-color-picker v-model="primaryColor" @change="onColorChange" />
    </div>
  </el-drawer>
</template>

<script lang="ts">
export default {
  name: "SkinComp",
};
</script>

<script lang="ts" setup>
import { ThemeName, themes } from "@/theme/theme";
import { setTheme } from "@/lib/utils/themeUtil";
import { useStore } from "@/store";

const themeColorObj: any = ref<any>({});
Object.keys(themes).forEach(item => {
  themeColorObj.value[item] = {
    title: (ThemeName as any)[item],
  };
});

const { system } = useStore();
const { theme, primaryColor } = storeToRefs(system);

const onThemeClick = (current: string) => {
  theme.value = current;
  primaryColor.value = themes[current];
  setTheme(themes[current]);
};

const drawerVisible = ref(false);

const changeDrawerVisible = () => {
  drawerVisible.value = !drawerVisible.value;
};

const onColorChange = (current: string) => {
  theme.value = "custom";
  primaryColor.value = current;
  setTheme(current);
};
</script>

<style lang="scss" scoped>
.skin-icon {
  .svg-icon {
    cursor: pointer;
    &:hover {
      color: #ffffff !important;
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
