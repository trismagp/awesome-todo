<template>
    <q-item 
        clickable 
        @click="updateWish({id: id, updates: {completed: !wish.completed}})"
        >
        <q-item-section 
            side 
            top
        >
            <q-checkbox 
            :value="wish.completed" 
            no-pointer-events
            />
        </q-item-section>
        <q-item-section>
            <q-item-label>{{wish.category}}</q-item-label>
            <q-item-label caption>
                {{wish.title}}
            </q-item-label>
            <q-item-label caption>
                <small>{{wish.url}}</small>
            </q-item-label>
        </q-item-section>
        <q-item-section side top>
            <q-item-label caption>{{wish.date}}</q-item-label>
            <q-item-label caption>
                <small>{{wish.time}}</small>
            </q-item-label>
        </q-item-section>
        <q-item-section side top>
             <q-btn
                @click.stop="promptToDelete(wish, id)"
                clickable 
                flat 
                round 
                color="red" 
                icon="delete" 
                size="md" 
                dense/>
        </q-item-section>
    </q-item>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        props: ['wish', 'id'],
        methods:{
            ...mapActions('wishes', ['updateWish','deleteWish']),
            promptToDelete(wish,id){
                this.$q.dialog({
                    title: 'Confirm',
                    message: 'Really delete?',
                    cancel: true,
                    persistent: true
                }).onOk(() => {
                    this.deleteWish(id)
                })
            }
        }
    }
</script>

<style>
    
</style>