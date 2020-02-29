<template>
    <div>
      <list-header
        bgColor="bg-orange-4">
        Todo
      </list-header>
      <q-list separator bordered>
        <wish
          v-for="(wish, key) in wishesTodo"
          :key=key
          :id=key
          :wish=wish
        >
        </wish>
      </q-list>
    </div>
</template>

<script>
export default {
    props : ['wishesTodo'],
    components:{
      'wish': require('components/Wishes/Wish.vue').default,
      'list-header': require('components/Wishes/Modals/Shared/ListHeader.vue').default
    }
}
</script>