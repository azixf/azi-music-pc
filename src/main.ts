import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SvgIcon from '@/components/common/svgIcon.vue'
import { invoke } from '@tauri-apps/api'

import 'normalize.css'
import './style/global.scss'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(router)

router.isReady().then(() => {
  invoke('close_splashscreen').then(() => {
    app.mount('#app')
  })
})
