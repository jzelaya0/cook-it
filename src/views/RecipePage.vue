<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h1>{{ recipe.name }}</h1>
          </div>
          <div class="card-body">
            <h5 class="card-title">Description:</h5>
            <div class="card-text">
              {{ recipe.description }}
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-text">Ingredients:</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li v-for="ingredient in recipe.ingredients" class="list-group-item">
              {{ ingredient.food }}
            </li>
          </ul>
          <div class="card-body">
            <h5 class="card-title">Instructions:</h5>
            <div class="card-text">
              {{ recipe.instructions }}
            </div>
          </div>

          <div class="card-footer text-right">
            <router-link :to="{ path: '/dashboard' }">Back to Dashboard</router-link>
            <button type="button" name="button" class="btn btn-danger" v-on:click="deleteRecipe">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from '@/firebaseConfig.js'

export default {
  name: "Recipe",
  data() {
    return {
      recipe: {}
    }
  },
  mounted() {
    const recipeId = this.$route.params.id;

    firebase.recipesCollection.doc(recipeId).get().then(res => {
      this.recipe = res.data();
      this.recipe.id = recipeId;
    }).catch(err => {
      console.log(err);
    })
  },

  methods: {
    deleteRecipe() {
      firebase.recipesCollection.doc(this.recipe.id).delete().then(() => {
        this.$store.dispatch('fetchUserRecipes')
        this.$router.push('/dashboard')
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>
