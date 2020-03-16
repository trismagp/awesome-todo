import Vue from 'vue'
import { uid } from 'quasar'

const state = {
    wishes: {
        'ID1':{
          category: 'Restaurant',
          title: 'Chicken Cacciatore',
          description: '',
          url: 'https://cafedelites.com/chicken-cacciatore/',
          date: '2020.02.15',
          time: '09:30',
          completed: false
        },
        'ID2':{
          category: 'Food',
          title: 'Tarte garlic chicken breasts',
          description: '',
          url: 'https://cafedelites.com/creamy-garlic-chicken-breasts/',
          date: '2020.03.22',
          time: '15:45',
          completed: false
        },
        'ID3':{
          category: 'Food',
          title: 'Lemon Chicken Scallopini with Lemon Garlic Cream Sauce',
          description: '',
          url: 'https://cafedelites.com/lemon-chicken-scallopini-with-lemon-garlic-cream-sauce/',
          date: '2020.06.27',
          completed: false
        }
    },
    search: "",
    sort: ""
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
  setSort(state, sort){
    state.sort = sort
  }
}

const actions = {
  updateWish({commit}, payload){
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
  },
  setSort({commit}, sort){
    commit('setSort', sort)
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

