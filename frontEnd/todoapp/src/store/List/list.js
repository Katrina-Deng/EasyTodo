/*
 * @Des:
 * @Version: list vuex
 * @Author: Ellen
 * @Date: 2021-07-06 16:50:35
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-06 21:41:42
 */
import { list } from '@/http/api/index.js'

export default {
  namespaced: true,
  state: {
    list: []
  },
  getters: {
    //   过滤
    getLists: state => boardId =>
      state.list.filter(item => item.boardId === parseInt(boardId))
  },

  mutations: {
    updateLists(state, payload) {
      state.list = [...state.list, ...payload]
    }
  },
  actions: {
    async getLists({ commit }, data) {
      const res = await list.getLists(data)
      commit('updateLists', res.data)
    },
    async postList({ commit }, data) {
      const res = await list.postList(data)
      commit('updateLists', [res.data])
      return res
    }
  }
}
