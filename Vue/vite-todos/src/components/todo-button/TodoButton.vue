<template>
  <div class="todo-button-container">
    <!-- <h1>Todo Button 组件</h1> -->
    <button type="button" class="btn" :class="active === 0 ? 'btn-outline-primary' : 'btn-outline-secondary'" @click="onBtnClick(0)">全选</button>
    <button type="button" class="btn" :class="active === 1 ? 'btn-outline-primary' : 'btn-outline-secondary'" @click="onBtnClick(1)">已完成</button>
    <button type="button" class="btn" :class="active === 2 ? 'btn-outline-primary' : 'btn-outline-secondary'" @click="onBtnClick(2)">未完成</button>
  </div>
</template>

<script>
export default {
  emits: ['update:active'],
  props: {
    active: {
      type: Number,
      required: true,
      // 默认激活值为 0 的按钮（全部：0，已完成：1，未完成：2）
      default: 0
    }
  },
  methods: {
    onBtnClick(index) {
      // 如果当前索引值等于 props 穿过来的索引值则没必要触发 update:active 自定义事件
      if (index === this.active) {
        return true
      }
      // 创建自定义事件发送数据
      this.$emit('update:active', index)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
