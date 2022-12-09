<template>
  <div class="header-container">
    Header
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // 退出页面，1清空 token，2跳到登录页面
      localStorage.removeItem('token')
      this.$router.replace('/login')
    }
  }
}
</script>

<style>
.header-container {
  border: 1px solid;
}
</style>
