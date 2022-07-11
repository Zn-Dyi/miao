<template>
  <div>
    <button :disabled="count == 0" @click="dec">-</button>
    <span :title="count">{{ count }}</span>
    <button @click="inc">+</button>
    <span>{{pos.x}},{{pos.y}}</span>
    <div>{{length }}</div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted, } from 'vue'


function useMousePos() {
  var pos = reactive({ x: 0, y: 0 })
  var mousemove = e => {
    pos.x = e.x
    pos.y = e.y
  }
  onMounted(() => {// 挂载
    window.addEventListener('mousemove', mousemove)
  })
  onUnmounted(() => { // 卸载
    window.addEventListener('mousemove', mousemove)
  })

  return pos
}
export default {
  setup() {
    var count = ref(0) // 相当于{value: 0}
    function inc() {
      count.value++
    }
    function dec() {
      count.value--
    }

    // var pos = reactive({ x: 0, y: 0 })
    // var mousemove = e => {
    //   pos.x = e.x
    //   pos.y = e.y
    // }
    // onMounted(() => {// 挂载
    //   window.addEventListener('mousemove', mousemove)
    // })
    // onUnmounted(() => { // 卸载
    //   window.addEventListener('mousemove', mousemove)
    // })
    var pos = useMousePos()

    var length = computed(() => {
      return Math.sqrt(pos.x * pos.x + pos.y * pos.y)
    })
    console.log(length); // computed 返回的是一个对象

    return {
      count, pos,
      inc, dec, length,
    }
  }
}
</script>

<style scoped> 
span {
  color: red;
}
</style>
