<template lang="html">
  <div class="login">
    <h1>Sign In</h1>
    <input v-model="email" type="email" name="email" placeholder="E-mail">
    <input v-model="password" type="password" name="password" placeholder="Password">
    <button type="button" name="button" v-on:click="login">Log In</button>
    <p>Don't have an account? You can create one <router-link :to="{ path: 'sign-up'}">here</router-link></p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert('You are now connected')
        },

        (err) => {
          alert(`Opps ${err.message}`)
        }
      )
    }
  }
}
</script>

<style lang="css">
</style>
