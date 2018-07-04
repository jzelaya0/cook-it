<template lang="html">
  <div class="sign-up">
    <h1>Sign Up</h1>
    <input type="email" name="email" placeholder="E-mail">
    <input type="password" name="password" placeholder="Password">
    <button type="button" name="sign-up">Sign Up</button>
    <p>Go back to <router-link :to="{ path: '/login' }">Sign In</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'signUp',
  data: () => {
    return {}
  },
  methods: {}
}
</script>

<style lang="css">
</style>
