
  // fs.readFile('a.txt', () => { })
// const fs = require('fs')

// fs.readFile('xxxx', () => {
//   setTimeout(() => {
//     console.log(2)
//   })

//   setImmediate(() => {z``
//     console.log(1)
//   })
// })
// var start = Date.now()
// var c = 0

// setImmediate(function f() {
//   c++
//   if (Date.now() - start < 1000) {
//     setImmediate(f, 0)
//   } else {
//     console.log(c)
//   }
// }, 0)

// setImmediate(() => {
//   console.log(1)
//   process.nextTick(function f()  {
//     // console.log(3)
//     debugger;
//     process.nextTick(f)
//   })
// })
// setImmediate(() => {
//   console.log(2)
// })

// var start = Date.now()
// while (Date.now() - start < 10) {

// }

  // process.nextTick(() => {
  //   console.log(3)
  // })

  // Promise.resolve().then(() => {
  //   console.log(4)
  // })

  // console.log(5)

  // 事件循环 event loop




// function nextTick(f) {
//   nextTickQueue.push(f)
// }

// const nextTickQueue = []

// nextTick(function f() {
//     nextTick(f)
// })
// //==============================
// function flushNextTickQueue() {
//   while (nextTickQueue.length) {
//     task = nextTickQueue.shift()
//     task()
//   }
// }

// flushNextTickQueue()


// process.nextTick(() => {
//   console.log(1)
// })

setImmediate(() => {
  console.log(1)
  Promise.resolve().then(function f() {
    // console.log(2)
    Promise.resolve().then(f)
  })
})
setImmediate(() => {
  console.log(3)
})
