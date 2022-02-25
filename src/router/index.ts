import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Login from '../login/login.vue'
import Login from '../login/login.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '珠宝成品后台管理系统',
      type: 'login',
      allowBack: false
    }
  }
]

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes
})


export default router
