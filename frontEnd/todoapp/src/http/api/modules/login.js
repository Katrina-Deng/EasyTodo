/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-02 13:35:49
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-02 18:32:50
 */
import $axios from '../../http'

// console.log('$axios', $axios)
export const login = data => {
  return $axios({
    url: '/user/login',
    method: 'post',
    data
  })
}
// get
// 查找用户的菜单权限标识集合
// export const findPermissions = params => {
//   return axios({
//     url: '/user/findPermissions',
//     method: 'get',
//     params
//   })
// }
