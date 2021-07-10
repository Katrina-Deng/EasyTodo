<!--
 * @Des:列表页的卡片
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-08 15:46:50
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-10 15:44:56
-->
<template>
  <!-- 'list/:listid(\\d+)/card/:cardid(\\d+)', -->
  <!-- :to="{ name: 'user', params: { userId: 123 }}" -->
  <router-link
    class="list-card"
    :to="{
      name: 'Card',
      params: { listid: data.boardListId, cardid: data.id }
    }"
  >
    <!-- 背景图片 -->
    <div
      class="list-card-cover"
      v-if="data.coverPath"
      :style="
        'background-image: url(' + server.staticPath + data.coverPath + ');'
      "
    ></div>
    <div class="list-card-title">{{ data.name }}</div>
    <div class="list-card-badges">
      <div class="badge" v-if="data.description">
        <span class="icon icon-description"></span>
      </div>
      <div class="badge" v-if="data.commentCount">
        <span class="icon icon-comment"></span>
        <span class="text">{{ data.commentCount }}</span>
      </div>
      <div class="badge" v-if="data.attachments && data.attachments.length">
        <span class="icon icon-attachment"></span>
        <span class="text">{{ data.attachments.length }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TCard',
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    ...mapState(['server'])
  }
}
</script>

<style lang="less" scoped></style>
