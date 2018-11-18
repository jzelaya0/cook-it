<template lang="html">
  <div class="row">
    <div class="col-12 col-md-6" v-for="recipe in recipes">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ recipe.name }}</h5>
          <p v-if="recipe.description" class="card-text">{{ recipe.description}}</p>          
          <router-link :to="{ name: 'Recipe', params: { id: recipe.id }}">
            <button type="button" name="edit" class="btn btn-primary" >View</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeList',
  props: ['recipes']
}
</script>

<style lang="css">
</style>
