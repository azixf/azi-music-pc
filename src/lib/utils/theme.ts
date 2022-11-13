type ThemeData = {
  [key: string]: { 
    '--el-color-primary': string
  }
}

export const themes: ThemeData = {
  default: {
    '--el-color-primary': '#ec4141'
  },
  skyblue: {
    '--el-color-primary': '#1890ff'
  },
  purple: {
    '--el-color-primary': '#ac2ac2'
  },
  green: {
    '--el-color-primary': '#008c63'
  },
  grey: {
    '--el-color-primary': '#88717c'
  }
}

export enum ThemeName {
  'default' = '默认',
  'skyblue' = '天空蓝',
  'purple' = '高贵紫',
  'green' = '青草绿',
  'grey' = '水泥灰'
}