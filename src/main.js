import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

createApp(App).use(router).use(store).mount("#app")
