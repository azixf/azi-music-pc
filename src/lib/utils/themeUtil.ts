import { Ref } from "vue"

// 生成色阶
export const colorMix = (color1: string, color2: string, weight: number) => {
  weight = Math.max(Math.min(Number(weight), 1), 0)
  let r1 = parseInt(color1.substring(1, 3), 16)
  let g1 = parseInt(color1.substring(3, 5), 16)
  let b1 = parseInt(color1.substring(5, 7), 16)
  let r2 = parseInt(color2.substring(1, 3), 16)
  let g2 = parseInt(color2.substring(3, 5), 16)
  let b2 = parseInt(color2.substring(5, 7), 16)
  let r = Math.round(r1 * (1 - weight) + r2 * weight)
  let g = Math.round(g1 * (1 - weight) + g2 * weight)
  let b = Math.round(b1 * (1 - weight) + b2 * weight)
  r = ("0" + (r || 0).toString(16)).slice(-2) as any
  g = ("0" + (g || 0).toString(16)).slice(-2) as any
  b = ("0" + (b || 0).toString(16)).slice(-2) as any
  return "#" + r + g + b;
}

export const setTheme = (themeColor: string) => {
  const colorObj: any = {}
  const prefix = '--el-color-primary'
  for (let i = 0; i < 10; i++) {
    if (i === 2) {
      colorObj[`${prefix}-dark-2`] = colorMix('#000000', themeColor, 1)
    } else {
      colorObj[`${prefix}-light-${10-i}`] = colorMix('#ffffff', themeColor, i * 0.1)
    }
  }
  document.documentElement.style.setProperty(prefix, themeColor)
  Object.keys(colorObj).map(item => {
    document.documentElement.style.setProperty(item, colorObj[item])
  })
  localStorage.primaryColor = themeColor
}