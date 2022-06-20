

var parse = require('./parse-json-in-worker')

parse('{"a":1,"b":[1,2,3,4,5,6]}').then(x => {
  console.log(x)
})
