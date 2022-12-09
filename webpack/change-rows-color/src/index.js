// 使用 ES6 导入语法导入 jQuery
import $ from "jquery"

// 导入样式（ 在 webpack 中，一切皆模块，都可以通过 ES6 导入语法进行导入和使用 ）
// import './css/index.css'
import './css/index.less'

// 导入图片 得到图片文件 ( 通过 webpack.config.js 文件配置，将 ./ 转换为 @/ )
import logo from '@/image/R-C.png'

// 给 img 标签的 src 动态赋值
$('.box').attr('src', logo)


// 定义 jQuery 的入口函数
$(function () {
  // 实现奇偶行的变色效果
  // 奇数行为红色
  $('li:odd').css('background-color', 'red')
  // 偶数行为粉色
  $('li:even').css('background-color', 'yellow')
})

// 定义装饰器函数
function info(target) {
  target.info = 'Person info'
}

// 定义一个普通的类
@info
class Person { }

console.log(Person.info)


