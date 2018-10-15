<template lang="html">
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand :to="{ path: 'dashboard'}">
      <h1>CookIt!</h1>
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <!-- Display for users not logged in -->
      <b-navbar-nav right v-if="!currentUser">
        <b-nav-item :to="{ path: 'login' }">Sign In</b-nav-item>
        <b-nav-item :to="{ path: 'sign-up'}">Create Account</b-nav-item>
      </b-navbar-nav>
      <!-- Display for logged in users -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right v-if="currentUser">
          <template slot="button-content">
            <em>Account</em>
          </template>
          <b-dropdown-item :to="{ path: 'dashboard'}">Dashboard</b-dropdown-item>
          <b-dropdown-item :to="{ path: 'settings'}">Settings</b-dropdown-item>
          <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

const firebase = require('../firebaseConfig.js')

export default {
  methods: {
    logout() {
      firebase.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push('/login')
      }).catch(err => {
        console.log(err);
      });
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style lang="css">
</style>
