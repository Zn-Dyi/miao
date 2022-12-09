<template>
  <div class="my-computed-container">
    <h1>计算属性 --- {{number}}</h1>
    <button @click="handleAdd1">+1</button>
    <hr>
    <input type="text" v-model="count">
    <p>{{ count }} 乘以 2 的值为 {{ total }}</p>
    <button @click="add">+1</button>
    <button @click="this.count--">-1</button>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      count: 1,
    }
  },
  // 存储自定义事件
  emits: ['addClick', 'update:number'],
  computed: {
    total() {
      return this.count * 2
    }
  },
  methods: {
    add() {
      this.count++
      this.$emit('addClick', this.count)
    },
    handleAdd1() {
      this.$emit('update:number', this.number + 1)
    }
  }
}
</script>

<style>

</style>
