/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 21:44:27
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-09 22:25:15
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  showFullScreenLoading,
  tryHideFullScreenLoading
} from '@/utils/loading'
Vue.use(VueRouter)

const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
const Board = () => import(/* webpackChunkName: "Board" */ '../views/Board.vue')
const Card = () => import(/* webpackChunkName: "Card" */ '../views/Card.vue')
const Register = () =>
  import(/* webpackChunkName: "Register" */ '../views/Register.vue')
const NotFound = () =>
  import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '/board/:id(\\d+)',
    name: 'Board',
    component: Board,
    meta: {
      auth: true
    },
    children: [
      {
        path: 'list/:listid(\\d+)/card/:cardid(\\d+)',
        name: 'Card',
        component: Card
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_DEV_BASE_URL,
  routes
})
nprogress.configure({ ease: 'linear', speed: 500 })
router.beforeEach(function(to, from, next) {
  if (
    to.matched.some(record => record.meta.auth) &&
    !localStorage.getItem('user')
  ) {
    nprogress.start()
    showFullScreenLoading()
    next({ name: 'Login' })
  } else {
    nprogress.start()
    showFullScreenLoading()
    next()
  }
})
router.afterEach(() => {
  nprogress.done() // 完成进度条
  tryHideFullScreenLoading()
})

export default router
