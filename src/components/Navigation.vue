<template lang="html">
  <header>
    <section>
      <div>
        <router-link :to="{ path: 'dashboard'}">
          <h1>CookIt!</h1>
        </router-link>
        <ul>
          <li><router-link :to="{ path: 'dashboard'}">Dashboard</router-link></li>
          <li><router-link :to="{ path: 'settings'}">Settings</router-link></li>
          <li><a v-on:click="logout">Logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
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
  }
}
</script>

<style lang="css">
</style>
