
// 配置 webpack 处理 xxx.js 后缀结尾的模块。(解决隔行变色问题)
const path = require('path')

// 导入自动清除 dist 文件的 webpack 插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 1. 导入 html-webpack-plugin 这个插件，得到插件的构造函数
// (配置 html-webpack-plugin 与 webpack-dev-server 搭配使用)
const HtmlPlugin = require('html-webpack-plugin')

// 2. new 构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
  // 指定要复制那个页面
  template: './src/index.html',
  // 指定复制出来的文件名和存放路径
  filename: './index.html',
})

// 使用 Node.js 中的导出语法，向外导出一个 webpack 配置对象
module.exports = {
  // 在开发环境下，建议把 devtool 的值设置为 'eval-source-map'
  // devtool: 'eval-source-map',
  // 在实际发布时，建议大家把 Source Map 关闭，或者将 devtool 的值设置为'nosourecs-source-map'
  // devtool: 'nosourecs-source-map',
  // mode 代表 webpack 运行的模式，可选值有两个 development 和 production
  mode: 'development',
  // entry: "指定要处理那个文件"
  // __dirname 表示当前文件所在的那一层目录
  entry: path.join(__dirname, './src/index.js'),
  // output: "指定生成的出口文件存放在哪里"
  output: {
    // 存放到目录
    path: path.join(__dirname, 'dist'),
    // 生成的文件名
    filename: 'js/bundle.js',
  },
  // 3. html-webpack-plugin插件的数组，将来 webpack 在运行时，会加载并调用这些插件
  plugins: [htmlPlugin, new CleanWebpackPlugin()],
  devServer: {
    // 首次打包成功后，默认自动打开浏览器。
    open: true,
    // 在 http 协议中，如果端口号是80，则可以省略。
    port: 80,
    // 指运行的主机地址
    host: '127.0.0.1'
  },
  // webpack 处理非 xxx.js 后缀结尾的文件。例如：css 和 less 文件
  module: {
    rules: [
      // 定义了不同模块对应的 loader
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // 处理 less 文件的 loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // 处理图片文件的 loader。在配置 loader 时候多个参数之间用 & 符号进行分隔。
      { test: /\.jpg|png|gif|ico$/, use: 'url-loader?limit=500&outputPath=images' },
      // 使用 babel-loader 处理 JS 高级语法，（一定要利用 exclude 排除 node_modules 因为第三方文件不需要关心）
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  resolve: {
    alias: {
      // 告诉程序员代码中的 @ 符号表示 src 这一层目录
      '@': path.join(__dirname, './src/')
    }
  }
}
