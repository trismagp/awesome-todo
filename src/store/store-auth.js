import {firebaseAuth} from 'boot/firebase'
import { LocalStorage } from 'quasar'


const state = {
  loggedIn: false  
}

const mutations = {
  setLoggedIn(state, value){
    state.loggedIn = value
  } 
}

const actions = {
  registerUser({},payload){
    firebaseAuth.createUserWithEmailAndPassword(
      payload.email, payload.password)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  },
  loginUser({},payload){
    firebaseAuth.signInWithEmailAndPassword(
      payload.email, payload.password)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  },
  logoutUser({}){
    firebaseAuth.signOut()
  },
  handleAuthStateChange({ commit }){
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        commit('setLoggedIn',true)
        LocalStorage.set('loggedIn',true)
        this.$router.push('/').catch(err => {})
      }else{
        commit('setLoggedIn',false)
        LocalStorage.set('loggedIn',false)
        this.$router.replace('/auth').catch(err => {})
      }
    })
  }
}


const getters = {

}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

