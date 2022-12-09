<template>
  <div class="test-box">
    <h1>Test 组件</h1>
  </div>
</template>

<script>
export default {
  props: ['init'],
  data() {
    return {
      message: 'hello vue.js'
    }
  },
  methods: {
    show() {
      console.log('执行')
    }
  }
}
</script>

<style scoped>
.test-box {
  background-color: pink;
  height: 200px;
}
</style>
