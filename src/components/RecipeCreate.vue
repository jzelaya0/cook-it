<template>
<div class="card">
  <div class="card-header">
    Create a Recipe
  </div>
  <div class="card-body">
    <form class="form" @submit.prevent>
      <div class="form-group">
        <label for="RecipeName">Name</label>
        <input v-model="form.name" class="form-control" type="text" name="RecipeName" placeholder="Name">
      </div>

      <div class="form-group">
        <label for="RecipeDescription">Description</label>
        <input v-model="form.description" type="text" name="RecipeDescription" class="form-control" placeholder="Description">
      </div>

      <div class="form-group">
        <label for="RecipeInstructions">Instructions</label>
        <textarea v-model="form.instructions" class="form-control" name="RecipeInstructions" rows="5" placeholder="Enter Instructions"></textarea>
      </div>

      <div class="form-group">
        <input type="text" readonly class="form-control-plaintext" value="Add an ingredient">
      </div>

      <!-- Add ingredient -->
      <RecipeCreateIngredientInputs @addIngredient="onAddIngredient"></RecipeCreateIngredientInputs>
      <!-- Render list of removable ingredients -->
      <RecipeCreateIngredientInputs v-for="(ingredient, index) in form.ingredients" @deleteIngredient="onDeleteIngredient(index)" :key="index" v-bind:ingredient="ingredient"></RecipeCreateIngredientInputs>

      <button v-on:click="submitRecipe" type="submit" name="Submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</div>
</template>

<script>
import RecipeCreateIngredientInputs from './RecipeCreateIngredientInputs'
import { mapState } from 'vuex'

const firebase = require('../firebaseConfig.js')

export default {
  name: 'RecipeCreate',
  components: {
    RecipeCreateIngredientInputs
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        ingredients: [],
        instructions: ''
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    submitRecipe() {
      firebase.recipesCollection.add({
        userId: this.currentUser.uid,
        name: this.form.name,
        description: this.form.description,
        ingredients: this.form.ingredients,
        instructions: this.form.instructions
      }).then(res => {
        // Update recipeslist
        this.$store.dispatch('fetchUserRecipes')

        // Reset the form
        this.form = {
          name: '',
          description: '',
          ingredients: [],
          instructions: ''
        }
      }).catch(err => {
        console.log(err);
      })
    },

    onDeleteIngredient(index) {
      this.form.ingredients.splice(index, 1)
    },

    onAddIngredient(evt) {
      this.form.ingredients.push(evt)
    }
  }
}
</script>

<style lang="css">
</style>
