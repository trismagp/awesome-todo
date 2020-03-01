<template>
    <q-input outlined bottom-slots v-model="searchBar" label="Search" >

        <template v-slot:append>
            <q-icon v-if="searchBar.length" name="close" @click="searchBar = ''" class="cursor-pointer" />
            <q-icon name="search" />
        </template>
    </q-input>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        data(){
            return {
                text: ""
            }
        },
        computed:{
            ...mapState('wishes', ['search']),
            searchBar:{
                get(){
                    return this.search
                },
                set(value){
                    this.setSearch(value)
                }
            }
        },
        methods:{
            ...mapActions('wishes', ['setSearch']),
        },
    }
</script>