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
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h2>Account Settings</h2>
          </div>
          <div class="card-body">

            <b-alert :show="alert.show" :variant="alert.variant" dismissible @dismissed="alert.show=false">
              {{ alert.message }}
            </b-alert>

            <form class="form" @submit.prevent>
              <div class="form-group row">
                <label for="email" class="cols-sm-3 col-md-2 col-form-label">Email</label>
                <div class="col-sm-9 col-md-10">
                  <input v-model="credentials.newEmail" class="form-control" type="email" name="email" :placeholder="currentUser.email">
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="cols-sm-3 col-md-2 col-form-label">Password</label>
                <div class="col-sm-9 col-md-10">
                  <input v-model="credentials.newPassword" class="form-control" type="password" name="password" placeholder="Password">
                </div>
              </div>

              <div class="form-group row">
                <label for="current-password" class="cols-sm-3 col-md-2 col-form-label">Current Password</label>
                <div class="col-sm-9 col-md-10">
                  <input v-model="credentials.currentPassword" class="form-control" type="password" name="current-password" placeholder="Enter Current Password">
                </div>
              </div>

              <div class="form-group row">
                <label for="name" class="col-sm-3 col-md-2 col-form-label"></label>
                <div class="col-sm-9 col-md-10">
                  <button type="button" name="button" class="btn btn-primary" v-on:click="updateUserCredentials">
                    <font-awesome-icon v-if="isLoading" icon="spinner" pulse />
                    Update
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

import { mapState } from 'vuex'
import firebaseApp from 'firebase'


export default {
  name: 'Settings',
  data() {
    return {
      isLoading: false,
      form: {
        name: "",
        username: ""
      },
      credentials: {
        newEmail: '',
        newPassword: '',
        currentPassword: '',
        showError: false,
        errorMessage: ''
      },
      alert: {
        show: false,
        message: '',
        variant: 'info'
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
    },

    updateUserCredentials() {
      let user = this.currentUser;
      let newPassword = this.credentials.newPassword;
      let newEmail = this.credentials.newEmail;
      let currentPassword = this.credentials.currentPassword;

      if (currentPassword !== '') {
        // Update user password
        if (newPassword !== '') {
          this.reauthenticateUser(user, currentPassword, this.updateUserPassword)
        }

        // Update user email
        if (newEmail !== '') {
          this.reauthenticateUser(user, currentPassword, this.updateUserEmail)
        }

        // Clear password field
        this.credentials.currentPassword = ''
      }
    },

    updateUserEmail() {
      this.currentUser.updateEmail(this.credentials.newEmail).then(() => {
        console.log('Updated email successfully');

        this.handleAlert(true, 'success', 'Updated email successfully')
      })
      .catch((err) => {
        console.log('Error updating email:', err.message);
      })
    },

    updateUserPassword() {
      this.currentUser.updatePassword(this.credentials.newPassword).then(() => {
        console.log('Updated password successfully')
        this.handleAlert(true, 'success', 'Updated password successfully')
      })
      .catch((err) => {
        console.log('Error updating password:', err.message)
      })
    },

    reauthenticateUser(user, currentPassword, callback) {
      let credential = firebaseApp.auth.EmailAuthProvider.credential(user.email, currentPassword)

      user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
        // User re-authenticated.
        console.log('User re-authenticated.');
        callback()
      }).catch((err) => {
        // An error happened.
        console.log('Error re-authenticating user:', err.message)
        this.handleAlert(true, 'danger', err.message)
      });
    },

    handleAlert(show, variant, message) {
      this.alert.show = show
      this.alert.message = message
      this.alert.variant = variant
    }
  }
}
</script>

<style lang="css">
</style>
