// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store.js'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faSpinner, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Firebase
const firebase = require('./firebaseConfig.js')

// Bootstrap
import './assets/scss/main.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

// FontAwesomeIcons
library.add(faPlus, faMinus, faSpinner, faEdit)
Vue.component('font-awesome-icon', FontAwesomeIcon)

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
