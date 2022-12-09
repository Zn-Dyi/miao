<template>
  <h1>App 组件 --- {{son}}</h1>
  <button @click="handleAdd2">+2</button>
  <MyComputed @addClick="getAdd" v-model:number="son"></MyComputed>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <hr>
  <MyHeader title="封装的Header组件" :bgcolor="'#000'" :color="'#fff'" :type="'aaaaa'"></MyHeader>
  <hr>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MyHeader from './components/my-header/MyHeader.vue';
import MyComputed from './components/my-computed/MyComputed.vue'

export default {
  name: 'App',
  data() {
    return {
      son: 0
    }
  },
  components: {
    HelloWorld,
    MyHeader,
    MyComputed,
  },
  methods: {
    getAdd(val) {
      this.son = val
    },
    handleAdd2() {
      this.son += 2
    }
  }
}
</script>
