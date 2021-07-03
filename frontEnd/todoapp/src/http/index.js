/*
 * @Des: index.js 将axios 封装成插件，按照插件的方式引入
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-02 13:40:09
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-02 16:29:07
 */
import api from './api/index.js'

const install = Vue => {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    // 注意，此处挂载在 Vue 原型的 $api 对象上
    $api: {
      get() {
        return api
      }
    }
  })
}
export default install
