<template>
   <q-card-section class="row">
        <div class="text-h6"><slot></slot></div>
        <q-space />
        <q-btn 
        @click="$emit('close')"
        flat 
        round 
        dense 
        icon="close" />
    </q-card-section>
</template>

<script>
export default {
    
}
</script>