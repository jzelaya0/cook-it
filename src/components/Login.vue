<template lang="html">
  <div class="login">
    <div v-if="errorMessage !== ''"  class="error-message">
      <alert v-bind:message="errorMessage"></alert>
    </div>
    <div v-if="performingRequest" class="loading-wrapper">
      <loading-state></loading-state>
    </div>
    <h1>Sign In</h1>
    <input v-model="email" type="email" name="email" placeholder="E-mail">
    <input v-model="password" type="password" name="password" placeholder="Password">
    <button type="button" name="button" v-on:click="login">Log In</button>
    <p>Don't have an account? You can create one <router-link :to="{ path: 'sign-up'}">here</router-link></p>
  </div>
</template>

<script>
import LoadingState from '@/components/LoadingState'
import Alert from '@/components/Alert'

const firebase = require('../firebaseConfig.js')

export default {
  components: {
    LoadingState,
    Alert
  },
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      performingRequest: false,
      errorMessage: ''
    }
  },
  methods: {
    login() {
      this.performingRequest = true
      this.errorMessage = ''

      firebase.auth.signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          console.log(user.user);
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchUserProfile')
          this.$router.push('/dashboard')
        },

        (err) => {
          this.performingRequest = false
          this.errorMessage = err.message
        }
      )
    }
  }
}
</script>

<style lang="css">
</style>
