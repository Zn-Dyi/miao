const fs = require('fs')
const fsp = fs.promises
const path = require('path')

const cwd = process.cwd() // 当前工作目录

function getFileListSync(dir) {
  var result = []

  var entries = fs.readdirSync(dir, { withFileTypes: true })

  for (var entry of entries) {
    if (entry.isFile()) {
      result.push(path.join(cwd, dir, entry.name))
    } else if (entry.isDirectory()) {
      result.push(...getFileListSync(path.join(dir, entry.name)))
    }
  }

  return result
}

// console.time('sync')
// console.log(getFileListSync('./node_modules').length)
// console.timeEnd('sync')



async function getFileList(dir) {
  var result = []

  var entries = await fsp.readdir(dir, { withFileTypes: true })

  for (var entry of entries) {
    var entryPath = path.join(dir, entry.name)
    if (entry.isFile()) {
      result.push(entryPath)
    } else if (entry.isDirectory()) {
      var resultOfChild = await getFileList(entryPath)
      result.push(...resultOfChild)
    }
  }

  return result
}

// console.time('async func')
// getFileList('./node_modules').then(result => {
//   console.log(result.length)
//   console.timeEnd('async func')
// })

async function forEach(ary, iterator) {
  for (var i = 0; i < ary.length; i++) {
    await iterator(ary[i], i, ary)
  }
}

async function getFileList2(dir) {
  var result = []

  var entries = await fsp.readdir(dir, { withFileTypes: true })

  await forEach(entries, async entry => {
    var entryPath = path.join(dir, entry.name)
    if (entry.isFile()) {
      result.push(entryPath)
    } else if (entry.isDirectory()) {
      var resultOfChild = await getFileList2(entryPath)
      result.push(...resultOfChild)
    }
  })

  return result
}



function getFileListCallback(dir, callback) {
  var result = []

  fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
    var i = entries.filter(it => it.isDirectory()).length
    for (let idx = 0; idx < entries.length; idx++) {
      let entry = entries[idx]
      var entryPath = path.join(dir, entry.name)
      if (entry.isFile()) {
        result[idx] = entryPath
      } else if (entry.isDirectory()) {
        getFileListCallback(entryPath, list => {
          // result.push(...list)
          result[idx] = list
          i--
          if (i == 0) {
            callback(result.flat())
          }
        })
      }
    }

    if (i == 0) {
      callback(result.flat())
    }
  })
}


// console.time('callback')
// getFileListCallback('./node_modules', function (result) {
//   console.log(result.length)
//   console.timeEnd('callback')
// })


function getFileListP(dir) {
  return fsp.readdir(dir, { withFileTypes: true }).then(entries => {
    var result = []

    for (var entry of entries) {
      var entryPath = path.join(dir, entry.name)
      if (entry.isFile()) {
        result.push(entryPath)
      } else if (entry.isDirectory()) {
        getFileListP(entryPath).then(list => {
          result.push(...list)
        })
      }
    }

    return result
  })
}

// getFileListP('./node_modules').then(result => {
//   console.log(result)

//   setTimeout(() => {
//     console.log(result)
//   }, 5000)
// })


function getFileListP2(dir) {
  return fsp.readdir(dir, { withFileTypes: true }).then(entries => {
    return Promise.all(entries.map(entry => {
      var entryPath = path.join(dir, entry.name)
      if (entry.isFile()) {
        return entryPath
      } else if (entry.isDirectory()) {
        return getFileListP2(entryPath)
      }
    }))
  }).then(result => {
    return result.flat()
  })
}

// console.time('promise')
// getFileListP2('./node_modules').then(result => {
//   console.log(result.length)
//   console.timeEnd('promise')
// })



async function getFileListP3(dir) {
  var entries = await fsp.readdir(dir, { withFileTypes: true })

  var result = await Promise.all(entries.map(entry => {
    var entryPath = path.join(dir, entry.name)
    if (entry.isFile()) {
      return entryPath
    } else if (entry.isDirectory()) {
      return getFileListP3(entryPath)
    }
  }))

  return result.flat()
}

console.time('promise + await')
getFileListP2('./node_modules').then(result => {
  console.log(result.length)
  console.timeEnd('promise + await')
})
