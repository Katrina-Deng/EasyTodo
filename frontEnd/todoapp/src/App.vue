<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 21:44:27
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-04 22:38:41
-->
<template>
  <transition name="transitionRouter-fade" mode="out-in">
    <keep-alive>
      <router-view />
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'app'
  /**
   *  https://zhuanlan.zhihu.com/p/96740001
   *     <keep-alive>
        <!-- 需要缓存的视图组件 -->
        <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
      <!-- 不需要缓存的视图组件 -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
   */
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
