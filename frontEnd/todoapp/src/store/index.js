/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 21:44:27
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-05 18:01:21
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user'
import board from './Board/board'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    board
  }
})
