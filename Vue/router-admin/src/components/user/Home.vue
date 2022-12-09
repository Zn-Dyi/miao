<template>
  <div class="home-container">
    <h1>Home</h1>
    <Header></Header>
    <div class="home-main">
      <Aside></Aside>
      <div class="home-context">
        Context
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// 头部区域组件
import Header from '@/components/subcomponents/Header.vue'
// 左侧边栏组件
import Aside from '@/components/subcomponents/Aside.vue'

export default {
  components: {
    Aside,
    Header
  }
}
</script>

<style>
.home-container {
  background-color: rgb(246, 242, 241);
}
.home-main {
  display: flex;
  height: 100%;
}
.home-context {
  border: 1px solid;
  flex-grow: 1;
}
</style>
