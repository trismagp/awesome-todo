import Vue from 'vue'
import { uid } from 'quasar'

const state = {
    wishes: {
        'ID1':{
          category: 'Food',
          title: 'Chicken Cacciatore',
          description: '',
          url: 'https://cafedelites.com/chicken-cacciatore/',
          date: '2020.02.15',
          time: '12:30',
          completed: false
        },
        'ID2':{
          category: 'Food',
          title: 'Creamy garlic chicken breasts',
          description: '',
          url: 'https://cafedelites.com/creamy-garlic-chicken-breasts/',
          date: '2020.02.22',
          time: '12:45',
          completed: false
        },
        'ID3':{
          category: 'Food',
          title: 'Lemon Chicken Scallopini with Lemon Garlic Cream Sauce',
          description: '',
          url: 'https://cafedelites.com/lemon-chicken-scallopini-with-lemon-garlic-cream-sauce/',
          date: '2020.02.27',
          completed: false
        }
    },
    search: ""
}

const mutations = {
  updateWish(state, payload){
    Object.assign(state.wishes[payload.id],payload.updates);
  },
  deleteWish(state, id){
    Vue.delete(state.wishes, id)
    console.log('mutation delete: ', id);
  },
  addWish(state , payload){
    Vue.set(state.wishes, payload.id, payload.wish)
  },
  setSearch(state, search){
    state.search = search
  }
}

const actions = {
  updateWish({commit}, payload){
    console.log('payload: ', payload );
    commit('updateWish', payload)
  },
  deleteWish({commit}, id){
    commit('deleteWish', id)
  },
  addWish({commit}, wish){
    let wishId = uid()
    let payload = {id: wishId, wish: wish}
    commit('addWish',payload)
  },
  setSearch({commit}, search){
    commit('setSearch', search)
  }
}

const getters = {
  getWishesFiltered: (state) => {
    let wishesFiltered = {}
    if(state.search){
      Object.keys(state.wishes).forEach(function(id){
        let wishtitle = state.wishes[id].title.toLowerCase()
        console.log(wishtitle.includes('c'));
        
        if (state.wishes[id].title.toLowerCase().includes(state.search.toLowerCase())){
          wishesFiltered[id] = state.wishes[id]
        }
      })     
      return wishesFiltered
    }
    
    return state.wishes
  },
  wishesTodo: (state, getters) => {
    let wishesFiltered = getters.getWishesFiltered
    
    let wishes = {}
    
    Object.keys(wishesFiltered).forEach(function(id){
      if (!wishesFiltered[id].completed){
        wishes[id] = wishesFiltered[id]
      }
    })
    return wishes
  },
  wishesCompleted: (state, getters) => {
    let wishesFiltered = getters.getWishesFiltered

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

