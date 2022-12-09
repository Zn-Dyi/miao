<template>
  <div class="home-container">
    <van-nav-bar fixed title="头条新闻" />
    <p>{{ artList.length }}</p>
    <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleInfo v-for="item in artList" :key="item.id" :title="item.title" :author="item.aut_name"
          :cmtCount="item.comm_count" :time="item.pubdate" :cover="item.cover"></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import axios from 'axios'
import { getArticleListAPI } from '@/api/articleAPI'
import ArticleInfo from '@/components/article/ArticleInfo.vue'

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      // 文章的数组存储
      artList: [],
      // 是否正在加载数据，如果 loading 为 true，则不会反复触发 load 事件
      // 每当下一页数据请求回来后，一定要把 loading 改为 false
      loading: true,
      // 所有数据是否加载完毕了，如果没有跟多数据了一定要把 finished 改成 true。
      finished: false,
      // 下拉刷新
      isLoading: false
    }
  },
  name: 'MyHome',
  components: {
    ArticleInfo
  },
  created() {
    this.initArticleList()
  },
  methods: {
    // 封装获取文章数据的方法
    async initArticleList(isRefresh) {
      await getArticleListAPI(this.page, this.limit).then(res => {
        console.log(res.data)

        if (isRefresh) {
          // 是下拉刷新
          // this.artList = [新数据在前，旧数据在后]
          this.artList = [...res.data, ...this.artList]
          this.isLoading = false
        } else {
          // 如果是上拉加载数据更多，那么应该是
          // this.artList = [旧数据在前，新数据在后]
          this.artList = [...this.artList, ...res.data]
          this.loading = false
        }

        if (res.data.length === 0) {
          // 如果下一页没有数据了，直接把 finished 改为 true，表示数据加载完了。
          this.finished = true
        }
      })
    },
    // 只要 onLoad 事件被调用，就应该请求下一页数据。
    onLoad() {
      console.log('触发了 onLoad 事件')
      // 让页码数加1
      this.page++
      // 重新请求接口获取数据
      this.initArticleList()
    },
    // 下拉刷新的处理函数
    onRefresh() {
      console.log('触发下拉刷新')
      // 页码值加1
      this.page++
      // 重新请求接口获取数据
      this.initArticleList(true)
    }
  }
}
</script>

<style  scoped>
.home-container {
  padding: 50px 0;
}

.van-nav-bar {
  background-color: #007bff;
}

/deep/.van-nav-bar__title {
  color: aliceblue;
}
</style>
