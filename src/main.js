import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";

import MainPage from "@/components/pages/MainPage";
import Reservation from "@/components/pages/Reservation";
import Hotel from "@/components/pages/Hotel";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueRouter);

const routes = [
  { path: "/", component: MainPage },
  { path: "/reservation", component: Reservation },
  { path: "/hotel/:id", name: "hotel", component: Hotel },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
