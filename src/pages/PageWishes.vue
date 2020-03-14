<template>
  <q-page class="q-pa-md">
    <search-bar />
    <sort :sort.sync="this.sort"/>

    <wishes-todo v-if="Object.keys(wishesTodo).length" :wishesTodo="wishesTodo"/> 
    
    <div v-if="Object.keys(wishesCompleted).length" class="q-mb-xl">
      <no-wish v-if="!Object.keys(wishesTodo).length"></no-wish>
      <wishes-completed :wishesCompleted="wishesCompleted"/>
    </div>

    <div v-if="!(Object.keys(wishesCompleted).length + Object.keys(wishesTodo).length)">
      <h3>No results</h3>
    </div>

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn 
        unelevated 
        round 
        color="primary" 
        icon="add" 
        clickable
        @click="showAddWish= !showAddWish"
      /> 
    </div>

    <q-dialog :value="showAddWish">
      <add-wish @close="showAddWish = false"/>
    </q-dialog>
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data(){
      return{
        showAddWish: false,
        sort: "Date"
      }
    },
    mounted(){
      this.$root.$on('showAddWish', () => {
        this.showAddWish = true
      })
    },
    computed:{
      ...mapGetters('wishes', ['wishesTodo','wishesCompleted', 'wishesFiltered'])
    },
    components:{
      'no-wish': require('components/Wishes/Modals/NoWish.vue').default,
      'wishes-todo': require('components/Wishes/Modals/WishesTodo.vue').default,
      'wishes-completed': require('components/Wishes/Modals/WishesCompleted.vue').default,
      'add-wish': require('components/Wishes/Modals/AddWish.vue').default,
      'search-bar': require('components/Wishes/Tools/SearchBar.vue').default,
      'sort': require('components/Wishes/Tools/Sort.vue').default
    }
  }
</script>
