

const fs = require('fs')

var src = process.argv[2]
var dest = process.argv[3]



var readable = fs.createReadStream(src, {
  highWaterMark: 1048576
})
var writeable = fs.createWriteStream(dest)
readable.pipe(writeable)



readable.__proto__.pipe = function (writeable) {
  this.on('data', data => {
    // 可写流的write方法返回的真假代表是否可以继续写入，也即缓冲是否（未被占满）
    var canContinue = writeable.write(data)
    if (!canContinue) {
      this.pause() // 让可读流暂停从源头读取数据并触发data事件
    }
  })

  // 可写流将自身缓冲区的数据消耗完了
  writeable.on('drain', () => {
    this.resume()
  })

  this.on('end', () => {
    writeable.end()
  })
  return writeable

}



// readable.on('data', (data) => {
//   // 可写流的write方法返回的真假代表是否可以继续写入，也即缓冲是否（未被占满）
//   var canContinue = writeable.write(data)
//   if (!canContinue) {
//     readable.pause() // 让刻度流暂停源头读取数据并出发data事件
//   }
// })

// // 可写流将自身缓冲区的数据消耗完了
// writeable.on('drain', () => {
//   readable.resume()
// })

// readable.on('end', () => {
//   writeable.end()
//   console.log('文件全都读完了')
// })



