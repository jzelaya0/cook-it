<template lang="html">
  <div class="form-row">
    <div class="form-group col-12 col-md-6">
      <input v-model="food" type="text" name="RecipeIngredient" class="form-control" placeholder="Ingredient">
    </div>
    <div class="form-group col-5 col-md-3">
      <input v-model="quantity" type="text" name="RecipeIngredientQty" class="form-control" placeholder="Quantity">
    </div>
    <div class="form-group col-5 col-md-2">
      <select class="form-control" v-model="measurement" name="measurement">
        <optgroup v-for="(group, name) in measurementOptions" :label="name">
          <option v-for="option in group" :value="option.value">
            {{ option.text }}
          </option>
        </optgroup>
      </select>
    </div>
    <div class="form-group col-2 col-md-1">
      <button v-on:click="onAddIngredient" type="button" name="button" class="btn btn-outline-primary btn-block">
        <font-awesome-icon icon="plus" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeFormAddIngredient',
  data() {
    return {
      food: '',
      quantity: '',
      measurement: 'tsp',
      measurementOptions: {
        volume: [
          { text: 'tsp', value: 'tsp' },
          { text: 'tbsp', value: 'tbsp' },
          { text: 'fl oz', value: 'fl oz' },
          { text: 'cup', value: 'cup' },
          { text: 'pint', value: 'pint' },
          { text: 'qt', value: 'qt' },
          { text: 'gal', value: 'gal' }
        ],
        weight: [
          { text: 'lb', value: 'lb' },
          { text: 'oz', value: 'oz' }
        ]
      }
    }
  },
  methods: {
    onAddIngredient() {
      this.$emit('onAddIngredient', {
        food: this.food,
        quantity: this.quantity,
        measurement: this.measurement
      })
      this.food = '';
      this.quantity = '';
      this.measurement = this.measurementOptions['volume'][0].value;
    }
  }
}
</script>

<style lang="css">
</style>
