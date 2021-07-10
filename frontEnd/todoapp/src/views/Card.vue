<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 22:27:03
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-10 15:59:49
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
          <ul class="attachments" v-if="Array.isArray(card.attachments)">
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
                    attachment.detail.createdAt | momentFilter
                  }}</span>
                  <span> - </span>
                  <u @click="removeAttachment(attachment.id)">删除</u>
                </span>
                <span class="attachment-thumbnail-operation">
                  <i class="icon icon-card-cover"></i>
                  <u v-if="attachment.isCover" @click="delCover(attachment.id)"
                    >移除封面</u
                  >
                  <u v-else @click="setCover(attachment.id)">设为封面</u>
                </span>
              </p>
            </li>
          </ul>

          <div>
            <button class="btn btn-edit" @click="$refs.upload.click()">
              添加附件
            </button>
            <input
              type="file"
              ref="upload"
              style="display:none;"
              @change="uploadFile"
            />
          </div>
        </div>

        <!--评论 -->
        <div class="window-module">
          <div class="title">
            <div class="title-icon">
              <i class="icon icon-activity"></i>
            </div>
            <div class="title-text">
              <h3>评论</h3>
            </div>
          </div>
          <t-comment :card-id="card.id"></t-comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TComment from '../components/TComment.vue'
export default {
  components: { TComment },
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
    },
    uploadFile() {
      if (this.$refs.upload.files[0]) {
        this.$store
          .dispatch('card/uploadFile', {
            boardListCardId: this.$route.params.cardid,
            attachment: this.$refs.upload.files[0]
          })
          .then(res => {
            res.status === 200
              ? this.$message.success('上存成功')
              : this.$message.error('上存失败')
          })
        this.$refs.upload.value = ''
      }
    },
    removeAttachment(id) {
      this.$store
        .dispatch('card/removeAttachment', {
          cardId: this.$route.params.cardid,
          attachmentId: id
        })
        .then(res => {
          res.status === 204
            ? this.$message.success('删除成功')
            : this.$message.error('删除失败')
        })
    },
    setCover(id) {
      this.$store
        .dispatch('card/setCover', {
          cardId: this.$route.params.cardid,
          attachmentId: id
        })
        .then(res => {
          res.status === 204
            ? this.$message.success('设置成功')
            : this.$message.error('设置失败')
        })
    },
    delCover(id) {
      this.$store
        .dispatch('card/delCover', {
          cardId: this.$route.params.cardid,
          attachmentId: id
        })
        .then(res => {
          res.status === 204
            ? this.$message.success('移除成功')
            : this.$message.error('移除失败')
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
