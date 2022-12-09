<template>
  <div id="app">
    <div class="box">
      <Header title="购物车案例"></Header>
      <p>{{ amt }}</p>
      <!-- 循环渲染每一个商品信息 -->
      <Goods
        v-for="item in list"
        :key="item.id"
        :id="item.id"
        :title="item.goods_name"
        :pic="item.goods_img"
        :price="item.goods_price"
        :state="item.goods_state"
        :count="item.goods_count"
        @state_change="getNewState"
      ></Goods>
      <Footer
        :isfull="fullState"
        :amount="amt"
        :all="total"
        @full_change="getFullState"
      ></Footer>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
import Goods from "@/components/goods/Goods.vue";
import Header from "@/components/header/Header.vue";
import axios from "axios";
import bus from '@/components/eventBus.js'

export default {
  name: "App",
  data() {
    return {
      // 用来存储购物车的数据
      list: [],
    };
  },
  computed: {
    // 通过计算属性动态计算出全选的状态是 true 还是 false
    fullState() {
      return this.list.every((item) => item.goods_state === true);
    },
    // 已勾选商品的总价格
    amt() {
      return this.list
        .filter((item) => item.goods_state === true)
        .reduce((total, item) => {
          return (total += item.goods_price * item.goods_count);
        }, 0);
    },
    total() {
      return this.list
        .filter((item) => item.goods_state === true)
        .reduce((sum, item) => {
          return (sum += item.goods_count);
        }, 0);
    },
  },
  created() {
    this.initCartList();

    bus.$on('share', val => {
      this.list.some(item => {
        if (item.id === val.id) {
          item.goods_count = val.value
          return true
        }
      })
    })
  },
  methods: {
    // 封装请求列表数据
    async initCartList() {
      const { data: res } = await axios.get("https://www.escook.cn/api/cart");
      console.log(res);
      if (res.status === 200) {
        this.list = res.list;
      }
    },
    // 接收子组件传递过来的数据
    getNewState(e) {
      // console.log(e)
      this.list.some((item) => {
        if (item.id === e.id) {
          item.goods_state = e.value;
          return true;
        }
      });
    },
    // 接收 Footer 子组件传递过来的全选状态
    getFullState(val) {
      this.list.forEach((item) => (item.goods_state = val));
    },
  },
  components: {
    Header,
    Goods,
    Footer,
  },
};
</script>

<style lang="less" scoped>
#app {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
