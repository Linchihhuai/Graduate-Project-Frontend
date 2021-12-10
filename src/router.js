import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import CreateAd from './components/CreateAd.vue'

import Forgot from "./components/Forgot.vue";
import Reset from './components/Reset.vue'
import Annonce from './components/Annonce.vue'

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/register", component: Login },
    { path: "/createAd", component: CreateAd },
    { path: "/annonce", component: Annonce },
    { path: "/forgot", component: Forgot },
    {path:"/reset/:token",component:Reset}
  ],
});
