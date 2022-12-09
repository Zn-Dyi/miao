<template>
  <div class="home-container">
    <h1>
      这是<i>Home</i>组件
    </h1>
    <hr>
    <Test :author="init.author"></Test>
  </div>
</template>

<script>
import Test from './Test.vue'

export default {
  data() {
    return {
      init: {
        author: '小天'
      }
    }
  },
  components: {
    Test
  }
}
</script>

<style lang="less" scoped>
// 在 style 标签加入 scoped 属性防止组件渲染冲突
.home-container {
  color: red;

  i {
    color: blue;
  }
}

/* /deep/ .test-container {
  color: aqua;
} */
// Vue3.0 将弃用 /deep/ 语法，改换成 :deep( 选择器 ) 语法。
:deep(.test-container) {
  color: aquamarine;
}
</style>
