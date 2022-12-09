<template>
  <div class="login-container">
    <h1>Login Component</h1>
    <div class="form-login">
      <div>
        <label for="username">登录名称</label>
        <input type="text" placeholder="请输入登录名称" v-model.trim="username">
      </div>
      <div>
        <label for="password">登录密码</label>
        <input type="password" placeholder="请输入登录密码" v-model.trim="password">
      </div>
      <div>
        <button @click="reset">重置</button>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    reset() {
      this.username = '',
      this.password = ''
    },
    login() {
      if (this.username === 'admin' && this.password === '666666') {
        // 登录成功，存储 token 跳转到主页
        localStorage.setItem('token', 'Dyi xxxx')
        this.$router.push('/home')
      } else {
        // 登录失败
        localStorage.removeItem('token')
      }
    }
  }
}
</script>

<style>
.login-container {
  background-color: rgb(245, 18, 18);
}
</style>
