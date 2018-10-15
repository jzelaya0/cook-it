<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: { Navigation },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style>
</style>
