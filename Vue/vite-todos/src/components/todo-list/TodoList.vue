<template>
  <div class="todo-list-container">
    <!-- <h1>TodoList 组件</h1> -->
    <ul class="list-group">
      <!-- 列表组 -->
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in list" :key="item.id">
        <!-- 复选框 -->
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" :id="item.id" v-model="item.done" />
          <label class="custom-control-label" :class="item.done ? 'delete' : ''" :for="item.id">{{ item.task }}</label>
        </div>
        <!-- 徽标 -->
        <span class="badge badge-success badge-pill" v-if="item.done">完成</span>
        <span class="badge badge-warning badge-pill" v-else>未完成</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      default: [],
      type: Array,
      required: true
    },
  }

}
</script>

<style lang="less" scoped>
.delete {
  text-decoration: line-through;
  color: gray;
  font-style: italic;
}
</style>
