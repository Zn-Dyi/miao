const fs = require('fs')


fs.readFile('nc.js', () => {
  debugger
  console.log(1)
})

fs.readFile('mod3.html', () => {
  debugger
  console.log(1)
})

setImmediate(() => {
  var start = Date.now()
  while (Date.now() - start < 1000) {

  }
})
