import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// @ts-ignore
import * as VueGoogleMaps from 'vue2-google-maps'

import './plugins/vuetify'

Vue.config.productionTip = false


require('dotenv').config()

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_API_KEY
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
