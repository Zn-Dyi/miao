<template>
  <div class="test-box">
    <h3>这是一个自定义的 Test.vue {{username}}</h3>
    <button @click="changeName">修改名字</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'admin'
    }
  },
  methods: {
    changeName() {
      this.username = 'TiMi'
    }
  },
  watch: {},
  computed: {},
  filters: {},
}
</script>

<style>
.test-box {
  background-color: pink;
}
</style>
