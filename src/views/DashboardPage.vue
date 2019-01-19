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
        <RecipeForm></RecipeForm>
      </div>

      <div class="col-sm-12 col-md-6">
        <RecipeList v-bind:recipes="userRecipes"></RecipeList>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeList from '@/components/RecipeList'
import RecipeForm from '@/components/RecipeForm'
import { mapState } from 'vuex'
import * as firebase from '@/firebaseConfig.js'

export default {
  name: 'Dashboard',
  components: { RecipeList, RecipeForm },
  computed: {
    ...mapState(['userProfile', 'userRecipes'])
  },
  methods: {

  }
}
</script>
