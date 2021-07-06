<!--
 * @Des: 弹出菜单
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-03 13:52:17
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 14:17:58
-->
<template>
  <!--弹窗，可用于对话框、弹出式菜单等-->
  <!--弹出式菜单-->
  <div class="popup-container">
    <div @click="openPop" ref="popItem">
      <slot></slot>
    </div>
    <!-- 弹框的菜单 -->
    <div class="popup" v-if="isShow" ref="popup">
      <div class="popup-header">
        <span class="popup-title">{{ title }}</span>
        <a class="popup-header-close" @click="closePop" ref="close">
          <i class="icon icon-close"></i>
        </a>
      </div>
      <div class="popup-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TPopup',
  props: {
    title: {
      type: String,
      default: '菜单'
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    openPop() {
      this.isShow = true
      this.$nextTick(() => {
        let left = 0
        const popup = this.$refs.popup
        // 不重置会影响计算right值，right 会变成小于window.innerWidth
        popup.style.left = 0 + 'px'
        const popupPos = popup.getBoundingClientRect()
        window.addEventListener('click', this.closePop)
        if (popupPos.right > window.innerWidth) {
          left =
            -popupPos.width + this.$refs.popItem.getBoundingClientRect().width
        }
        popup.style.left = left + 'px'
      })
      this.$emit('open')
    },
    closePop(e) {
      if (
        !e ||
        e.path.includes(this.$refs.close) ||
        !e.path.includes(this.$el)
      ) {
        this.isShow = false
        window.removeEventListener('click', this.closePop)
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.popup {
  margin-top: 3px;
}
</style>
