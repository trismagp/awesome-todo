<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered padding>
        <q-item-label header>Settings</q-item-label>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Display 12 hour format</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle color="blue" v-model="show12HourFormat" val="battery" />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Display only one wish list</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle color="blue" v-model="showOneWishList" val="battery" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-list bordered padding>
        <q-item-label header>More</q-item-label>
        <q-item tag="label" v-ripple to="settings/help">
          <q-item-section>
            <q-item-label>Help</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple @click="visitOurWebSite">
          <q-item-section>
            <q-item-label>Visit our webpage</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple @click="emailUs">
          <q-item-section>
            <q-item-label>Email us</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { openURL } from 'quasar'

export default {
  data(){
    return{
    }
  },
  computed:{
      ...mapState('settings', ['settings']),
      show12HourFormat:{
        get(){
            return this.settings.show12HourFormat
        },
        set(value){
            this.setShow12HourFormat(value)
        }
      },
      showOneWishList: {
        get(){
          return this.settings.showOneWishList
        },
        set(value){
            this.setShowOneWishList(value)
        }
      }
  },
  methods:{
        ...mapActions('settings', ['setShow12HourFormat','setShowOneWishList']),
        visitOurWebSite(){          
          openURL('http://google.com')
        },
        emailUs(){
          window.location.href = 'mailto:tris.magp@gmail.com?subject=Great job'
        }
  }
}
</script>
