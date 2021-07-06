/*
 * @Des: Loading 工具
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-04 13:49:51
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 13:50:22
 */
import { Loading } from 'element-ui' // 引入elm组件
let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中......',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {
  loading.close()
}

let needLoadingRequestCount = 0

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
