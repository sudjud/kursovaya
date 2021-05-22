import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Catalog from "./components/Catalog";
import Registration from "./components/Registration";
import Account from "./components/Account";
import Basket from "./components/Basket";
import Auth from "./components/Auth";
import firebase from "firebase";
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  { path: '/catalog', component: Catalog },
  { path: '/registration', component: Registration },
  { path: '/account', component: Account },
  { path: '/basket', component: Basket },
  { path: '/auth', component: Auth },
];

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App),
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyDmlcPSM7AyGAXtL8ML-OYDwyTI8i9Of2Y",
      authDomain: "coorsovaya.firebaseapp.com",
      databaseURL: "https://coorsovaya-default-rtdb.firebaseio.com",
      projectId: "coorsovaya",
      storageBucket: "coorsovaya.appspot.com",
      messagingSenderId: "399276165097",
      appId: "1:399276165097:web:3d93b029f0b310328f6d78"
    };

    firebase.initializeApp(firebaseConfig);
  }
}).$mount('#app')
