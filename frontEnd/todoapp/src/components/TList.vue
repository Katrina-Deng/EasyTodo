<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-06 18:39:22
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-07 22:12:36
-->
<template>
  <!-- 不动的 -->
  <div
    class="list-wrap list-wrap-content"
    :class="{ 'list-adding': isAddList }"
    :data-order="data.order"
  >
    <!-- 列表占位 -->
    <div class="list-placeholder" ref="listholder"></div>

    <!-- list 移动容器， list-header 触发移动的-->
    <div class="list" ref="list">
      <!-- 报错原因：这里点击执行了 -->
      <!-- v-model="data.name" -->
      <div class="list-header" ref="listHeader">
        <textarea
          class="form-field-input"
          @mousedown.prevent
          ref="ListName"
          v-model="data.name"
          @blur="editListName(data.name)"
        >
        </textarea>
        <div class="extras-menu" @mousedown.prevent>
          <span class="icon icon-more"></span>
        </div>
      </div>

      <div class="list-cards">
        <div class="list-card">
          <div
            class="list-card-cover"
            style="background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);"
          ></div>
          <div class="list-card-title">接口代码编写及测试</div>
          <div class="list-card-badges">
            <div class="badge">
              <span class="icon icon-description"></span>
            </div>
            <div class="badge">
              <span class="icon icon-comment"></span>
              <span class="text">2</span>
            </div>
            <div class="badge">
              <span class="icon icon-attachment"></span>
              <span class="text">5</span>
            </div>
          </div>
        </div>

        <div class="list-card-add-form">
          <textarea
            class="form-field-input"
            placeholder="为这张卡片添加标题……"
            ref="CardName"
          ></textarea>
        </div>
      </div>

      <div class="list-footer">
        <div class="list-card-add" @click="showAddList">
          <span class="icon icon-add"></span>
          <span>添加另一张卡片</span>
        </div>
        <div class="list-add-confirm">
          <button class="btn btn-success">添加卡片</button>
          <span class="icon icon-close" @click="hideAddList"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TList',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      isAddList: false,
      drag: {
        isDown: false,
        isDrag: false,
        mousex: 0,
        mousey: 0,
        ElementX: 0,
        ElementY: 0
      }
    }
  },
  mounted() {
    // console.log(this.drag.isDown)
    this.$refs.listHeader.addEventListener('mousedown', this.dragDown)
    document.addEventListener('mousemove', this.dragMove)
    document.addEventListener('mouseup', this.dragUp)
  },
  methods: {
    dragDown(e) {
      this.drag.isDown = true
      this.drag.mousex = e.clientX
      this.drag.mousey = e.clientY
      const position = this.$refs.list.getBoundingClientRect()
      this.drag.ElementX = position.x
      this.drag.ElementY = position.y
    },
    dragMove(e) {
      // 判断鼠标是否按下了
      if (this.drag.isDown) {
        // eslint-disable-next-line no-unused-vars
        const ListElment = this.$refs.list
        // eslint-disable-next-line prefer-const
        let X = e.clientX - this.drag.mousex
        // eslint-disable-next-line prefer-const
        let Y = e.clientY - this.drag.mousey
        this.$refs.listholder.style.height = this.$refs.list.offsetHeight + 'px'
        if (X > 10 || Y > 10) {
          // 超过移动距离判断，设置拖动标志
          if (!this.drag.isDrag) {
            this.drag.isDrag = true // 拖动过程中只触发一次
            ListElment.style.position = 'absolute'
            ListElment.style.zIndex = 9999
            ListElment.style.transform = 'rotate(5deg)'
            document.body.appendChild(ListElment)
            this.$emit('dragStart', { component: this })
          }
          // 跟随鼠标移动
          ListElment.style.left = this.drag.ElementX + X + 'px'
          ListElment.style.top = this.drag.ElementY + Y + 'px'
          this.$emit('dragMove', {
            component: this,
            x: e.clientX,
            y: e.clientY
          })
        }
      }
    },
    dragUp(e) {
      if (this.drag.isDown) {
        if (this.drag.isDrag) {
          // 测试还原位置
          this.$refs.list.style.position = 'relative'
          this.$refs.list.style.zIndex = 0
          this.$refs.list.style.transform = 'rotate(0deg)'
          this.$refs.list.style.left = 0 + 'px'
          this.$refs.list.style.top = 0 + 'px'
          this.$el.appendChild(this.$refs.list)
          this.$refs.listholder.style.height = 0 + 'px'
          this.$emit('dragEnd', {
            component: this
          })
        } else {
          if (e.path.includes(this.$refs.ListName)) {
            this.$refs.ListName.select()
            this.$refs.ListName.innerHTML = this.data.name
          }
        }
        this.drag.isDown = false
        this.drag.isDrag = false
      }
    },
    editListName() {
      const nVal = this.$refs.ListName.value
      const oVal = this.$refs.ListName.innerHTML
      if (nVal !== oVal) {
        this.$store.dispatch('list/putList', {
          boardId: this.data.boardId,
          boardListId: this.data.id,
          name: nVal
        })
      }
    },
    showAddList() {
      this.isAddList = true
      this.$nextTick(() => {
        this.$refs.CardName.focus()
      })
    },
    hideAddList() {
      this.isAddList = false
    }
  }
}
</script>

<style lang="less" scoped></style>
