<template>
  <div class="container">

    <div class="row">
      <div class="col-12">
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1>Hello, {{ userProfile.name }}</h1>
          </div>
        </div>
      </div>
      <div class="col-12">
        <RecipeList v-bind:recipes="userRecipes"></RecipeList>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeList from './RecipeList'
import { mapState } from 'vuex'
const firebase = require('../firebaseConfig.js')

export default {
  name: 'Dashboard',
  components: { RecipeList },
  computed: {
    ...mapState(['userProfile', 'userRecipes'])
  },
  methods: {

  }
}
</script>
