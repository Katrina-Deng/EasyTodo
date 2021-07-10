/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 21:44:27
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-10 16:14:13
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user'
import board from './Board/board'
import list from './List/list'
import card from './Card/card'
import comment from './Comment/comment'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: {
      staticPath: process.env.VUE_APP_SERVER_SERVER_PATH
    }
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    board,
    list,
    card,
    comment
  }
})
