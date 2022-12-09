import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入并安装 Vant 组件库
import Vant from 'vant'
// 为了能覆盖默认的 less 变量，这里的后缀名要改为 .less.
import 'vant/lib/index.css'
// import axios from 'axios'

Vue.use(Vant)

Vue.config.productionTip = false
// Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
