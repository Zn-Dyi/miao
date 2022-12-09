<template>
  <div class="todo-list-container">
    <!-- 通过 .prevent 修饰符阻止提交的默认行为，利用 onFormSubmit 函数监听任务是否为空。 -->
    <form @submit.prevent="onFormSubmit">
      <div class="input-group mb-3">
        <span class="input-group-text">任务</span>
        <input type="text" class="form-control" placeholder="请输入任务信息" v-model.trim="taskName">
        <button class="btn btn-outline-secondary" type="submit" id="button-addon2">添加新任务</button>
      </div>
    </form>


  </div>
</template>

<script>
export default {
  data() {
    return {
      taskName: '',
    }
  },
  // 声明自定义事件
  emits: ['add'],
  methods: {
    onFormSubmit() {
      // 判断认为名称不能为空
      if (this.taskName === '') {
        return alert('任务名称不能为空')
      }
      // 创建自定义事件向外界发送数据
      this.$emit('add', this.taskName)
      // 传递数据后文本框清空
      this.taskName = ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>
