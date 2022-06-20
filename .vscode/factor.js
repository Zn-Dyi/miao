

function MyFactor(Number) {
  var n = Number
  var result = []

  if (n <= 0) {
    return
  }

  var factor = 2
  while (n > 1) {
    if (n % factor == 0) {
      result.push(factor)
      n = n / factor

    } else {
      factor = factor + 1
    }
  }
  return result

}

// process.argv 用来获取传递给脚本的命令行参数
//  $ node    showargv.js              one    --and    two
// ['node', 'home/marijn/showargv.js, 'one', '--and', 'two']
//  命令      文件所在路径               命令行传递的参数

let Number = process.argv[2]
let a = process.argv[3]
let b = process.argv[4]


console.log(MyFactor(Number))
console.log(MyFactor(a))
console.log(MyFactor(b))

