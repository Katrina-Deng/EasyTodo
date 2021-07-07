<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 22:26:55
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-06 21:48:12
-->
<template>
  <div id="board">
    <!--头部-->
    <t-header></t-header>
    <!--正文-->
    <main>
      <h2 v-if="boardName">
        <span>{{ boardName.name }}</span>
        <!-- <span class="btn btn-icon">
          邀请
        </span> -->
      </h2>

      <!--面板容器-->
      <div class="board">
        <!--面板列表容器-->
        <t-list v-for="list in lists" :key="list.id" :data="list"></t-list>
        <!--无内容列表容器-->
        <!-- 添加按钮 -->
        <div class="list-wrap no-content" :class="{ 'list-adding': isAddList }">
          <div class="list-add" @click="showAddList">
            <span class="icon icon-add"></span>
            <span class="spanText">添加另一个列表</span>
          </div>
          <!-- 表单内容 -->
          <div class="list">
            <div class="list-cards">
              <div class="list-card-add-form">
                <input
                  class="form-field-input"
                  placeholder="为这张卡片添加标题……"
                  ref="inputField"
                  v-model="val"
                  @keyup.enter="addList"
                />
              </div>
            </div>
            <div class="list-footer">
              <div class="list-add-confirm">
                <button class="btn btn-success" @click="addList">
                  添加列表
                </button>
                <span class="icon icon-close" @click="hideAddList"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <router-view></router-view>
  </div>
</template>

<script>
import THeader from '../components/THeader.vue'
import TList from '../components/TList.vue'

export default {
  name: 'Board',
  components: { THeader, TList },
  data() {
    return {
      isAddList: false,
      val: ''
    }
  },
  computed: {
    boardName() {
      return this.$store.getters['board/getBoardName'](this.$route.params.id)
    },

    lists() {
      return this.$store.getters['list/getLists'](this.$route.params.id)
    }
  },
  activated() {
    this.getboardName()
    // this.getList()
    this.getLists()
  },
  methods: {
    getboardName() {
      if (!this.boardName) {
        this.$store.dispatch('board/getBorad', this.$route.params.id)
      }
    },
    getLists() {
      if (!this.lists.length) {
        this.$store.dispatch('list/getLists', this.$route.params.id)
      }
    },
    showAddList() {
      this.isAddList = true
      this.$nextTick(() => {
        this.$refs.inputField.focus()
      })
    },
    hideAddList() {
      this.isAddList = false
      this.val = ''
    },
    addList() {
      if (this.val.trim() !== '') {
        this.$store
          .dispatch('list/postList', {
            name: this.val,
            boardId: this.boardName.id
          })
          .then(res => {
            if (res.status !== 201) {
              this.$message.error('添加列表失败')
            }
            this.isAddList = false
            this.val = ''
          })
      } else {
        this.$nextTick(() => {
          this.$message.warning('名字不能为空')
          this.$refs.inputField.focus()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
