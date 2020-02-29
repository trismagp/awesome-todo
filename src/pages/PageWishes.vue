<template>
  <q-page class="q-pa-md">
    
    <wishes-todo v-if="Object.keys(wishesTodo).length" :wishesTodo="wishesTodo"/> 
    <no-wish v-else></no-wish>
    <wishes-completed v-if="Object.keys(wishesCompleted).length" :wishesCompleted="wishesCompleted"/>
    
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
        showAddWish: false
      }
    },
    mounted(){
      this.$root.$on('showAddWish', () => {
        this.showAddWish = true
      })
    },
    computed:{
      ...mapGetters('wishes', ['wishesTodo','wishesCompleted'])
    },
    components:{
      'no-wish': require('components/Wishes/Modals/NoWish.vue').default,
      'wishes-todo': require('components/Wishes/Modals/WishesTodo.vue').default,
      'wishes-completed': require('components/Wishes/Modals/WishesCompleted.vue').default,
      'add-wish': require('components/Wishes/Modals/AddWish.vue').default
    }
  }
</script>
