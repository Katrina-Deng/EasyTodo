<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-06 18:39:22
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-06 23:40:29
-->
<template>
  <!-- 不动的 -->
  <div class="list-wrap " :class="{ 'list-adding': isAddList }">
    <div class="list-placeholder"></div>

    <!-- list 移动容器， list-header 触发移动的-->
    <div class="list" ref="list">
      <div class="list-header" ref="listHeader" @click="dragDown">
        <textarea
          class="form-field-input"
          v-model="data.name"
          @mousedown.prevent
          @mousemove.prevent
        ></textarea>
        <div class="extras-menu" @mousedown.prevent @mousemove.prevent>
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
        mousex: 0,
        mousey: 0,
        ElementX: 0,
        ElementY: 0,
        offsetX: 0,
        offsetY: 0
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
      this.drag.ElementX = position.left
      this.drag.ElementY = position.top
    },
    dragMove(e) {
      // 判断鼠标是否按下了
      if (this.drag.isDown) {
        this.drag.offsetX = Math.abs(e.clientX - this.drag.mousex)
        this.drag.offsetY = Math.abs(e.clientY - this.drag.mousey)
        if (this.drag.offsetX > 10 || this.drag.offsetY) {
          console.log('draging')
        }
      }
    },
    dragUp(e) {
      this.drag.isDown = false
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
