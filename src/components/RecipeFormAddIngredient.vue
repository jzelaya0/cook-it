<template lang="html">
  <div class="form-row">
    <div class="form-group col-6">
      <input v-model="food" type="text" name="RecipeIngredient" class="form-control" placeholder="Ingredient">
    </div>
    <div class="form-group col-4">
      <input v-model="quantity" type="text" name="RecipeIngredientQty" class="form-control" placeholder="Quantity">
    </div>
    <div class="form-group col-2">
      <div class="btn-group">
        <button v-on:click="onAddIngredient" type="button" name="button" class="btn btn-outline-primary">
          <font-awesome-icon icon="plus" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeFormAddIngredient',
  data() {
    return {
      food: '',
      quantity: ''
    }
  },
  methods: {
    onAddIngredient() {
      this.$emit('onAddIngredient', {
        food: this.food,
        quantity: this.quantity
      })
      this.food = '';
      this.quantity = '';
    }
  }
}
</script>

<style lang="css">
</style>
