<template>
    <q-item 
        clickable 
        v-touch-hold:1000.mouse="showEditWishModal"
        @click="updateWish({id: id, updates: {completed: !wish.completed}})">
        <q-item-section 
            side 
            top>
            <q-checkbox 
                :value="wish.completed" 
                no-pointer-events/>
        </q-item-section>
        <q-item-section>
            <q-item-label>{{wish.category}}</q-item-label>
            <q-item-label 
                caption
                v-html="$options.filters.searchHighlight(wish.title,search)">
            </q-item-label>
            <q-item-label caption>
                <small>{{wish.url}}</small>
            </q-item-label>
        </q-item-section>
        <q-item-section side top>
            <q-item-label caption>{{ wish.date | niceDate }}</q-item-label>
            <q-item-label caption>
                <small>{{wish.time | timeFormat(settings.show12HourFormat) }}</small>
            </q-item-label>
        </q-item-section>
        <q-item-section side top>
            <div class="row">
                <q-btn
                    @click.stop="showEditWishModal"
                    clickable 
                    flat 
                    round 
                    color="primary" 
                    icon="edit" 
                    size="md" 
                    dense/>
                <q-btn
                    @click.stop="promptToDelete(wish, id)"
                    clickable 
                    flat 
                    round 
                    color="red" 
                    icon="delete" 
                    size="md" 
                    dense/>
            </div>
        </q-item-section>

        <q-dialog :value="showEditWish">
            <edit-wish :wish="wish" :id="id" @close="showEditWish = false"/>
        </q-dialog>
    </q-item>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import { date } from 'quasar'
    const { formatDate } = date

    export default {
        props: ['wish', 'id'],
        data(){
            return{
                showEditWish: false
            }
        },
        computed:{
            ...mapState('wishes', ['search']),
            ...mapState('settings', ['settings'])
        },
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
            },
            showEditWishModal(){
                this.showEditWish = true
            }
        },
        filters:{
            niceDate(value){  
                let year = value.substring(0,4)
                let month = value.substring(5,7)
                let day = value.substring(8,10)
                let valueDate = date.buildDate({year: year, month: month, date: day})

                return date.formatDate(valueDate, 'MMM D, YYYY')
            },
            searchHighlight(title, search){
                let searchRegExp = new RegExp(search, 'ig')
                
                if (search.length){
                    return title.replace(searchRegExp, (match) => {
                        return '<span class="bg-yellow-6">' + match + '</span>'
                    })
                }    
                return title
            },
            timeFormat(value, show12HourFormat){
                if(value){
                    if(show12HourFormat){
                        let hour = value.substring(0,2)
                        let minute = value.substring(3,5)
                        let valueTime =  date.buildDate({hours: hour, minutes: minute})
                        return date.formatDate(valueTime, 'H:mma');
                    }
    
                    return value
                }
                return ""
            }
        },
        components:{
            'edit-wish': require('components/Wishes/Modals/EditWish.vue').default
        }
    }
</script>

<style>
    
</style>