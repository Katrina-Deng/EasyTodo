<!--
 * @Des: 弹框信息
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-03 15:24:19
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 11:24:30
-->
<template>
  <ul class="popup-menu-list">
    <li
      v-for="item in items"
      :key="item.name"
      :class="{ separator: item.separator }"
      @click="commend(item.commend)"
    >
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TPopupMenu',
  props: {
    items: {
      type: Array,
      default() {
        // 对象数组 {name:xxx,commend:commend,separator:boolean}
        return []
      }
    }
  },
  methods: {
    commend(commend) {
      this.$emit('commend', commend)
    }
  }
}
</script>

<style lang="less" scoped></style>
