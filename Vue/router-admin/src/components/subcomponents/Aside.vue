<template>
  <div class="side-container">
    <!-- 左侧边栏列表 -->
    <ul class="user-select-none menu">
      <li class="menu-item">
        <router-link to="/home/users">用户管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/rights">权限管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/goods">商品管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/orders">订单管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/settings">系统设置</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.side-container {
  /* width: 100px; */
  border: 1px solid;
  padding-right: 5px;
}
</style>
