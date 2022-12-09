<template>
  <div class="counter-box">
    <!-- 减 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="sub">-</button>
    <!-- 购买的数量 -->
    <span class="number-box">{{ num }}</span>
    <!-- 加 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="add">+</button>
  </div>
</template>

<script>
import bus from "@/components/eventBus.js";

export default {
  props: {
    // 接收商品的 id
    id: {
      required: true,
      type: Number,
    },
    // 商品购买数量
    num: {
      default: 0,
      type: Number,
    },
  },
  methods: {
    add() {
      // 要发送给 App 的数据格式为 { id, value }
      // 其中，id 是商品的 id; value 是商品最新的购买数量
      const obj = { id: this.id, value: this.num + 1 };
      // 要做的事情：通过 EventBus 把 obj 对象，发送给 App.vue 组件
      bus.$emit("share", obj);
    },
    sub() {
      if (this.num - 1 === 0) return;
      // 要发送给 App 的数据格式为 { id, value }
      // 其中，id 是商品的 id; value 是商品最新的购买数量
      const obj = { id: this.id, value: this.num - 1 };
      // 要做的事情：通过 EventBus 把 obj 对象，发送给 App.vue 组件
      bus.$emit("share", obj);
    },
  },
};
</script>

<style scoped>
.number-box {
  min-width: 30px;
  text-align: center;
  margin: 0 5px;
  font-size: 12px;
}

.btn-sm {
  width: 30px;
}
</style>
