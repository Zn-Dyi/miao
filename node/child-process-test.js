const child_process = require('child_process')
const { chdir } = require('process')


// child_process.exec('md5sum common.js', (err, stdout, stderr) => {
//   console.log(stdout)
// })

// child_process.execFile(
//   'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
//   ['--user-data-dir=c:/foo', '--disable-web-security'],
//   (err, stdout, stderr) => {

//   }
// )

// const child = child_process.spawn('ls', ['-lha'])


// // 子进程的stdout对于其自身来说是一个可写流
// // 对于父进程来说是一个可读流
// // 当子进程往其stdout中wirte时
// // 父进程中的对象上则会触发data事件
// child.stdout.on('data', data => {
//   console.log(data.toString())
// })


const md5sum = child_process.spawn('md5sum')

md5sum.stdin.write('abcdefg')

md5sum.stdout.on('data', data => {
  console.log(  data.toString()  )
})
