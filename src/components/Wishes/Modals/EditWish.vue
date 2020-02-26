<template>
    <q-card>
     
      <modal-header @close="closePopup">Edit wish</modal-header>

        <q-form @submit.prevent="submitForm">
          <q-card-section>
            <modal-wish-category 
              :category.sync="wishToSubmit.category"
              :categories="this.categories">
            </modal-wish-category>
            <modal-wish-title
              :title.sync="wishToSubmit.title"
              ref="wishToSubmit">
            </modal-wish-title>
            
            <div class="row q-mb-sm">
              <div class="col">
                <q-input clearable outlined v-model="wishToSubmit.description" label="Description" type="textarea"/>
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col">
                <q-input clearable outlined v-model="wishToSubmit.url" label="Url" />
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col">
                <q-input clearable outlined v-model="wishToSubmit.date" label="Date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="wishToSubmit.date" @input="() => $refs.qDateProxy.hide()" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row q-mb-sm" v-if="wishToSubmit.date">
              <div class="col">
                <q-input clearable outlined v-model="wishToSubmit.time" label="Time">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="wishToSubmit.time" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn 
              flat 
              label="Save" 
              color="primary" 
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['wish','id'],
  data(){
    return{
      wishToSubmit:{},
      categories: [
        'Food', 'Hiking', 'YesWeekend', 'Restaurant', 'Concert'
      ]
    }
  },
  methods:{
    ...mapActions('wishes', ['addWish']),
    submitForm(){      
      this.$refs.wishToSubmit.$refs.title.validate()
      if(!this.$refs.wishToSubmit.$refs.title.hasError){
        this.submitWish()
      }
    },
    submitWish(){
      console.log('submit wish');
      this.addWish(this.wishToSubmit)
      this.$emit('close')
    },
    closePopup(){
      this.$emit('close')
    }
  },
  components:{
    'modal-header': require('components/Wishes/Modals/Shared/ModalHeader.vue').default,
    'modal-wish-category': require('components/Wishes/Modals/Shared/ModalWishCategory.vue').default,
    'modal-wish-title': require('components/Wishes/Modals/Shared/ModalWishTitle.vue').default
  },
  mounted(){    
    this.wishToSubmit = Object.assign({}, this.wish)
  }
}
</script>