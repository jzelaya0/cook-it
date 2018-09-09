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
    <button v-on:click="togglePasswordResetForm" type="button" name="button">Forgot your password?</button>
    <form v-if="showPasswordResetForm" @submit.prevent class="password-reset">
      <div v-if="!passwordResetSuccess">
        <h2>Reset Your Password</h2>
        <label for="email-reset">Email</label>
        <input v-model.trim="passwordFormEmail" type="email" name="email-reset" placeholder="E-mail Address">
        <button v-on:click="submitPasswordResetForm" type="button" name="reset-password">Reset</button>
      </div>
      <div v-else>
        <alert message="Success! Check your email for a password reset link."></alert>
        <button v-on:click="togglePasswordResetForm" type="button" name="button">Okay!</button>
      </div>
    </form>
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
