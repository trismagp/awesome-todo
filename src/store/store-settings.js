import Vue from 'vue'
import { uid, LocalStorage } from 'quasar'

const state = {
  settings : {
    show12HourFormat: false,
    showOneWishList: false
  } 
}

const mutations = {
  setShow12HourFormat(state, show12HourFormat){
    state.settings.show12HourFormat = show12HourFormat
  },
  setShowOneWishList(state, showOneWishList){
    state.settings.showOneWishList = showOneWishList
  },
  setSettings(state,settings){
    Object.assign(state.settings,settings)
  }
}

const actions = {
  setShow12HourFormat({commit, dispatch}, show12HourFormat){
    commit('setShow12HourFormat', show12HourFormat)
    dispatch('saveSettings')
  },
  setShowOneWishList({commit, dispatch}, showOneWishList){
    commit('setShowOneWishList', showOneWishList)
    dispatch('saveSettings')
  },
  saveSettings({state}){
    LocalStorage.set('settings',state.settings)
  },
  getSettings({commit}){
    let settings = LocalStorage.getItem('settings')
    if(settings){
      commit('setSettings',settings)
    }
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

