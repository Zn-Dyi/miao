
// 1. 从 Vue 中按需导入 createApp 函数
import { createApp } from 'vue'

// 2. 导入带渲染的 App 组件
import App from './App.vue'
import './index.css'

// 1. 导入需要全局注册的组件
import Home from './components/Home.vue'

// 3. 把 App 组件作为参数传给 createApp 函数
const app = createApp(App)

// 调用 app.component() 方法全局注册组件
// 此方法有两个参数，1. 声明一个组件名称， 2. 按需导入组件
app.component('MyHome', Home)

// 4. 调用 mount 实例方法用来指定 vue 实际控制的区域
app.mount('#app')

