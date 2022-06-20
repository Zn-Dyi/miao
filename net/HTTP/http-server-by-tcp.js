


var net = require('net') // 获取tcp模块

var server = net.createServer() // 创建tcp服务器

// 当服务器接收一个客户连接是
server.on('connection', (conn) => {

  // 连接上收到数据时
  conn.on('data', data => {
    console.log(data.toString())
  })

  conn.write('HTTP/1.1 200 OK\r\n')
  conn.write('Content-Type: text/html\r\n')
  conn.write('\r\n')
  conn.write(`<meta charset="UTF-8">`)
  conn.write(`<h1>It works! ${new Date()} </h1>\r\n`)
  conn.end()
})

var port = 8000

// 让服务端开始监听
sever.listen(port, () => {
  // 监听成功后输出
  console.log('listening on port', port)
})



