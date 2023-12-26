import { createApp } from "vue";
import App from "./App.vue";
import Header from "./components/layout/Header.vue";

const app = createApp(App);

app.component("Header", Header);

app.mount("#app");
