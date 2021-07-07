<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 22:26:55
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-07 21:27:29
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
        <t-list
          v-for="list in lists"
          @dragStart="dragStart"
          @dragMove="dragMove"
          @dragEnd="dragEnd"
          :key="list.id"
          :data="list"
        ></t-list>
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
    // 拖拽
    dragStart(e) {
      // 记录原始的位置
      const currentComp = e.component.$el
      const BoardList = currentComp.parentNode
      const lists = [...BoardList.querySelectorAll('.list-wrap-content')]
      // eslint-disable-next-line no-unused-vars
      currentComp.listStartIndex = lists.findIndex(e => e === currentComp)
    },
    dragMove(e) {
      // 获取list 节点
      const currentComp = e.component.$el
      // 获得 .board 里面node
      const BoardList = currentComp.parentNode
      const lists = [...BoardList.querySelectorAll('.list-wrap-content')]
      const currentIndex = lists.findIndex(item => item === currentComp)
      lists.forEach((list, index) => {
        // 不是当前该元素
        if (index !== currentIndex) {
          // 获取碰撞体的位置
          const positon = list.getBoundingClientRect()
          if (
            e.x >= positon.left &&
            e.x <= positon.right &&
            e.y >= positon.top &&
            e.y <= positon.bottom
          ) {
            // 从前往后插
            if (currentIndex < index) {
              BoardList.insertBefore(currentComp, list.nextElementSibling)
            } else {
              BoardList.insertBefore(currentComp, list)
            }
          }
        }
      })
    },
    dragEnd(e) {
      const currentComp = e.component.$el
      const BoardList = currentComp.parentNode
      const lists = [...BoardList.querySelectorAll('.list-wrap-content')]
      const listEndIndex = lists.findIndex(e => e === currentComp)
      if (currentComp.listStartIndex !== listEndIndex) {
        // console.log('交换了位置')
        // eslint-disable-next-line no-unused-vars
        let newOrder = 0
        const preOrder =
          lists[listEndIndex - 1] &&
          parseFloat(lists[listEndIndex - 1].dataset.order)
        const nextOrder =
          lists[listEndIndex + 1] &&
          parseFloat(lists[listEndIndex + 1].dataset.order)
        if (!preOrder) {
          newOrder = nextOrder / 2
          // console.log('neworder0', newOrder)
        } else if (!nextOrder) {
          newOrder = preOrder + 65535
          // console.log('neworder末', newOrder)
        } else {
          newOrder = preOrder + (nextOrder - preOrder) / 2
          // console.log('neworder中', newOrder)
        }
        // 发起请求了
        this.$store.dispatch('list/putList', {
          boardId: this.boardName.id,
          boardListId: e.component.data.id,
          order: newOrder
        })
      }
    },

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
