import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SvgIcon from '@/components/common/svgIcon.vue'

import 'normalize.css'
import './style/global.scss'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(router)

router.isReady().then(() => {
  const loadingPage = document.querySelector('.loading-page')
  if (loadingPage) {
    loadingPage?.parentNode?.removeChild(loadingPage)
  }
  app.mount('#app')
})
