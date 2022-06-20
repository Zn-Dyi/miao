import { log } from './common.js'

log(111)

function sub(a, b) {
  return a - b
}
export function add(a, b) {
  return a + b
}

var a = 8

export { sub, add, a, log}

export default { x: 1, y: 2 }
