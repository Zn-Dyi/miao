import Vue from 'vue'
// import App from './App.vue'
import App from './App2.vue'
// 导入 router 模块
import router from '@/router/index.js'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载路由模块
  router: router
}).$mount('#app')
