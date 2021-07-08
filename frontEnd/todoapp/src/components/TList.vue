<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-06 18:39:22
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-08 17:54:19
-->
<template>
  <!-- 不动的 -->
  <!-- :class="{ 'list-adding': isCardAdd }" -->
  <div class="list-wrap list-wrap-content" :data-order="data.order">
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

      <!-- card start -->
      <div class="list-cards">
        <t-card v-for="card in cards" :data="card" :key="card.id"></t-card>
      </div>
      <!-- end card -->
      <div class="list-footer">
        <div class="list-card-add" @click="showAddCard">
          <span class="icon icon-add"></span>
          <span>添加另一张卡片</span>
        </div>
      </div>
    </div>

    <!-- 新增卡片 -->
    <el-dialog
      title="新增卡片"
      :visible.sync="isCardAdd"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        :rules="rule"
        ref="form"
        :hide-required-asterisk="true"
        label-width="80px"
      >
        <el-form-item label="卡片名称： " prop="name">
          <el-col :span="18">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="卡片描述： " prop="description">
          <el-col :span="18">
            <el-input v-model="form.description"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideAddCard">取 消</el-button>
        <el-button type="primary" @click="postCard">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TCard from './TCard.vue'
export default {
  components: { TCard },
  name: 'TList',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      isCardAdd: false,
      drag: {
        isDown: false,
        isDrag: false,
        mousex: 0,
        mousey: 0,
        ElementX: 0,
        ElementY: 0
      },
      form: {
        name: '',
        description: ''
      },
      rule: {
        name: [{ required: true, message: '卡片名称不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCards()
  },
  computed: {
    cards() {
      return this.$store.getters['card/allCards'](this.data.id)
    }
  },
  mounted() {
    this.$refs.listHeader.addEventListener('mousedown', this.dragDown)
    document.addEventListener('mousemove', this.dragMove)
    document.addEventListener('mouseup', this.dragUp)
  },
  methods: {
    getCards() {
      if (!this.cards.length) {
        this.$store.dispatch('card/getCards', this.data.id)
      }
    },
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
    showAddCard() {
      this.isCardAdd = true
    },
    hideAddCard() {
      this.isCardAdd = false
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
    },
    postCard() {
      this.$refs.form.validate(res => {
        if (res) {
          this.$store
            .dispatch('card/postCard', {
              boardListId: this.data.id,
              name: this.form.name,
              description: this.form.description
            })
            .then(res => {
              if (res.status === 201) {
                this.$message.success('添加成功')
                this.hideAddCard()
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
