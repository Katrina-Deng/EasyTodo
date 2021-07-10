/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-10 16:03:28
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-10 17:01:40
 */
import { comment } from '../../http/api/index'
export default {
  namespaced: true,
  state: {},
  getters: {
    // value: state => {
    //   return state.value
    // }
  },
  mutations: {
    // updateValue(state, payload) {
    //   state.value = payload
    // }
  },
  actions: {
    async getComments({ commit }, payload) {
      return await comment.getComments(payload)
    },
    async postComment({ commit }, payload) {
      return await comment.postComment(payload)
    }
  }
}
