<template lang="html">
  <div id="sign-up" class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-8">
        <!-- States and Alerts -->
        <div v-if="errorMessage !== ''"  class="error-message">
          <alert v-bind:message="errorMessage"></alert>
        </div>
        <div v-if="performingRequest" class="loading-wrapper">
          <loading-state></loading-state>
        </div>

        <header class="text-center">
          <h1>Sign Up</h1>
        </header>

        <form class="form mb-3">
          <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control" v-model="name" type="text" name="name" placeholder="Name">
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" v-model="email" type="email" name="email" placeholder="E-mail">
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" v-model="password" type="password" name="password" placeholder="Password">
          </div>

          <button class="btn btn-primary" v-on:click="signUp" type="button" name="sign-up">Sign Up</button>
        </form>

        <div class="text-center">
          <p>Go back to <router-link :to="{ path: '/login' }">Sign In</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingState from '@/components/LoadingState'
import Alert from '@/components/Alert'
import * as firebase from '@/firebaseConfig.js'

export default {
  components: {
    LoadingState,
    Alert
  },
  name: 'signUp',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      performingRequest: false,
      errorMessage: ''
    }
  },
  methods: {
    signUp() {
      this.performingRequest = true
      this.errorMessage = ''

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
