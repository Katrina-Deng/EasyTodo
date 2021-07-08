/*
 * @Des: 卡片的状态管理
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-08 15:00:46
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-08 21:24:29
 */
import { card } from '../../http/api/index'

export default {
  namespaced: true,
  state: {
    cards: []
  },
  getters: {
    allCards: state => boardListId =>
      state.cards.filter(card => card.boardListId === parseInt(boardListId)),
    getCard: state => cardid =>
      state.cards.find(item => item.id === parseInt(cardid))
  },
  mutations: {
    //   获取全部卡片
    updateCards(state, payload) {
      state.cards = [...state.cards, ...payload]
    },
    // 新增卡片
    updateCard(state, payload) {
      state.cards = [...state.cards, payload]
    },
    // 更新一张卡片
    putCard(state, payload) {
      state.cards = state.cards.map(card => {
        if (card.id === payload.id) {
          return { ...card, ...payload }
        } else {
          return card
        }
      })
    }
  },
  actions: {
    async getCards({ commit }, boardListId) {
      const res = await card.getCards(boardListId)
      //   console.log('res', res.data)
      commit('updateCards', res.data)
    },
    async postCard({ commit }, data) {
      const res = await card.postCard(data)
      commit('updateCard', res.data)
      return res
    },

    async putCard({ commit }, data) {
      // eslint-disable-next-line no-unused-vars
      const res = await card.putCard(data)
      commit('putCard', data)
      return res
    }
  }
}
