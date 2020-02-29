<template>
    <q-banner dense class="bg-grey-3">
        <template v-slot:avatar>
            <q-icon name="check" color="primary" />
        </template>
        No wishes to do today
        <template v-slot:action>
            <q-btn
                @click="$root.$emit('showAddWish')"
                clickable
                flat 
                color="primary" 
                label="Add wish" />
        </template>
    </q-banner>
</template>