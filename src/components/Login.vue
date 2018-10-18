<template lang="html">
  <div id="login" class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-8">
        <!-- States and Alerts -->
        <div v-if="errorMessage !== ''"  class="error-message">
          <alert v-bind:message="errorMessage"></alert>
        </div>
        <div v-if="performingRequest" class="loading-wrapper text-center">
          <loading-state></loading-state>
        </div>

        <header class="text-center">
          <h1>Sign In</h1>
        </header>

        <form class="form mb-3">
          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" v-model="email" type="email" name="email" placeholder="E-mail">
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" v-model="password" type="password" name="password" placeholder="Password">
          </div>
          <button class="btn btn-primary" type="button" name="button" v-on:click="login">Log In</button>
        </form>

        <div class="mb-3 text-center">
          <p>Don't have an account? You can create one <router-link :to="{ path: 'sign-up'}">here</router-link>.</p>
          <button class="btn btn-secondary" v-on:click="togglePasswordResetForm" type="button" name="button">Forgot your password?</button>
        </div>

        <form class="form" v-if="showPasswordResetForm" @submit.prevent>
          <h2 class="text-center">Reset Your Password</h2>
          <div v-if="!passwordResetSuccess">
            <div class="form-group">
              <label for="email-reset">Email</label>
              <input class="form-control" v-model.trim="passwordFormEmail" type="email" name="email-reset" placeholder="E-mail Address">
            </div>
            <button class="btn btn-primary" v-on:click="submitPasswordResetForm" type="button" name="reset-password">Reset</button>
          </div>
          <div v-else>
            <alert message="Success! Check your email for a password reset link."></alert>
            <button v-on:click="togglePasswordResetForm" type="button" name="button">Okay!</button>
          </div>
        </form>
      </div>
    </div>
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
      errorMessage: '',
      showPasswordResetForm: false,
      passwordResetSuccess: false,
      passwordFormEmail: ''
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
    },
    togglePasswordResetForm() {
      if (this.showPasswordResetForm) {
        this.showPasswordResetForm = false
        this.passwordResetSuccess = false
      } else {
        this.showPasswordResetForm = true
      }
    },
    submitPasswordResetForm() {
      this.performingRequest = true

      firebase.auth.sendPasswordResetEmail(this.passwordFormEmail).then(
        () => {
          this.performingRequest = false
          this.passwordResetSuccess = true
          this.passwordFormEmail = ''
        },

        (err) => {
          console.log(err);
          this.performingRequest = false
          this.errorMessage = err.message
          this.passwordFormEmail = ''
        }
      )
    }
  }
}
</script>

<style lang="css">
</style>
