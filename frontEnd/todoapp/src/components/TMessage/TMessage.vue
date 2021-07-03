<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-02 14:37:19
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-02 15:40:20
-->
<template>
  <transition name="message-fade">
    <div
      :class="['message', 'message-' + type, 'is-center']"
      v-if="!isShow"
      :style="{ top: offset + 'px' }"
    >
      <p class="message-content">提示信息：{{ message }}</p>
      <i class="icon icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      message: '默认信息',
      type: 'success',
      isShow: false,
      duration: 5000,
      offset: 20,
      timer: null,
      onClose: null
    }
  },
  mounted() {
    this.timer = setTimeout(() => {
      if (!this.isShow) {
        this.close()
      }
    }, this.duration)
  },
  methods: {
    close() {
      this.isShow = true
      if (typeof this.onClose === 'function') {
        this.onClose()
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
