<!--
 * @Des: header
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-03 13:09:26
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 14:13:32
-->
<template>
  <header>
    <div class="left">
      <router-link :to="{ name: 'Home' }" class="btn btn-icon">
        <i class="icon icon-home"></i>
      </router-link>
      <router-link :to="{ name: 'Home' }" class="btn btn-icon">
        <i class="icon icon-board"></i>
        <span class="txt">看板</span>
      </router-link>
    </div>
    <router-link :to="{ name: 'Home' }" class="logo"></router-link>
    <div class="right">
      <!-- 添加 -->
      <a href="" class="btn btn-icon">
        <i class="icon icon-add"></i>
      </a>
      <t-popup :title="user.name" ref="popup">
        <el-button size="middle" class="Helbtn" type="warning">
          <span>{{ user.name[0].toUpperCase() }}</span>
        </el-button>
        <!-- 具名插槽 -->
        <t-popup-menu
          slot="content"
          :items="menus"
          @commend="execute"
        ></t-popup-menu>
      </t-popup>
    </div>
  </header>
</template>

<script>
import TPopup from '@/components/TPopup.vue'
import TPopupMenu from '@/components/TPopupMenu.vue'
import { mapState } from 'vuex'
export default {
  components: { TPopup, TPopupMenu },
  name: 'THeader',
  data() {
    return {
      menus: [{ name: '登出', commend: 'logout' }]
    }
  },
  computed: {
    ...mapState('user', {
      user: state => state.info
    })
  },
  methods: {
    execute(commend) {
      switch (commend) {
        case 'logout':
          this.logout()
          break
        default:
          break
      }
    },
    logout() {
      this.$refs.popup.closePop()
      this.$store.dispatch('user/logout')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="less" scoped>
.Helbtn {
  padding: 0px 12px;
  height: 32px;
}
</style>
