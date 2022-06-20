const fs = require('fs')

var src = process.argv[2]
var dest = process.argv[3]

console.log(process.pid)

var readable = fs.createReadStream(src, {
  highWaterMark: 1048576
})



var writeable = fs.createWriteStream(dest)

readable.pipe(writeable).pipe(xxxx).pipe(wefowef)



readable.on('data', data => {
  // 可写流的write方法返回的真假代表是否可以继续写入，也即缓冲是否[未被占满]
  var canContinue = writeable.write(data)
  if (!canContinue) {
    readable.pause() // 让可读流暂停从源头读取数据并触发data事件
  }
})

// 可写流将自身缓冲区的数据消耗完了
writeable.on('drain', () => {
  readable.resume()
})

readable.on('end', () => {
  writeable.end()
})










const stream = require('stream');
const Writable = stream.Writable

class MyWritable extends Writable {
  constructor({ highWaterMark, ...options }) {
    super({ highWaterMark });
    // ...
  }
}


// stream consumers

// stream implementers



// 做为可写流的提供者：
// 是数据的消费者
// 生产者或者流的使用者将数据wirte进可写流
// 可写流需要将数据以某种形式消耗掉

// 做为可读流的提供者：
// 是数据的生产者
// 数据的消费者或者可读的流的使用者通过read或者data事件来消费数据
// 而可读流的提供者需要从某处得原始数据并提供给消费者




// readable = new Readable({
//   // 流的提供者实现这个函数
//   // 由流调度系统调用
//   highWaterMark: 1000,
//   read: function f1() { }
//   _read: function f1() { this.push('data') }
// })

// readable._read === f1

// readable.read() // 给到流的使用者调用，由调度系统实现
// readable.on('data') // 给到流的使用者调用，由调度系统并触发


// class MyReadable extends Readable {
//   constructor(a,b) {


//   }
//   _read() {

//   }
// }
