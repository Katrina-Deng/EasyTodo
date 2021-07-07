/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-06 16:45:12
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-07 21:09:46
 */
import $axios from '../../http'

/**
 * @name: Ellen
 * @test: 获取列表信息信息
 * @msg:
 * @query @Query() query: getBoardListBody
 * @return {*}
 */
export const getLists = id => {
  return $axios({
    url: '/list',
    params: {
      boardId: id
    }
  })
}

export const postList = data => {
  return $axios({
    url: '/list',
    method: 'post',
    data: {
      boardId: data.boardId,
      name: data.name
    }
  })
}

export const putList = data => {
  return $axios({
    url: '/list/' + data.boardListId,
    method: 'put',
    data: {
      boardId: data.boardId,
      name: data.name,
      order: data.order
    }
  })
}
