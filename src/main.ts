import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SvgIcon from '@/components/common/svgIcon.vue'
import { invoke } from '@tauri-apps/api'
import { pinia } from './store'
import { vPreventRepeatClick } from '@/lib/directives'

import 'normalize.css'
import './style/global.scss'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(router)
app.use(pinia)
app.use(vPreventRepeatClick)

router.isReady().then(() => {
  invoke('close_splashscreen').then(() => {
    app.mount('#app')
  })
})
