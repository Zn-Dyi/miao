// 文章相关的 API 接口封装模块。

import request from '@/utils/request'
// 向外按需导出一个 API 函数
export const getArticleListAPI = function(_page, _limit) {
  console.log('调用了 getArticleListAPI 函数')
  return request.get('/articles', {
    params: {
      _page,
      _limit
    }
  })
}
