import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseAuth, firebaseDb } from '../boot/firebase'
import {showErrorMessage} from 'src/functions/function-show-error-message'
import { Notify } from 'quasar'

const state = {
    wishes: {
        // 'ID1':{
        //   category: 'Restaurant',
        //   title: 'Chicken Cacciatore',
        //   description: '',
        //   url: 'https://cafedelites.com/chicken-cacciatore/',
        //   date: '2020.02.15',
        //   time: '09:30',
        //   completed: false
        // },
        // 'ID2':{
        //   category: 'Food',
        //   title: 'Tarte garlic chicken breasts',
        //   description: '',
        //   url: 'https://cafedelites.com/creamy-garlic-chicken-breasts/',
        //   date: '2020.03.22',
        //   time: '15:45',
        //   completed: false
        // },
        // 'ID3':{
        //   category: 'Food',
        //   title: 'Lemon Chicken Scallopini with Lemon Garlic Cream Sauce',
        //   description: '',
        //   url: 'https://cafedelites.com/lemon-chicken-scallopini-with-lemon-garlic-cream-sauce/',
        //   date: '2020.06.27',
        //   completed: false
        // }
    },
    search: "",
    sort: "",
    wishDownloaded: false
}

const mutations = {
  updateWish(state, payload){
    Object.assign(state.wishes[payload.id],payload.updates);
  },
  deleteWish(state, id){
    Vue.delete(state.wishes, id)
  },
  addWish(state , payload){
    Vue.set(state.wishes, payload.id, payload.wish)
  },
  setSearch(state, search){
    state.search = search
  },
  clearWishes(state){
    state.wishes = {}
  },
  setSort(state, sort){
    state.sort = sort
  },
  setWishDownloaded(state, value){
    state.wishDownloaded = value
  }
}

const actions = {
  updateWish({dispatch}, payload){
    dispatch('fbUpdateWish', payload)
  },
  deleteWish({dispatch}, id){
    dispatch('fbDeleteWish', id)
  },
  addWish({dispatch}, wish){
    let wishId = uid()
    let payload = {id: wishId, wish: wish}
    dispatch('fbAddWish',payload)
  },
  clearWishes({commit}){
    commit('clearWishes')
  },
  setSearch({commit}, search){
    commit('setSearch', search)
  },
  setSort({commit}, sort){
    commit('setSort', sort)
  },
  fbReadData({commit}){
    let userId = firebaseAuth.currentUser.uid    
    let userWishes = firebaseDb.ref('wishes/'+userId)

    userWishes.once('value', snapshot =>{
      commit('setWishDownloaded',true)
    })

    userWishes.on('child_added', snapshot =>{
      let wish = snapshot.val()
      let payload = {
        id: snapshot.key,
        wish: wish
      }
      commit('addWish',payload)
    })
    
    userWishes.on('child_changed', snapshot =>{
      let wish = snapshot.val()
      let payload = {
        id: snapshot.key,
        wish: wish
      }
      commit('updateWish',payload)
    })

    userWishes.on('child_removed', snapshot =>{
      let wish = snapshot.val()
   
      let  wishid= snapshot.key
    
      commit('deleteWish',wishid)
    })
  },
  fbAddWish({},payload){
    let userId = firebaseAuth.currentUser.uid  
    let wishRef = firebaseDb.ref('wishes/'+userId +"/"+payload.id)

    wishRef.set(payload.wish, error => {
      if(error){
        showErrorMessage(error.message)
      }else{
        Notify.create('Wish created')
      }
    })
  },
  fbUpdateWish({dispatch},payload){
    let userId = firebaseAuth.currentUser.uid  
    let wishRef = firebaseDb.ref('wishes/'+userId +"/"+payload.id)

    wishRef.update(payload.updates, error => {
      if(error){
        showErrorMessage(error.message)
      }else{
        dispatch('fbReadData')
        let payloadKeys = Object.keys(payload.updates)
        if(payloadKeys.length > 1){
          Notify.create('Wish updated')
        }
      }
    })
  },
  fbDeleteWish({},wishId){
    let userId = firebaseAuth.currentUser.uid  
    let wishRef = firebaseDb.ref('wishes/'+userId +"/"+wishId)

    wishRef.remove(error => {
      if(error){
        showErrorMessage(error.message)
      }else{
        Notify.create('Wish deleted')
      }
    })
  }
}

const getters = {

  wishesSorted: (state) => {
    let wishesSorted = {},
      keySorted = {}
    
    keySorted = Object.keys(state.wishes)

    keySorted.sort((a,b)=>{
      let paramA =  state.wishes[a][state.sort],
        paramB =  state.wishes[b][state.sort]

      if (paramA > paramB) return 1
      if (paramA < paramB) return -1
      return 0
    })

    keySorted.forEach((key)=>{
      wishesSorted[key] = state.wishes[key]
    })
    return wishesSorted
  },
  wishesFiltered: (state, getters) => {
    let wishesFiltered = {}

    let wishesSorted = getters.wishesSorted

    if(state.search){
      Object.keys(wishesSorted).forEach(function(id){
        let wishtitle = wishesSorted[id].title.toLowerCase()
        console.log(wishtitle.includes('c'));
        
        if (wishesSorted[id].title.toLowerCase().includes(state.search.toLowerCase())){
          wishesFiltered[id] = wishesSorted[id]
        }
      })     
      return wishesFiltered
    }
    
    return wishesSorted
  },
  wishesAll: (state, getters) => {
    let wishesFiltered = getters.wishesFiltered

    return wishesFiltered
  },
  wishesTodo: (state, getters) => {
    let wishesFiltered = getters.wishesFiltered
    
    let wishes = {}
    
    Object.keys(wishesFiltered).forEach(function(id){
      if (!wishesFiltered[id].completed){
        wishes[id] = wishesFiltered[id]
      }
    })
    return wishes
  },
  wishesCompleted: (state, getters) => {
    let wishesFiltered = getters.wishesFiltered

    let wishes = {}
    Object.keys(wishesFiltered).forEach(function(id){
      if (wishesFiltered[id].completed){
        wishes[id] = wishesFiltered[id]
      }
    })
    return wishes
  }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

