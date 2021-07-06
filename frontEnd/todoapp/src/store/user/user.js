/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-02 16:23:20
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 14:20:45
 */
import { regsiter, login } from '@/http/api/index.js'

export default {
  // 不能相互影响
  namespaced: true,
  state: {
    info: JSON.parse(localStorage.getItem('user') || '[]')
  },
  mutations: {
    upUserInfo: (state, data) => {
      state.info = data
      localStorage.setItem('user', JSON.stringify(data))
    },
    logoutUserInfo: (state, data) => {
      // 直接清空，不需要修改state.info
      localStorage.removeItem('user')
    }
  },
  actions: {
    register: ({ commit }, data) => {
      return regsiter.regsiter(data)
    },
    login: async ({ commit }, data) => {
      const res = await login.login(data)
      commit('upUserInfo', {
        id: res.data.id,
        name: res.data.name,
        authorization: res.headers.authorization
      })
      return res
    },
    logout: async ({ commit }, data) => {
      commit('logoutUserInfo')
    }
  }
}
