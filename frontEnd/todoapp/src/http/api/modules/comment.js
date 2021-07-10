/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-10 16:05:03
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-10 17:07:37
 */
import $axios from '../../http'

/**
 * @name: Ellen
 * @test:
 * @msg: id boardListId
 * @query
 * @return {*}
 */
export const getComments = ({ cardId, page }) => {
  return $axios({
    url: '/comment',
    params: {
      boardListCardId: cardId,
      // eslint-disable-next-line no-unneeded-ternary
      page: page ? page : null
    }
  })
}
/**
 * @name: Ellen
 * @test:
 * @msg: id boardListId
 * @query
 * @return {*}
 */
export const postComment = ({ cardId, content }) => {
  return $axios({
    url: '/comment',
    method: 'post',
    data: {
      boardListCardId: cardId,
      content
    }
  })
}
