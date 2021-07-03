/*
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 21:44:27
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-02 19:38:14
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
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

router.beforeEach(function(to, from, next) {
  if (
    to.matched.some(record => record.meta.auth) &&
    !localStorage.getItem('user')
  ) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
export default router
