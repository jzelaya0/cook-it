<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h2>Basic Information</h2>
          </div>
          <div class="card-body">
            <form class="form" @submit.prevent>
              <div class="form-group row">
                <label for="name" class="col-sm-3 col-md-2 col-form-label">Name</label>
                <div class="col-sm-9 col-md-10">
                  <input v-model="form.name" class="form-control" type="text" name="name" :placeholder="userProfile.name">
                </div>
              </div>

              <div class="form-group row">
                <label for="name" class="col-sm-3 col-md-2 col-form-label">Username</label>
                <div class="col-sm-9 col-md-10">
                  <input v-model="form.username" class="form-control" type="text" name="name" :placeholder="userProfile.username">
                </div>
              </div>

              <div class="form-group row">
                <label for="name" class="col-sm-3 col-md-2 col-form-label"></label>
                <div class="col-sm-9 col-md-10">
                  <button type="button" name="button" class="btn btn-primary" v-on:click="updateUserProfile">
                    <font-awesome-icon v-if="isLoading" icon="spinner" pulse />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'Settings',
  data() {
    return {
      isLoading: false,
      form: {
        name: "",
        username: ""
      }
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser'])
  },
  methods: {
    updateUserProfile() {
      this.isLoading = true;

      this.$store.dispatch('updateUserProfile', {
        name: this.form.name !== '' ? this.form.name : this.userProfile.name,
        username: this.form.username !== '' ? this.form.username : this.userProfile.username
      })

      // Reset form
      setTimeout(() => {
        this.form.name = '';
        this.form.username = '';
        this.isLoading = false;
      }, 500);
    }
  }
}
</script>

<style lang="css">
</style>
