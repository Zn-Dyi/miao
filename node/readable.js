const fs = require('fs')

var readable = fs.createReadStream('./package-lock.json')

readable.on('data', (data) => {
  console.log(Date.now(), '---------------------------------------')
  console.log(data.toString().length)
})

readable.on('end', () => {
  console.log('文件全都读完了')
})

console.log(1)
