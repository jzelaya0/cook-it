import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

// Components
import LoginPage from "@/views/LoginPage.vue"
import SignUpPage from '@/views/SignUpPage.vue'
import Dashboard from '@/views/DashboardPage.vue'
import Settings from '@/views/SettingsPage.vue'
import Recipe from '@/views/RecipePage.vue'


Vue.use(Router)

let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUpPage
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipe/:id',
      name: 'Recipe',
      component: Recipe,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  } else if (!requiresAuth && currentUser) {
    next('dashboard');
  } else {
    next();
  }
})

export default router
