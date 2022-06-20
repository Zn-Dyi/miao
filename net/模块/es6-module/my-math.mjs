
export function add(a, b) {
  return a + b
}

// 具名导出可以声明的同时导出
export var PI = 3.14


setTimeout(() => {
  PI = 9
}, 5000)

var a = 8
// 默认导出不带名字，只能导出值
export default a

export function mul(a, b) {
  return a * b
}

function div(a, b) {
  return a / b
}

function sub(a, b) {
  return a - b
}

// 具名导出不在声明的同时导出， 则导出时要加{}
export { div, sub}

