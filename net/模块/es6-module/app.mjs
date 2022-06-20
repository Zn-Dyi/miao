// import export 语句只能出现模块代码的顶层
// 导入的模块的名字必须是静态的，即后面的字符串不是能计算出来看的
// 通过导入语句创建的变量是不可赋值的，相当于const声明变量
// 具名导入创建的变量跟其在原模块中的变量是一起绑定的，原模块中的变量值该了，
// 导入变量的名字也会改

// 导入具名导出时需要用对应的导出名称
import { add, mul, PI } from './my-math.mjs'

// 具名导出并重命名
import { sub as subtract, div as division } from './my-math.mjs'

// 导出所有导出时名字随意
// 其中默认导出在default属性上，具名导出在对应的属性名上
// 该变量指向一个模块对象
import * as MyMath from '.my-math.mjs'

// 导出默认导出时名字随意
import xxxx from './my-math.mjs'

// 默认导出与具名导出一起
// import yyy, { add, mul } from './my-math.mjs'


console.log(MyMath)

setTimeout(() => {
  console.log(PI)
}, 1000)

console.log(MyMath.sub(5, MyMath.div(6, 3)))

console.log(division(2, add(5,MyMath.PI)))


