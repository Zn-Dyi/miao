import Vue from 'vue'
import VueRouter from 'vue-router'
import MyHome from '@/views/home/MyHome.vue'
import MyUser from '@/views/user/MyUser.vue'

// 把 VueRouter 安装为 Vue 的插件
Vue.use(VueRouter)

// 路由规则的数组
const routes = [
  { path: '/', component: MyHome },
  { path: '/user', component: MyUser }
]

// 创建路由实例对象
const router = new VueRouter({
  routes
})

export default router
