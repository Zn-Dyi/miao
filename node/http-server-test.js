const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  console.log(req.method, req.url, req.headers)

  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=UTF-8'
  })

  res.write('<h1>hello !</h1>')
  res.write('<h1>hello !</h1>')
  res.write('<h1>hello !</h1>' + new Date())
  res.write('<h1>hello !</h1>')
  res.write('<h1>hello !</h1>')
  res.write('<h1>hello !</h1>')
  res.write('<h1>hello !</h1>')
  res.end()
})

server.listen(8899, () => {
  console.log('listening 8899')
})
