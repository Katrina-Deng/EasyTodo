/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 21:44:27
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-02 16:11:13
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/css.css'
import api from './http/index'
import './plugins/element.js'
import TMessage from '@/components/TMessage/TMessage.js'

Vue.config.productionTip = false
Vue.use(api)
Vue.prototype.$Msg = TMessage

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
