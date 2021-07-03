/*
 * @Des: axios
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-02 12:10:42
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-02 18:17:36
 */
import axios from 'axios'
import { Message } from 'element-ui' // 引入elm组件

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    // 基础配置
    const server = axios.create({
      method: 'get',
      // 基础url前缀
      baseURL: process.env.VUE_APP_SERVER_API_PATH,
      // 请求头信息
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      // 参数
      data: {},
      // 设置超时时间
      timeout: 10000,
      // 携带凭证
      withCredentials: true,
      // 返回数据类型
      responseType: 'json'
    })

    // request
    server.interceptors.request.use(
      config => {
        return config
      },
      error => {
        return error
      }
    )
    // response
    server.interceptors.response.use(
      response => {
        return response
      },
      error => {
        // Message({ message: '注册失败', type: 'error' })
        console.dir(error.response)
        let { message, errDetails } = error.response.data
        if (errDetails) {
          message = message + ':' + errDetails
        }
        Message({ message: message, type: 'error' })
        throw error
      }
      // 还可以做状态判断
      // switch (error.response.status) {
      //   case 409:
      //     break;
      //   default 404:
      //     break;
      // }
    )
    server(options)
      .then(res => {
        resolve(res)
        return false
      })
      .catch(error => {
        reject(error)
      })
  })
}
