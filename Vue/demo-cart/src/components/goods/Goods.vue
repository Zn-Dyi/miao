<template>
  <div class="goods-box">
    <!-- 左侧图片 -->
    <div class="thumb">
      <div class="custom-control custom-checkbox">
        <!-- 复选框 -->
        <input
          type="checkbox"
          class="custom-control-input"
          :id="'cb' + id"
          :checked="state"
          @change="stateChange"
        />
        <label class="custom-control-label" :for="'cb' + id">
          <!-- 商品的缩略图 -->
          <img :src="pic" alt="" />
        </label>
      </div>
    </div>
    <!-- 右侧信息区域 -->
    <div class="goods-info">
      <!-- 商品标题 -->
      <h6 class="goods-title">{{ title }}</h6>
      <div class="goods-info-bottom">
        <!-- 商品价格 -->
        <span class="goods-price">￥{{ price }}</span>
        <!-- 商品的数量 -->
        <Counter :num="count" :id="id"></Counter>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "@/components/counter/Counter.vue";

export default {
  props: {
    // 商品的Id
    id: {
      required: true,
      type: Number,
    },
    // 渲染商品标题
    title: {
      default: "",
      type: String,
    },
    // 渲染图片
    pic: {
      default: "",
      type: String,
    },
    // 商品的单价
    price: {
      default: 0,
      type: Number,
    },
    // 商品的勾选状态
    state: {
      default: true,
      type: Boolean,
    },
    // 商品购买数量
    count: {
      default: 0,
      type: Number,
    },
  },
  methods: {
    stateChange(e) {
      // console.log(e.target.checked)
      const newState = e.target.checked;
      this.$emit("state_change", { id: this.id, value: newState });
    },
  },
  components: {
    Counter,
  },
};
</script>

<style scoped>
.goods-box {
  border: 1px solid;
}
</style>
