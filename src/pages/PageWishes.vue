<template>
  <q-page class="q-pa-md">
    <q-list separator bordered>
      <wish
        v-for="(wish, key) in wishes"
        :key=key
        :id=key
        :wish=wish
      >
      </wish>
    </q-list>
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
      <add-wish/>
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
    computed:{
      ...mapGetters('wishes', ['wishes'])
    },
    components:{
      'wish': require('components/Wishes/Wish.vue').default,
      'add-wish': require('components/Modals/AddWish.vue').default
    }
  }
</script>
