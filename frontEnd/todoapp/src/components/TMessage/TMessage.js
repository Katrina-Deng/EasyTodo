/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-02 15:03:30
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-06 18:27:43
 */
import TMessage from './TMessage.vue'
import vue from 'vue'

// 传入vue对象后会返回给我们构造函数，通过new会得到新组件实例TMessage
const TMessageClass = vue.extend(TMessage)
let instances = []

// 工厂函数 通过调用 得到新组件实例TMessage
// 消息管理
function Message(data) {
  data = data || {}
  if (typeof options === 'string') {
    data = {
      message: data
    }
  }
  // 管理组件队列
  //   传入data method mount等组件实例相关的属性
  const instance = new TMessageClass({ data })
  data.onClose = function() {
    Message.Close(instance)
  }

  //   实例挂载 $el 组件根节点
  instance.$mount()
  document.body.appendChild(instance.$el)
  // 处理向上偏移值
  const offset = data.offset || 20
  let offsetTop = offset
  instances.forEach(item => {
    offsetTop += item.$el.offsetHeight + offset
  })
  // 轮流执行的每次创建一个实例就计算队列的偏移量从而确定偏移量
  instance.$el.style.top = offsetTop + 'px'
  instances.push(instance)
}

;['info', 'success', 'error', 'warning'].forEach(type => {
  Message[type] = function(data) {
    if (typeof data === 'string') {
      data = {
        message: data
      }
    }
    data.type = type
    return Message(data)
  }
})

Message.Close = function(instance) {
  const removeTop = instance.$el.offsetHeight + instance.offset
  const index = instances.findIndex(item => item === instance)
  instances = instances.filter((item, i) => i !== index)
  for (let i = index; i < instances.length; i++) {
    instances[i].$el.style.top =
      parseFloat(instances[i].$el.style.top) - removeTop + 'px'
  }
}

export default Message
