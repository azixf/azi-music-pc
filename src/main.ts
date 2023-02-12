import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { pinia } from "./store";

import "reset-css";
import "./style/global.scss";
import "./style/elementplus.scss";
import "@/assets/iconfont/iconfont.css";

const app = createApp(App);
app.use(router);
app.use(pinia);

router.isReady().then(() => {
  app.mount("#app");
});
