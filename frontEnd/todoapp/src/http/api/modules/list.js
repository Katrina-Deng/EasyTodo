/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-06 16:45:12
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-06 21:36:04
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
