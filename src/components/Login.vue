<template lang="html">
  <div class="login">
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>
    <h1>Sign In</h1>
    <input v-model="email" type="email" name="email" placeholder="E-mail">
    <input v-model="password" type="password" name="password" placeholder="Password">
    <button type="button" name="button" v-on:click="login">Log In</button>
    <p>Don't have an account? You can create one <router-link :to="{ path: 'sign-up'}">here</router-link></p>
  </div>
</template>

<script>
const firebase = require('../firebaseConfig.js')

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      performingRequest: false,
    }
  },
  methods: {
    login() {
      this.performingRequest = true;

      firebase.auth.signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          console.log(user.user);
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchUserProfile')
          this.$router.push('/dashboard')
        },

        (err) => {
          alert(`Opps ${err.message}`)
          this.performingRequest = false;
        }
      )
    }
  }
}
</script>

<style lang="css">
</style>
