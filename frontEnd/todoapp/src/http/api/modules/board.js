/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-04 12:04:22
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-05 18:44:53
 */
import $axios from '../../http'

/**
 * @name: Ellen
 * @test: 获取全部面板信息
 * @msg:
 * @param {*}
 * @return {*}
 */
export const getBoards = () => {
  return $axios({
    url: '/board',
    method: 'get'
  })
}

/**
 * 获取指定面板信息
 * @param {*} data
 * @returns
 */
export const getBoard = id => {
  return $axios({
    url: '/board/' + id,
    method: 'get'
  })
}

/**
 * @name: Ellen
 * @test: 提交全部面板信息
 * @msg:
 * @param {*}
 * @return {*}
 */
export const postBoards = data => {
  return $axios({
    url: '/board',
    method: 'post',
    data: {
      name: data
    }
  })
}
/**
 * @name: Ellen
 * @test: 更新面板信息
 * @msg:
 * @param {*}
 * @return {*}
 */
export const updateBoard = ({ id, name }) => {
  return $axios({
    url: `/board/${id}`,
    method: 'put',
    data: {
      name: name
    }
  })
}

/**
 * @name: Ellen
 * @test: 删除部分面板信息
 * @msg:
 * @param {*}
 * @return {*}
 */
export const delBoard = data => {
  return $axios({
    url: `/board/${data}`,
    method: 'delete'
  })
}
