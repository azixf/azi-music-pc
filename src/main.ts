import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import { commonComponent } from '@/components/common';

import 'normalize.css'
import './style/global.scss'
import './style/_elementplus.scss'
import '@/assets/iconfont/iconfont.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(commonComponent)

router.isReady().then(() => {
  app.mount('#app')
})
