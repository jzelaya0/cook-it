<template lang="html">
  <div class="sign-up">
    <div v-if="performingRequest" class="loading-wrapper">
      <loading-state></loading-state>
    </div>
    <h1>Sign Up</h1>
    <input v-model="name" type="text" name="name" placeholder="Name">
    <input v-model="email" type="email" name="email" placeholder="E-mail">
    <input v-model="password" type="password" name="password" placeholder="Password">
    <button v-on:click="signUp" type="button" name="sign-up">Sign Up</button>
    <p>Go back to <router-link :to="{ path: '/login' }">Sign In</router-link></p>
  </div>
</template>

<script>
import LoadingState from '@/components/LoadingState'
const firebase = require('../firebaseConfig.js')

export default {
  components: {
    LoadingState
  },
  name: 'signUp',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      performingRequest: false,
    }
  },
  methods: {
    signUp() {
      this.performingRequest = true;

      firebase.auth.createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$store.commit('setCurrentUser', user.user)

          // Save user in firestore database
          firebase.usersCollection.doc(user.user.uid).set({
              name: this.name
          }).then(() => {
            this.$store.dispatch('fetchUserProfile')
            this.$router.push('/dashboard')
          }).catch(err => {
            console.log(err)
          })
        },
        (err) => {
          alert(`Opps.. ${err.message}`)
          this.performingRequest = false;
        }
      )
    }
  }
}
</script>

<style lang="css">
</style>
