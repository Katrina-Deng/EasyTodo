/*
 * @Des: 卡片的状态管理
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-08 15:00:46
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-10 14:08:18
 */
import { card } from '../../http/api/index'

export default {
  namespaced: true,
  state: {
    cards: []
  },
  getters: {
    allCards: state => boardListId => {
      return state.cards.filter(
        card => card.boardListId === parseInt(boardListId)
      )
    },

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
    },
    // 数据重组
    updateFileCard(state, payload) {
      state.cards = state.cards.map(card => {
        if (!card.attachments) {
          card.attachments = []
        }
        if (card.id === parseFloat(payload.boardListCardId)) {
          return { ...card, attachments: [...card.attachments, payload] }
        } else {
          return card
        }
      })
    },
    removeAttachment(state, payload) {
      state.cards = state.cards.map(card => {
        if (!card.attachments) {
          card.attachments = []
        }
        if (card.id === parseFloat(payload.cardId)) {
          return {
            ...card,
            coverPath:
              card.attachments.find(
                attachment => attachment.id === parseInt(payload.attachmentId)
              ).path === card.coverPath
                ? ''
                : card.coverPath,
            attachments: card.attachments.filter(
              attachment => attachment.id !== parseFloat(payload.attachmentId)
            )
          }
        } else {
          return card
        }
      })
    },
    setCover(state, payload) {
      state.cards = state.cards.map(card => {
        if (!card.attachments) {
          card.attachments = []
        }
        if (card.id === parseFloat(payload.cardId)) {
          return {
            ...card,
            coverPath: card.attachments.find(
              attachment => attachment.id === parseInt(payload.attachmentId)
            ).path,
            attachments: card.attachments.map(attachment => {
              return {
                ...attachment,
                isCover: attachment.id === parseInt(payload.attachmentId)
              }
            })
          }
        } else {
          return card
        }
      })
    },
    delCover(state, payload) {
      state.cards = state.cards.map(card => {
        if (!card.attachments) {
          card.attachments = []
        }
        if (card.id === parseFloat(payload.cardId)) {
          return {
            ...card,
            coverPath: '',
            attachments: card.attachments.map(attachment => {
              return {
                ...attachment,
                isCover: false
              }
            })
          }
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
    },
    async uploadFile({ commit }, data) {
      // eslint-disable-next-line no-unused-vars
      const res = await card.uploadFile(data)
      // console.log('res', res.data)
      commit('updateFileCard', res.data)
      return res
    },
    async removeAttachment({ commit }, data) {
      // eslint-disable-next-line no-unused-vars
      const res = await card.removeAttachment(data)
      // console.log('res', res.data)
      commit('removeAttachment', data)
      return res
    },
    async setCover({ commit }, data) {
      // eslint-disable-next-line no-unused-vars
      const res = await card.setCover(data)
      // console.log('res', res.data)
      commit('setCover', data)
      return res
    },
    async delCover({ commit }, data) {
      // eslint-disable-next-line no-unused-vars
      const res = await card.delCover(data)
      // console.log('res', res.data)
      commit('delCover', data)
      return res
    }
  }
}
