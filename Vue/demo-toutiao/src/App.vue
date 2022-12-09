<template>
  <div class="app-container">
    <!-- 路由占位符 -->
    <router-view></router-view>
    <!-- Tabbar 区域 -->
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
    <!-- <MyHome></MyHome>
    <MyUser></MyUser> -->
  </div>
</template>

<script>
// import MyHome from '@/views/home/MyHome.vue'
// import MyUser from './views/user/MyUser.vue'

export default {
  components: {
    // MyHome,
    // MyUser
  }
}
</script>

<style>

</style>
