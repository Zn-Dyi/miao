const {
  Readable,
  Writable,
  Duplex,
  Transform,
} = require('stream')
const fs = require('fs')

function getABCStream() {
  var ascii = 97
  return new Readable({
    highWaterMark: 5,

    read() {
      console.log('调度系统在调用read方法准备数据')
      var char = String.fromCharCode(ascii)
      setTimeout(() => {
        this.push(char)
      }, 500)
      ascii++
      if (ascii == 123) {
        this.push(null)
      }
    }
  })
}



function createReadStream(filePath) {
  var fd = fs.openSync(filePath)
  var pos = 0
  var length = 256

  return new Readable({
    read() {
      var buf = Buffer.alloc(length)

      fs.read(fd, buf, 0, length, pos, (err, bytesRead) => {
        pos += length
        if (bytesRead == length) {
          this.push(buf)
        } else if (bytesRead == 0) {
          this.push(null)
        } else {
          this.push(buf.slice(0, bytesRead))
          this.push(null)
        }
      })
    },

    destroy() {
      fs.close(fd)
    }
  })
}

function createWriteStream(filePath) {
  var fd = fs.openSync(filePath, 'w+')
  var pos = 0
  return new Writable({
    write(chunk, encoding, done) {
      fs.write(fd, chunk, 0, chunk.length, pos, (err) => {
        pos += chunk.length
        done()
      })
    },
    final() {
      fs.closeSync(filePath)
    }
  })
}



function createToUpperCaseStream() {
  return Transform({
    transform(chunk, encoding, callback) {
      var result = chunk.toString().toUpperCase()
      setTimeout(() => {
        callback(null, result)
      }, 10)
    }
  })
}



createReadStream('./package-lock.json')
.pipe(createToUpperCaseStream())
.pipe(createWriteStream('./package-lock-upper.json'))



// readable.read(5)

// readable.on('data', (data) => {
//   console.log(data.toString())
// })


function pipeline(...streams) {
  for (var i = 0; i < streams.length - 1; i++) {
    streams[i].pipe(streams[i + 1])
  }
}

function compose(...streams) {
  var first = streams.at(0)
  var last = streams.at(-1)

  pipeline(...streams)

  return new Duplex({
    write(chunk, encoding, callback) {
      first.write(chunk, callback)
    },
    read() {
      return last.read()
    }
  })
}


function createReadableFrom(iterable) {
  return new Readable({
    read() {
      var generated = iterable.next()
      if (!generated.done) {
        this.push(generated.value)
      } else {
        this.push(null)
      }
    }
  })
}


Readable.prototype.map = function (mapper) {
  // 'this' is current stream
  var readable = this

  readable.on('end', () => {
    result.push(null)
  })

  var result = new Readable({
    read() {
      readable.once('readable', async () => {
        this.push(await mapper(readable.read()))
      })
    }
  })

  return result
}

Readable.prototype.toArray = function () {
  return new Promise((resolve) => {
    var result = []
    this.on('data', (data) => {
      result.push(data)
    })
    this.on('end', () => {
      resolve(result)
    })
  })
}
