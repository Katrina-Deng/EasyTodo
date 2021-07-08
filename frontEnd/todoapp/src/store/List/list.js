/*
 * @Des:
 * @Version: list vuex
 * @Author: Ellen
 * @Date: 2021-07-06 16:50:35
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-08 21:21:13
 */
import { list } from '@/http/api/index.js'

export default {
  namespaced: true,
  state: {
    list: []
  },
  getters: {
    //   过滤多个
    getLists: state => boardId =>
      state.list.filter(item => item.boardId === parseInt(boardId)),

    getList: state => listid =>
      state.list.find(item => item.id === parseInt(listid))
  },

  mutations: {
    updateLists(state, payload) {
      state.list = [...state.list, ...payload]
    },
    updateList(state, data) {
      state.list = state.list.map(item => {
        if (item.id === data.boardListId) {
          return { ...item, ...data }
        }
        return item
      })
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
    },
    async putList({ commit }, data) {
      // eslint-disable-next-line no-unused-vars
      const res = await list.putList(data)
      commit('updateList', data)
    }
  }
}
