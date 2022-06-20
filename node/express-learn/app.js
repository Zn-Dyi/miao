const express = require('express')
// const http = require('http')


const app = express()


app.use(function (req, res, next) {
  console.log(req.method, req.url, req.xhr)
  next()
})

app.use(express.static('./assets'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/aa.exe', (req, res, next) => {
  res.download(__dirname + '/assets/imgs/a.jpg')
  // res.sendFile()
})

app.use((req, res, next) => {
  console.log(req.body)
  res.end('hello')
})

const port = 8080

app.listen(port, () => {
  console.log('listening', port)
})
