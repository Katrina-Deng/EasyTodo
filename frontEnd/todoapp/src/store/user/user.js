/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-02 16:23:20
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-02 19:37:45
 */
import { regsiter, login } from '@/http/api/index.js'

export default {
  // 不能相互影响
  namespaced: true,
  state: {
    info: null
  },
  mutations: {
    upUserInfo: (state, data) => {
      state.info = data
      localStorage.setItem('user', JSON.stringify(data))
    }
  },
  actions: {
    register: (state, data) => {
      return regsiter.regsiter(data)
    },
    login: async ({ commit }, data) => {
      const res = await login.login(data)
      console.log('res', res)
      commit('upUserInfo', {
        id: res.data.id,
        name: res.data.name,
        authorization: res.headers.authorization
      })
      return res
    }
  }
}
