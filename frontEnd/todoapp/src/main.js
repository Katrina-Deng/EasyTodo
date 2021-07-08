/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 21:44:27
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-08 22:20:05
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/css.css'
import api from './http/index'
import './plugins/element.js'
import TMessage from '@/components/TMessage/TMessage.js'
import * as filters from './utils/filter'

Vue.config.productionTip = false
Vue.use(api)
Vue.prototype.$Msg = TMessage
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
