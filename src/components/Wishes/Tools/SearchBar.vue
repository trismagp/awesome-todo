<template>
    <q-input 
        class="col" 
        outlined 
        v-model="searchBar" 
        label="Search" 
        @keyup.esc="searchBar=''"
        v-select-all>

        <template v-slot:append>
            <q-icon v-if="searchBar.length" name="close" @click="searchBar = ''" class="cursor-pointer" />
            <q-icon name="search" />
        </template>
    </q-input>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { selectAll } from "src/directives/directive-select-all";


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
        directives:{
            selectAll
        }
    }
</script>