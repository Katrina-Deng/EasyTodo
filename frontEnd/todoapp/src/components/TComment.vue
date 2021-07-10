<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-10 15:58:22
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-10 17:44:05
-->
<template>
  <div>
    <!-- 添加评论 -->
    <div class="comment-post">
      <div class="avatar">
        <span>{{ name }}</span>
      </div>
      <div class="comment-content-box editing">
        <textarea
          class="comment-content-input"
          placeholder="添加评论……"
          v-model="content"
          ref="content"
        ></textarea>
        <button class="btn btn-edit" @click="postComent">保存</button>
      </div>
    </div>
    <!-- 添加内容 -->
    <ul class="comments" v-if="comments.rows">
      <li class="comment" v-for="comment in comments.rows" :key="comment.id">
        <div class="avatar">
          <span>{{ comment.user.name[0].toUpperCase() }}</span>
        </div>
        <div class="description">
          <div class="header">
            <strong> {{ comment.user.name }} </strong>
            <span> at </span>
            <i> {{ comment.createdAt | momentFilter }} </i>
          </div>
          <div class="content">
            {{ comment.content }}
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页 -->
    <div class="comment-pagination">
      <!-- <div class="pagination">
        <span>首页</span>
        <span>上一页</span>
        <span>...</span>
        <span>4</span>
        <span>5</span>
        <span class="current-page">6</span>
        <span>7</span>
        <span>8</span>
        <span>...</span>
        <span>下一页</span>
        <span>尾页</span>
      </div> -->
      <!-- @current-change="handleCurrentChange" -->
      <el-pagination
        @current-change="curPagechange"
        :current-page="comments.page"
        :page-size="comments.pages"
        layout="total, prev, pager, next"
        :total="comments.count"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TComment',
  props: {
    cardId: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      comments: '',
      content: ''
    }
  },
  computed: {
    name() {
      return JSON.parse(localStorage.getItem('user')).name[0].toUpperCase()
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments(page) {
      this.$store
        .dispatch('comment/getComments', {
          cardId: this.cardId,
          page: page
        })
        .then(res => {
          this.comments = res.data
        })
    },
    postComent() {
      if (this.content === '') {
        this.$message.warning('评论内容不能为空')
        this.$nextTick(() => {
          this.$refs.content.focus()
        })
      }
      this.$store
        .dispatch('comment/postComment', {
          cardId: this.cardId,
          content: this.content
        })
        .then(res => {
          if (res.status === 201) {
            this.$message.success('评论成功')
            this.content = ''
            this.getComments()
          }
        })
    },
    curPagechange(val) {
      this.getComments(val)
    }
  }
}
</script>

<style lang="less" scoped></style>
