<template lang="html">
  <div class="sign-up">
    <h1>Sign Up</h1>
    <input v-model="name" type="text" name="name" placeholder="Name">
    <input v-model="email" type="email" name="email" placeholder="E-mail">
    <input v-model="password" type="password" name="password" placeholder="Password">
    <button v-on:click="signUp" type="button" name="sign-up">Sign Up</button>
    <p>Go back to <router-link :to="{ path: '/login' }">Sign In</router-link></p>
  </div>
</template>

<script>
const firebase = require('../firebaseConfig.js')

export default {
  name: 'signUp',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp() {
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
        }
      )
    }
  }
}
</script>

<style lang="css">
</style>
