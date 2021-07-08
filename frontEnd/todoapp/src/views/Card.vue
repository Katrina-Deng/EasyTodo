<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 22:27:03
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-08 23:06:14
-->

<template>
  <!--遮罩层-->
  <div class="window-overlay" style="display: block" v-if="card && list">
    <!--弹出式窗口-->
    <div class="popup">
      <div class="popup-header">
        <div class="popup-title">
          <div class="popup-title-icon">
            <span class="icon icon-card"></span>
          </div>
          <div class="popup-title-text">
            <textarea
              class="form-field-input"
              v-model="card.name"
              @blur="editCardName"
              ref="fieldinputName"
              @focus="getCardName"
            ></textarea>
          </div>
          <div class="popup-title-detail">在列表 {{ list.name }} 中</div>
        </div>
        <a class="popup-header-close">
          <i class="icon icon-close" @click="$router.back()"></i>
        </a>
      </div>

      <div class="popup-content">
        <!--描述-->
        <div class="window-module">
          <div class="title">
            <div class="title-icon">
              <span class="icon icon-description"></span>
            </div>
            <div class="title-text">
              <h3>描述</h3>
              <!-- <button class="btn btn-edit">编辑</button> -->
            </div>
          </div>

          <p class="description">
            <textarea
              class="form-field-input"
              v-model="card.description"
              @blur="editCardDesc"
              @focus="getCardDesc"
              ref="fieldinputDesc"
            ></textarea>
          </p>
        </div>

        <!--附件-->
        <div class="window-module">
          <div class="title">
            <div class="title-icon">
              <i class="icon icon-attachment"></i>
            </div>
            <div class="title-text">
              <h3>附件</h3>
            </div>
          </div>
          <!-- 附件内容 -->
          <ul class="attachments">
            <li
              class="attachment"
              v-for="attachment in card.attachments"
              :key="attachment.id"
            >
              <div
                class="attachment-thumbnail"
                :style="
                  `background-image: url(${server.staticPath}${attachment.path})`
                "
              ></div>
              <p class="attachment-detail">
                <span class="attachment-thumbnail-name"
                  ><strong>{{ attachment.detail.name }}</strong></span
                >
                <span class="attachment-thumbnail-descriptions">
                  <span class="datetime">{{
                    attachment.detail.createdAt | DateFilter
                  }}</span>
                  <span> - </span>
                  <u>删除</u>
                </span>
                <span class="attachment-thumbnail-operation">
                  <i class="icon icon-card-cover"></i>
                  <u>移除封面</u>
                </span>
              </p>
            </li>
          </ul>

          <div>
            <button class="btn btn-edit">添加附件</button>
          </div>
        </div>

        <!--活动-->
        <div class="window-module">
          <div class="title">
            <div class="title-icon">
              <i class="icon icon-activity"></i>
            </div>
            <div class="title-text">
              <h3>评论</h3>
            </div>
          </div>

          <div class="comment-post">
            <div class="avatar">
              <span>Z</span>
            </div>
            <div class="comment-content-box editing">
              <textarea
                class="comment-content-input"
                placeholder="添加评论……"
              ></textarea>
              <button class="btn btn-edit">保存</button>
            </div>
          </div>

          <ul class="comments">
            <li class="comment">
              <div class="avatar">
                <span>Z</span>
              </div>
              <div class="description">
                <div class="header">
                  <strong>zMouse</strong>
                  <span> at </span>
                  <i>2019年12月29日晚上11点04分</i>
                </div>
                <div class="content">
                  非常不错！！
                </div>
              </div>
            </li>
            <li class="comment">
              <div class="avatar">
                <span>Z</span>
              </div>
              <div class="description">
                <div class="header">
                  <strong>zMouse</strong>
                  <span> at </span>
                  <i>2019年12月29日晚上11点04分</i>
                </div>
                <div class="content">
                  非常不错！！
                </div>
              </div>
            </li>
            <li class="comment">
              <div class="avatar">
                <span>Z</span>
              </div>
              <div class="description">
                <div class="header">
                  <strong>zMouse</strong>
                  <span> at </span>
                  <i>2019年12月29日晚上11点04分</i>
                </div>
                <div class="content">
                  非常不错！！
                </div>
              </div>
            </li>
            <li class="comment">
              <div class="avatar">
                <span>Z</span>
              </div>
              <div class="description">
                <div class="header">
                  <strong>zMouse</strong>
                  <span> at </span>
                  <i>2019年12月29日晚上11点04分</i>
                </div>
                <div class="content">
                  非常不错！！
                </div>
              </div>
            </li>
            <li class="comment">
              <div class="avatar">
                <span>Z</span>
              </div>
              <div class="description">
                <div class="header">
                  <strong>zMouse</strong>
                  <span> at </span>
                  <i>2019年12月29日晚上11点04分</i>
                </div>
                <div class="content">
                  非常不错！！
                </div>
              </div>
            </li>
            <li class="comment">
              <div class="avatar">
                <span>Z</span>
              </div>
              <div class="description">
                <div class="header">
                  <strong>zMouse</strong>
                  <span> at </span>
                  <i>2019年12月29日晚上11点04分</i>
                </div>
                <div class="content">
                  非常不错！！
                </div>
              </div>
            </li>
          </ul>

          <div class="comment-pagination">
            <div class="pagination">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Card',
  computed: {
    ...mapState(['server']),
    list() {
      return this.$store.getters['list/getList'](this.$route.params.listid)
    },
    card() {
      return this.$store.getters['card/getCard'](this.$route.params.cardid)
    }
  },

  methods: {
    getCardName(e) {
      this.$refs.fieldinputName.innerHTML = e.target.value
    },
    getCardDesc(e) {
      this.$refs.fieldinputDesc.innerHTML = e.target.value
    },
    editCardName(e) {
      if (this.card.name !== this.$refs.fieldinputName.innerHTML) {
        this.putCard(e, 'name')
      }
    },
    editCardDesc(e) {
      if (this.card.description !== this.$refs.fieldinputDesc.innerHTML) {
        this.putCard(e, 'description')
      }
    },
    putCard(e, paramName) {
      this.$store
        .dispatch('card/putCard', {
          id: this.card.id,
          [paramName]: e.target.value
        })
        .then(res => {
          if (res.status === 204) {
            this.$message.success('更新成功')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
