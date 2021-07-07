/*
 * @Des: board 管理
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-04 12:03:54
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-06 17:56:40
 */
import { board } from '@/http/api/index.js'
export default {
  // 不能相互影响
  namespaced: true,
  state: {
    inited: false,
    boardList: null
  },
  getters: {
    // 获取id
    getBoardName: ({ boardList }) => id =>
      Array.isArray(boardList)
        ? boardList.find(board => board.id === parseInt(id))
        : null
  },
  mutations: {
    updateBoard: (state, data) => {
      state.boardList = data
    },
    addBoard: (state, data) => {
      // 没有面板时候
      if (state.boardList === null) {
        state.boardList = []
      }
      state.boardList = [...state.boardList, data]
    }
  },
  actions: {
    // 获取全部面板
    getBorads: async ({ commit }) => {
      const rs = await board.getBoards()
      //   console.log('rs', rs)
      commit('updateBoard', rs.data.data)
    },
    // 获取指定面板
    getBorad: async ({ commit }, id) => {
      const rs = await board.getBoard(id)
      commit('addBoard', rs.data)
      return rs
    },
    // 提交指定面板
    postBoard: async ({ commit }, data) => {
      const rs = await board.postBoards(data)
      // console.log('rs', rs.status)
      commit('addBoard', rs.data)
      return rs.status
    }
  }
}
