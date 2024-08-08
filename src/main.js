import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GlobalComponent from "./components/GlobalComponent.vue";

createApp(App)
.use(router)
.use(store)
.component(GlobalComponent.name, GlobalComponent) // 전역 컴포넌트로 사용
.mount('#app')