<template lang="html">
  <div class="login">
    <h1>Sign In</h1>
    <input type="email" name="email" placeholder="E-mail">
    <input type="password" name="password" placeholder="Password">
    <button type="button" name="button" v-on:click="login">Log In</button>
    <p>Don't have an account? You can create one here</p>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: () => {
    return {}
  },
  methods: {
    login: () => {
      alert('hello')
    }
  }
}
</script>

<style lang="css">
</style>
