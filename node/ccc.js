

var a = 8

var b = 8
a * b


var f = require('./foo.js')


==========/foo/foo.js:

function anonmyous(module, exports, require, __filename, __dirname) {
  require('ffss')


}
==========================
=======/bar/aaa.js

function anonmyous(module, exports, require, __filename, __dirname) {
  var a = require('./a.js')

  module.exports = function foo() {}
  module.exports.add = function add() {}
  module.exports.sub = function sub() {}

  exports
}
