import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  settings : {
    show12HourFormat: false,
    showOneWishList: true
  } 
}

const mutations = {
  setShow12HourFormat(state, show12HourFormat){
    state.settings.show12HourFormat = show12HourFormat
  },
  setShowOneWishList(state, showOneWishList){
    state.settings.showOneWishList = showOneWishList
  }
}

const actions = {
  setShow12HourFormat({commit}, show12HourFormat){
    commit('setShow12HourFormat', show12HourFormat)
  },
  setShowOneWishList({commit}, showOneWishList){
    commit('setShowOneWishList', showOneWishList)
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

