const net = require('net')

const server = net.createServer()


server.on('connection', conn => {
  conn.on('data', data => {
    console.log(data.toString())

    conn.write('HTTP/1.1 200 OKKKKKKKKKKKKKK\r\n')
    conn.write('Content-Type: text/html\r\n')
    conn.write('Content-Length: 20\r\n')
    conn.write('aaa: bbbbb\r\n')
    conn.write(`Date: ${new Date()}\r\n`)
    conn.write('\r\n')
    conn.write('<h1>Hello world</h1>')
    conn.end()
  })
})


server.listen(8989, () => {
  console.log('ok')
})
