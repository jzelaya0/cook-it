import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const firebase = require('./firebaseConfig.js')

// handle state on page reload
firebase.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')
    store.dispatch('fetchUserRecipes')

    firebase.usersCollection.doc(user.uid).onSnapshot(doc => {
      store.commit('setUserProfile', doc.data())
    })
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    userRecipes: [],
  },
  actions: {
    fetchUserProfile({commit, state}) {
      firebase.usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    },

    fetchUserRecipes({commit, state}) {
      let recipes = [];

      firebase.recipesCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
        // Grab recipe by id and return it's data
        docs.forEach(doc => {
          let recipe = (doc.id, " => ", doc.data());
          recipe.id = doc.id
          recipes.push(recipe)
        })

        commit('setUserRecipes', recipes)
      })
      .catch(err => {
        console.log(err)
      })
    },

    updateUserProfile({commit, state}, data) {
      let name = data.name
      let username = data.username

      firebase.usersCollection.doc(state.currentUser.uid).update({ name, username }).then(user => {
        console.log('User updated');        
      })
      .catch(err => {
        console.log(err);
      })
    },

    clearData({commit}) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
      commit('setUserRecipes', [])
    }
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setUserRecipes(state, val) {
      state.userRecipes = val
    }
  }
})
