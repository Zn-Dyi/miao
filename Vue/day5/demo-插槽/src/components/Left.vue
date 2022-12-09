<template>
  <div class="left-container">
    <h3>Left 组件 --- {{ count }}</h3>
    <button @click="add">add</button>
    <hr />
    <!-- 声明一个插槽区域 -->
    <!-- vue 官方规定：每一个 slot 插槽，都要有一个 name 名称 -->
    <!-- 如果省略了 slot 的 name 属性，则有一个默认名称叫做 default -->
    <slot name="default">
      <h6>这是 default 插槽的后备内容</h6>
    </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    add() {
      this.count += 1
    }
  },
  created() {
    console.log('Left 组件被创建了！')
  },
  destroyed() {
    console.log('Left 组件被销毁了~~~')
  },

  // 当组件第一次被创建的时候，既会执行 created 生命周期，也会执行 activated 生命周期
  // 当时，当组件被激活的时候，只会触发 activated 生命周期，不再触发 created。因为组件没有被重新创建
  activated() {
    console.log('组件被激活了，activated')
  },
  deactivated() {
    console.log('组件被缓存了，deactivated')
  }
};
</script>

<style lang="less">
.left-container {
  padding: 0 20px 20px;
  background-color: orange;
  min-height: 250px;
  flex: 1;
}
</style>
