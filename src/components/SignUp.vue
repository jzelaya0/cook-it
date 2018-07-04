<template lang="html">
  <div class="sign-up">
    <h1>Sign Up</h1>
    <input v-model="email" type="email" name="email" placeholder="E-mail">
    <input v-model="password" type="password" name="password" placeholder="Password">
    <button v-on:click="signUp" type="button" name="sign-up">Sign Up</button>
    <p>Go back to <router-link :to="{ path: '/login' }">Sign In</router-link></p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signUp',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert('Your account has been created')
          console.log(user);
        },
        (err) => {
          alert(`Opps.. ${err.message}`)
        }
      )
    }
  }
}
</script>

<style lang="css">
</style>
