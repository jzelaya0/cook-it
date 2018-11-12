<template lang="html">
  <!-- Add an ingredient -->
  <div v-if="!ingredient" class="form-row">
    <div class="form-group col-6">
      <input v-model="food" type="text" name="RecipeIngredient" class="form-control" placeholder="Ingredient">
    </div>
    <div class="form-group col-4">
      <input v-model="quantity" type="text" name="RecipeIngredientQty" class="form-control" placeholder="Quantity">
    </div>
    <div class="form-group col-2">
      <button v-on:click="addIngredient" type="button" name="button" class="btn btn-outline-primary btn-block">
        <font-awesome-icon icon="plus" />
      </button>
    </div>
  </div>
  <!-- Delete Ingredient -->
  <div v-else-if="ingredient" class="form-row">
    <div class="form-group col-6">
      <input v-model="ingredient.food" readonly disabled type="text" name="RecipeIngredient" class="form-control" placeholder="Ingredient">
    </div>
    <div class="form-group col-4">
      <input v-model="ingredient.quantity" readonly disabled type="text" name="RecipeIngredientQty" class="form-control" placeholder="Quantity">
    </div>
    <div class="form-group col-2">
      <button v-on:click="deleteIngredient" type="button" name="button" class="btn btn-outline-danger btn-block">
        <font-awesome-icon icon="minus" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeCreateIngredientInputs',
  props: ['ingredient'],
  data() {
    return {
      food: '',
      quantity: ''
    }
  },
  methods: {
    addIngredient() {
      this.$emit('addIngredient', {
        food: this.food,
        quantity: this.quantity
      })
      this.food = '';
      this.quantity = '';
    },

    deleteIngredient() {
      this.$emit('deleteIngredient')
    }
  }
}
</script>

<style lang="css">
</style>
