<template lang="html">
  <div class="form-row">
    <div class="form-group col-6">
      <input v-model="ingredient.food" type="text" name="RecipeIngredient" class="form-control" placeholder="Ingredient">
    </div>
    <div class="form-group col-4">
      <input v-model="ingredient.quantity" type="text" name="RecipeIngredientQty" class="form-control" placeholder="Quantity">
    </div>
    <div class="form-group col-2">
      <button v-on:click="onDeleteIngredient" type="button" name="button" class="btn btn-outline-danger">
        <font-awesome-icon icon="minus" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeFormDeleteIngredient',
  props: ['ingredient', 'index'],
  methods: {
    onDeleteIngredient() {
      this.$emit('onDeleteIngredient')
    }
  }
}
</script>

<style lang="css">
</style>
