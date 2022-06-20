// sock.address() // 获取自己的地址

// server = net.createSever()

// server.on('connection', conn => {
//   console.log(conn.remoteAddress, conn.remotePort, 'comes in')

//   conn.write('hello')

//   conn.on('data', d => {
//     console.log(conn.remoteAddress, d)
//   })
// })

var net = require('net')
const { kill } = require('process')

var server = net.createServer()

server.on('connection', conn => {
  console.log(conn.remoteAddress, conn.remotePort, 'come in')

  conn.write('将会发过来的数据转成大写发回')

  conn.on('data', data => {
    conn.write(data.toString().toUpperCase())
  })

  conn.on('error', () => {})
})

server.listen(55888, () => { // 开始监听
  console.log('监听成功')
})

server.close() // 停止监听

// 以上是服务器

var conn = net.connect(55888, '10.3.3.3')

conn.on('data', data => {
  console.log(data.toString())
})

conn.write('aaaaaa')


