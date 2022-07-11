<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <MyCounter />
  <MyCounter2 />
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MyCounter from './components/MyCounter.vue'
import MyCounter2 from './components/MyCounter2.vue'


// 自己要用的组件在自己导出字段的里面在声明一下
export default {
  name: 'App',
  components: {
    HelloWorld,
    MyCounter,
    MyCounter2,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
