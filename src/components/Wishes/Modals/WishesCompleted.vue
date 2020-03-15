<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut">
    <div class="q-mt-lg">
      <list-header
        bgColor="bg-blue-4">
        Completed
      </list-header>
      <q-list separator bordered>
        <wish
          v-for="(wish, key) in wishesCompleted"
          :key=key
          :id=key
          :wish=wish>
        </wish>
      </q-list>
    </div>
  </transition>
</template>

<script>
export default {
    props : ['wishesCompleted'],
    components:{
      'wish': require('components/Wishes/Wish.vue').default,
      'list-header': require('components/Wishes/Modals/Shared/ListHeader.vue').default
    }
}
</script>