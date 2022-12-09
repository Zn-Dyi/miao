<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="a-box">
      <a href="#/one">One</a> |
      <a href="#/two">Two</a> |
      <a href="#/three">Three</a>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <component :is="comName"></component>
    <!-- <One></One>
    <Two></Two>
    <Three></Three> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import One from '@/components/One.vue'
import Two from '@/components/Two.vue'
import Three from '@/components/Three.vue'

export default {
  name: 'App',
  data() {
    return {
      comName: 'One'
    }
  },
  created() {
    window.onhashchange = () => {
      console.log('监听到的 hash', location.hash)
      switch (location.hash) {
        case '#/one':
          this.comName = 'One'
          break
        case '#/two':
          this.comName = 'Two'
          break
        case '#/three':
          this.comName = 'Three'
          break
      }
    }
  },
  components: {
    // HelloWorld,
    One,
    Two,
    Three
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
