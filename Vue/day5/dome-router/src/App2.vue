<template>
  <div class="app-container">
    <h1>App2 Component --- {{getCount}}</h1>

    <router-link to="/one">One</router-link> |
    <router-link to="/two">Two</router-link> |
    <router-link to="/three">Three</router-link>
    <hr />

    <!-- 只要在项目中安装和配置了 vue-router，就可以使用 router-view 这个组件 -->
    <!-- 作用：占位符 -->
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  data() {
    return {
      getCount: 0
    }
  },


}
</script>

<style>

</style>
