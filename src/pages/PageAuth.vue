<template>
  <div class="auth-form">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <login-register :tab="tab"/>
          </q-tab-panel>

          <q-tab-panel name="register">
            <login-register :tab="tab"/>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

    </div>
  </div>
</template>

<script>
 export default {
  data () {
    return {
      tab: 'login'
    }
  },
  components:{
      'login-register': require('components/Auth/LoginRegister.vue').default
    }
}
</script>

<style scoped>
  .auth-form{
    margin: 0 auto;
    margin-top: 50px;
    max-width: 500px;
  }
</style>
