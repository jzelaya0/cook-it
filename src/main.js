// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store.js'
import BootstrapVue from 'bootstrap-vue'

const firebase = require('./firebaseConfig.js')

import './assets/scss/main.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.config.productionTip = false

let app;

firebase.auth.onAuthStateChanged((user) => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      store: store,
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
