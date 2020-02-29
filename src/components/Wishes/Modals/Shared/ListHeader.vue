<template>
    <q-banner 
        inline-actions
        :class="bgColor" 
        class="text-white">
        <slot></slot>
    </q-banner>
</template>

<script>
export default {
    props:['bgColor']
    
}
</script>