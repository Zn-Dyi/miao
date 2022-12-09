<template>
  <div class="three-container">
    <h1>Three Component</h1>
    <hr>
    <router-link to="/three/tab1">Tab1</router-link> |
    <router-link to="/three/tab2">Tab2</router-link>
    <hr>

    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.three-container {
  background-color: rgb(30, 189, 233);
  height: 300px;
}
</style>
