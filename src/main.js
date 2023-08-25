import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./style.scss"
import "./vue-simple-spinner.min.js"

createApp(App).use(router).mount("#app")
