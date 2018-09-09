<template lang="html">
  <div class="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: [
    'message'
  ]
}
</script>

<style lang="css">
</style>
