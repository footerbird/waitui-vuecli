import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './util/rem'
import FastClick from 'fastclick'
import axios from 'axios'
import qs from 'qs'
import VueLazyload from 'vue-lazyload'
import TransferDom from 'vux/src/directives/transfer-dom'

Vue.use(VueLazyload)
Vue.directive('transfer-dom', TransferDom)

Vue.prototype.$http = axios
Vue.prototype.$qs = qs

FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
