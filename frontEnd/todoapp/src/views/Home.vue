<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 22:26:47
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-05 19:39:26
-->
<template>
  <div id="home">
    <!--头部-->
    <t-header></t-header>
    <main>
      <h2>
        <span class="icon icon-board"></span>
        我的看板
      </h2>
      <ul class="board-items">
        <router-link
          class="board-item"
          v-for="item in boardList"
          :key="item.id"
          tag="li"
          :to="{ name: 'Board', params: { id: item.id } }"
        >
          <span class="title">{{ item.name }}</span>
          <div class="board-controller">
            <el-button
              type="warning"
              size="mini"
              @click.stop="renameBtn(item.id)"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              @click.stop="delBoard(item.id)"
              icon="el-icon-delete"
            ></el-button>
          </div>
        </router-link>
        <!-- add  -->
        <li class="board-item create-new-board">
          <textarea
            class="title form-field-input"
            placeholder="创建新看板"
            ref="boardInputField"
            @blur="postBoard"
          ></textarea>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import THeader from '../components/THeader.vue'
import { mapState } from 'vuex'

export default {
  components: { THeader },
  data() {
    return {}
  },
  computed: {
    ...mapState('board', {
      boardList: state => state.boardList,
      inited: state => state.inited
    })
  },
  created() {
    if (!this.inited) {
      this.$store.dispatch('board/getBorads')
    }
  },
  activated() {
    if (!this.inited) {
      this.$store.dispatch('board/getBorads')
    }
  },
  methods: {
    postBoard() {
      const boardName = this.$refs.boardInputField.value
      if (boardName.trim() !== '') {
        this.$store.dispatch('board/postBoard', boardName).then(res => {
          if (res === 201) {
            this.$message.success('创建面板成功')
          }
        })

        this.$refs.boardInputField.value = ''
      }
    },
    async delBoard(id) {
      const res = await this.$api.board.delBoard(id)
      if (res.status === 204) {
        this.$message.success('删除面板成功')
        this.$store.dispatch('board/getBorads')
      } else {
        this.$message.error('删除面板失败')
      }
    },
    renameBtn(id) {
      this.$prompt('请输入名称:', '重命名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\u4e00-\u9fffa-zA-Z0-9-_]{1,255}$/,
        inputErrorMessage: '标题不能为空或者超过255字符',
        inputPlaceholder: 'name'
      })
        .then(async ({ value }) => {
          const res = await this.$api.board.updateBoard({ id, name: value })
          if (res.status === 204) {
            this.$message({
              type: 'success',
              message: '更新成功'
            })
          }
          this.$store.dispatch('board/getBorads')
        })
        .catch(e => {
          return e
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
