<template lang="html">
  <div class="form-row">
    <div class="form-group col-12 col-md-6">
      <input v-model="ingredient.food" type="text" name="RecipeIngredient" class="form-control" placeholder="Ingredient">
    </div>
    <div class="form-group col-5 col-md-3">
      <input v-model="ingredient.quantity" type="text" name="RecipeIngredientQty" class="form-control" placeholder="Quantity">
    </div>
    <div class="form-group col-5 col-md-2">
      <select class="form-control" v-model="ingredient.measurement" name="measurement">
        <optgroup v-for="(group, name) in measurementOptions" :label="name">
          <option v-for="option in group" :value="option.value">
            {{ option.text }}
          </option>
        </optgroup>
      </select>
    </div>
    <div class="form-group col-2 col-md-1">
      <button v-on:click="onDeleteIngredient" type="button" name="button" class="btn btn-outline-danger btn-block">
        <font-awesome-icon icon="minus" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeFormUpdateIngredient',
  props: ['ingredient', 'index'],
  data() {
    return {
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
    onDeleteIngredient() {
      this.$emit('onDeleteIngredient')
    }
  }
}
</script>

<style lang="css">
</style>
