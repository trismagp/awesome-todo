<template>
    <q-card>
        <q-card-section class="row">
          <div class="text-h6">Add wish</div>
          <q-space />
           <q-btn 
            @click="closePopup"
            flat 
            round 
            dense 
            icon="close" />
        </q-card-section>

        <q-form @submit.prevent="submitForm">
          <q-card-section>
            <div class="row q-mb-sm">
              <div class="col">
                <q-select 
                  outlined 
                  v-model="newWish.category" 
                  :options="options" 
                  :rules="[val => !!val || 'Field is required']"
                  label="Outlined" />
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col">
                <q-input 
                  outlined 
                  v-model="newWish.title" 
                  ref="name"
                  label="Title" 
                  :rules="[val => !!val || 'Field is required']" />
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col">
                <q-input outlined v-model="newWish.description" label="Description" type="textarea"/>
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col">
                <q-input outlined v-model="newWish.url" label="Url" />
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col">
                <q-input outlined v-model="newWish.date" label="Date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="newWish.date" @input="() => $refs.qDateProxy.hide()" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col">
                <q-input outlined v-model="newWish.time" label="Time">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="newWish.time" />
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
  data(){
    return{
      newWish:{
        category: '',
        title: '',
        description: '',
        url: '',
        date: '',
        time: '',
        completed: false
      },
      options: [
        'Food', 'Hiking', 'YesWeekend', 'Restaurant', 'Concert'
      ]
    }
  },
  methods:{
    ...mapActions('wishes', ['addWish']),
    submitForm(){
      console.log('submitform');
      this.$refs.name.validate()
      if(!this.$refs.name.hasError){
        this.submitWish()
      }
    },
    submitWish(){
      console.log('submit wish');
      this.addWish(this.newWish)
      this.$emit('close')
    },
    closePopup(){
      this.$emit('close')
    }
  } 
}
</script>