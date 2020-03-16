<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
         <q-btn class="absolute-right" to="/auth" flat icon-right="account_circle" label="Login"/>
        <q-toolbar-title class="absolute-center">
          Awesome todo
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab 
          v-for="(nav, index) in navs" 
          :key=index 
          :to="nav.to" 
          :name="nav.label" 
          :icon="nav.icon" />
      </q-tabs>
    </q-footer>

    <q-drawer
      show-if-above
      :breakpoint="767"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item
          v-for="(nav, index) in navs"
          :key=index
          :to="nav.to"
          exact 
          clickable 
          >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>       
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: "Todo",
          icon: "list",
          to: "/"
        },
        {
          label: "Settings",
          icon: "settings",
          to: "/settings"
        }

      ]
    }
  }
}
</script>

<style>
  @media screen and (min-width: 768px){
    .q-footer{
      display: none;
    }
  }
</style>
