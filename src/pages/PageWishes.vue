<template>
  <q-page>
    <template v-if="wishDownloaded">
      <div class="q-pa-md absolute full-width full-height column">
        <div class="row">
          <search-bar />
          <sort :sort.sync="this.sort"/>
        </div>

        <q-scroll-area class="q-scroll-area-wishes">
          <div v-if="settings.showOneWishList">
            <wishes-todo v-if="Object.keys(wishesAll).length" :wishesTodo="wishesAll"/>           
          </div>
          <div v-else>    
            <wishes-todo v-if="Object.keys(wishesTodo).length" :wishesTodo="wishesTodo"/> 
            <div v-if="Object.keys(wishesCompleted).length" class="q-mb-xl">
              <no-wish v-if="!Object.keys(wishesTodo).length"></no-wish>
              <wishes-completed :wishesCompleted="wishesCompleted"/>
            </div>
          </div>
          <div v-if="!(Object.keys(wishesAll).length)">
            <h3>No results</h3>
          </div>
        </q-scroll-area>
      </div>
      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn 
          class="all-pointer-events"
          unelevated 
          round 
          color="primary" 
          icon="add" 
          clickable
          @click="showAddWish= !showAddWish"/> 
          <q-dialog :value="showAddWish">
            <add-wish @close="showAddWish = false"/>
          </q-dialog>
      </div>
    </template>
    <template v-else>
      <span class="absolute-center">
          <q-spinner-hourglass
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerHourglass</q-tooltip>
      </span>
    </template>
  </q-page>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

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
      ...mapGetters('wishes', ['wishesAll','wishesTodo','wishesCompleted', 'wishesFiltered']),
      ...mapState('settings', ['settings']),
      ...mapState('wishes', ['wishDownloaded'])
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

<style scoped>
  .q-scroll-area-wishes{
    display: flex;
    flex-grow: 1;
  }
</style>