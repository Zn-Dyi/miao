
const zlib = require('zlib')
const fs = require('fs')

const compressStream = zlib.createGzip()

fs.createReadStream('package-lock.json')
  .pipe(compressStream)
  .pipe(fs.createWriteStream('package-lock.json.gz'))
