import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SvgIcon from '@/components/common/svgIcon.vue'
import { pinia } from './store'
import { vPreventRepeatClick } from '@/lib/directives'

import 'normalize.css'
import './style/global.scss'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(router)
app.use(pinia)
app.use(vPreventRepeatClick)

router.isReady().then(() => {
  app.mount('#app')
})
