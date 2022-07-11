<template>
  <div>
    <button :disabled="count == 0" @click="dec">-</button>
    <span :title="count">{{ count }}</span>
    <button @click="inc">+</button>
    <!-- <p>{{tasks[0]}}</p> -->
    <!-- <span>{{ leftCount }} items left</span> -->
    <!-- 相比react Vue  只需要在标签中加入v-model，在数据中加入username字段  -->
    <!-- <input type="text" v-model="username"> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      username: '',
      tasks: ['aa', 'bb']
    }
  },
  // 计算属性 （由data里的数据计算出结果）
  computed: {
    // leftCount() {
    //   return this.todos.filter(it => it.done == false).length
    // }
  },
  methods: {
    inc() {
      console.log(this)
      this.tasks[0] = 'cc'
      this.count++
    },
    dec() {
      this.count--
    }
  },
}
</script>

<style scoped>
  span {
    color: red;
  }
</style>
