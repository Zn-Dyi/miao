// 1. 导入 vue 和 vue-router 的包
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入应用的组件
import One from '@/components/One.vue'
import Two from '@/components/Two.vue'
import Three from '@/components/Three.vue'
import Tab1 from '@/components/tabs/Tab1.vue'
import Tab2 from '@/components/tabs/Tab2.vue'
import Login from '@/components/Login.vue'
import Main from '@/components/Main.vue'

// 2. 调用 Vue.use() 函数，把 VueRouter 安装为 Vue 的插件。
Vue.use(VueRouter)

// 3. 创建路由实例对象
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/two' },
    { path: '/one', component: One },
    { path: '/two', component: Two },
    {
      path: '/three',
      component: Three,
      redirect: '/three/tab1',
      children: [
        { path: 'tab1', component: Tab1 },
        { path: 'tab2', component: Tab2 },
      ]
    },
    { path: '/main', component: Main },
    { path: '/login', component: Login }
  ]
})

// 为 router 实例对象，声明全局前置导航守卫。
// 只要发生了路由的跳转，必然会触发 beforeEach 指定的 function 回调函数
router.beforeEach(function (to, from, next) {
  // to 表示将要访问的路由的信息对象
  // from 表示将要离开的路由的信息对象
  // next() 函数表示放行的意思
  // 分析：
  // 1. 要拿到用户将要访问的 hash 地址
  // 2. 判断 hash 地址是否等于 /main。
  // 2.1 如果等于 /main，证明需要登录之后，才能访问成功
  // 2.2 如果不等于 /main，则不需要登录，直接放行  next()
  // 3. 如果访问的地址是 /main。则需要读取 localStorage 中的 token 值
  // 3.1 如果有 token，则放行
  // 3.2 如果没有 token，则强制跳转到 /login 登录页
  if (to.path === '/main') {
    // 要访问后台主页，需要判断是否有 token
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      // 没有登录，强制跳转到登录页
      next('/login')
    }
  } else {
    next()
  }
})

// 4. 向外共享出路由实例对象
export default router
