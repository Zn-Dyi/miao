const repl = require('repl')
const net = require('net')

var dict = {
  cat: '猫',
  dog: '狗',
  pig: '猪',
}

var server = net.createServer(conn => {

  console.log('有人来查词了')

  var pl = repl.start({
    input: conn,
    output: conn,
    prompt: '> ',
    eval: function (cmd, ctx, file, cb) {
      var word = cmd.trim()
      var define = dict[word]

      if (!define) {
        cb(null, '查无此词')
      } else {
        cb(null, define)
      }

    }
  })








  pl.on('error', () => {
    pl.close()
  })







  conn.on('error',() => {})


})

server.listen(8899, () => {
  console.log(8899)
})
