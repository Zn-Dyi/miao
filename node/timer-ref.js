
var id = setInterval(() => {
  console.log(1)
}, 1000)
id.unref()

const net = require('net')
const server = net.createServer()
server.listen(80, () => {

})

server.unref()
