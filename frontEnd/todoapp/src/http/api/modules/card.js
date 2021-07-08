/*
 * @Des: 卡片api
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-08 15:04:19
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-08 21:21:46
 */
import $axios from '../../http'

/**
 * @name: Ellen
 * @test: 获取列表信息信息
 * @msg: id boardListId
 * @query
 * @return {*}
 */
export const getCards = id => {
  return $axios({
    url: '/card',
    // params - query
    params: {
      boardListId: id
    }
  })
}

export const postCard = data => {
  return $axios({
    url: '/card',
    method: 'post',
    data
  })
}

export const putCard = data => {
  return $axios({
    url: '/card/' + data.id,
    method: 'put',
    data
  })
}
