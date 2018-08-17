import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$http = axios
Vue.prototype.$qs = qs

FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
