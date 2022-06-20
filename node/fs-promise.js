const fs = require('fs')
const fsp = fs.promises


// 将一个promise风格的函数转换为一个回调风格的函数
function callbackify(promiseStyleFunc) {
  return function (...args) {
    var callback = args.pop() // 回调函数
    promiseStyleFunc(...args).then(result => {
      callback(null, result)
    }, err => {
      callback(err)
    })
  }
}

writeFile = callbackify(writeFileP)
writeFile('a.txt', 'abcde', (err, result) => {

})



document.addEventListener('clikc', function () {

}, true)


document.addEventListener('clikc', function () {

}, {
  capture: true,
  passive: true,
})





async function main() {
  try {
    var data = await fsp.readFile('mod2.html', 'utf8')
    console.log(data)
    await fsp.writeFile('mod.html', data)
  } catch (e) {
    console.error(e)
  }
}

main()


file descriptor
fd
file handler
文件描述符
其实就是一个整数
可以为操作系统当前打开的文件编号
通过open(path)函数得到一个文件描述符

var fd = open('./a.txt')

readFile
writeFile()


read(fd,)


var path = require('path').win32
var path = require('path').posix




function getFileList(dirPath) {



  return [] /// 包虑入口文件内的所有文件的绝对路径
}

同步版本
回调版本
promise版本
async function版本
