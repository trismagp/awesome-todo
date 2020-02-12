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
        },
        'ID4':{
          category: 'Weekend',
          title: 'Madrid',
          description: '',
          url: '',
          date: '2020.02.22',
          completed: false
        },
        'ID5':{
          category: 'Weekend',
          title: 'Lisbon',
          description: '',
          url: '',
          date: '',
          completed: false
        },
        'ID6':{
          category: 'Weekend',
          title: 'Roma',
          description: '',
          url: '',
          date: '',
          completed: false
        },
        'ID7':{
          category: 'Hiking',
          title: 'Rocher de naye',
          description: '',
          url: '',
          date: '',
          completed: false
        },
        'ID8':{
          category: 'Hiking',
          title: 'Saleve',
          description: '',
          url: '',
          date: '',
          completed: false
        },
        'ID9':{
          category: 'Restaurant',
          title: 'George Blanc',
          description: '3 étoiles',
          url: '',
          date: '2020.05.15',
          completed: false
        },
        'ID10':{
          category: 'Restaurant',
          title: 'Marc Vera',
          description: '3 étoiles',
          url: '',
          date: '2020.10.15',
          completed: false
        }
    }

}

const mutations = {
  updateWish(state, payload){
    console.log('payload from mutation:', payload.id);
    console.log('payload from mutation1:', state.wishes[payload.id].title);
    Object.assign(state.wishes[payload.id],payload.updates);
  }

}

const actions = {
  updateWish({commit}, payload){
    // console.log('update actions');
    console.log('payload: ', payload );
    commit('updateWish', payload)
    
  }
}

const getters = {
    wishes: (state) => {
        return state.wishes
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

