<template>
    <q-card>
     
      <modal-header @close="closePopup">Add wish</modal-header>

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
import mixinAddEditWish from 'src/mixins/mixin-add-edit-wish'

export default {
  data(){
    return{
      wishToSubmit:{
        category: '',
        title: '',
        description: '',
        url: '',
        date: '',
        time: '',
        completed: false
      },
      categories: [
        'Food', 'Hiking', 'YesWeekend', 'Restaurant', 'Concert'
      ]
    }
  },
  mixins: [mixinAddEditWish],
  methods:{
    ...mapActions('wishes', ['addWish']),
    submitWish(){
      this.addWish(this.wishToSubmit)
      this.$emit('close')
    }
  }
}
</script>