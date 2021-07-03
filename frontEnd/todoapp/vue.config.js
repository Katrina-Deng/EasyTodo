/*
 * @Des: 代理信息
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-02 17:44:45
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-02 18:03:41
 */
module.exports = {
  devServer: {
    proxy: {
      // http://localhost:9527/api/v1
      '/api': {
        target: 'http://localhost:9527',
        pathRewrite: {
          '^/api': '/api/v1'
        }
      }
    }
  }
}
