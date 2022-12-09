<template>
  <div class="test-container">
    <h1>Test 组件</h1>
    <!-- <p class="sizes" :class="isToggle ? 'col' : ''">作者：{{ author }}</p> -->

    <!-- 利用数组动态绑定多个属性 -->
    <!-- <p class="sizes" :class="[isToggle ? 'col' : '', isDelete ? 'delete' : '']">作者：{{ author }}</p>
    <button @click="handleClickChange">Toggle</button>
    <button @click="handleClickDelete">Delete</button> -->

    <!-- 利用对象动态绑定多个属性 -->
    <p class="sizes" :class="classObj">作者：{{ author }}</p>
    <button @click="handleClickChange">Toggle</button>
    <button @click="handleClickDelete">Delete</button>
    <hr>

    <p :style="{fontSize: fsize + 'px'}">对象的形式动态绑定内联样式</p>
    <button @click="fsize += 1">+1</button>
    <button @click="fsize -= 1">-1</button>
  </div>
</template>

<script>
export default {
  props: ['author'],
  // data() {
  //   return {
  //     isToggle: false,
  //     isDelete: false
  //   }
  // },
  data() {
    return {
      // 创建对象存储 class 名属性
      classObj: {
        col: false,
        delete: false
      },
      fsize: 40,
    }
  },
  methods: {
    handleClickChange() {
      this.classObj.col = !this.classObj.col
    },
    handleClickDelete() {
      this.classObj.delete = !this.classObj.delete
    }
  }
}
</script>

<style lang="less" scoped>
/* p {
  color: black;
} */
.sizes {
  font-size: 30px;
}

.col {
  color: chocolate;
}

.delete {
  text-decoration: line-through;
}
</style>
