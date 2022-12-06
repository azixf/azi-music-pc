import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import { commonComponent } from '@/components/common';
import contextMenu from 'vue3-contextmenu';

import 'normalize.css'
import './style/global.scss'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-loading.css'
import '@/assets/iconfont/iconfont.css'
import 'vue3-contextmenu/dist/vue3-contextmenu.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(commonComponent)
app.use(contextMenu)

router.isReady().then(() => {
  app.mount('#app')
})
