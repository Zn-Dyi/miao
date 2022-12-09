<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <hr>
    <TodoInput @add="onAddNewTask"></TodoInput>
    <hr>
    <TodoList :list="todoList"></TodoList>
    <hr>
    <TodoButton v-model:active="activeBtnIndex"></TodoButton>

    <!-- <MyGlobal></MyGlobal> -->
  </div>
</template>

<script>
import TodoList from './components/todo-list/TodoList.vue'
import TodoInput from './components/todo-input/TodoInput.vue'
import TodoButton from './components/todo-button/TodoButton.vue'

export default {
  name: 'App',
  data() {
    return {
      // 任务列表的数据
      todoList: [
        { id: 1, task: '周一早晨9点开会', done: false },
        { id: 2, task: '周一晚上8点聚餐', done: false },
        { id: 3, task: '周三早晨9点开会', done: true },
      ],
      // 下一个可用的 Id
      nextId: 4,
      // 激活按钮的索引
      activeBtnIndex: 0
    }
  },
  computed: {
    // 根据按钮激活的索引值，动态渲染列表数据
    todoList() {
      // 通过 ‘源数据’ 进行，switch...case 的匹配，返回计算之后的结果
      switch (this.activeBtnIndex) {
        case 0: // 全选
          return this.todoList
        case 1: // 已完成
          return this.todoList.filter(item => item.done === true)
        case 2: // 未完成
          return this.todoList.filter(item => item.done === false)
      }
    }
  },
  methods: {
    onAddNewTask(taskName) {
      // 通过自定义事件 @add 传递过来的数据 taskName
      console.log(taskName)
      // this.todoList.push({
      //   id: this.nextId,
      //   task: taskName,
      //   done: false,
      // })
      this.todoList = [...this.todoList, {
        id: this.nextId,
        task: taskName,
        done: false,
      }]
      // 将下一个可用 Id 加 1
      this.nextId++
    }
  },
  components: {
    TodoList,
    TodoInput,
    TodoButton
  }
}
</script>

<style lang="less" scoped>

</style>
