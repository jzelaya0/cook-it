<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" name="button" v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Welcome to Your Dashboard!'
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.replace('login');
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
