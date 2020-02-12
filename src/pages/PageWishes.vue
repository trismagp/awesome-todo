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
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed:{
      ...mapGetters('wishes', ['wishes'])
    },
    components:{
      'wish': require('components/Wishes/Wish.vue').default
    }
  }
</script>
