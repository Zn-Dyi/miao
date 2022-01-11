var zn_dyi = {
  chunk: function (array, size) {
    var len = array.length
    var res = []
    for (var i = 0; i < array.length; i += size) {
      var temp = []
      var n = Math.min(i + size, len)
      for (var j = i; j < n; j++) {
        temp.push(array[j])
      }
      res.push(temp)
    }
    return res
  },


  compact: function (array) {
    var res = []
    var ary = array
    for (var i = 0; i < array.length; i++) {
      if (ary[i]) {
        res.push(ary[i])
      }
    }
    return res
  },


  difference: function (array, value) {
    var res = []
    for (var i = 0; i < array.length; i++) {
      if (array[i] in value) {
        res.push(array[i])
      }
    }
    return res
  },


  drop: function (array, n) {
    var res = []
    var ary = array
    if (n == 0) {
      return ary
    }
    if (!n) {
      n = 1
    }
    for (var i = n; i < ary.length; i++) {
      res.push(ary[i])
    }
    return res
  },


  dropRight: function (array, n) {
    var res = []
    var ary = array
    var len = ary.length
    if (n == 0) {
      return ary
    }
    if (!n) {
      n = 1
    }
    if (n >= len) {
      return res
    }
    for (var i = 0; i < len - n; i++) {
      res.push(ary[i])
    }
    return res
  },


  dropRightWhile: function () {

  },


  dropWhile: function () {

  },


  fill: function (array, value, start = 0, end = array.length) {
    for (var i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },


  findlndex: function (array, predicate = _.identity, fromIndex = 0) {

  },


  findLastlndex: function (array, predicate = _.identity, fromIndex = 0) {

  },


  flatten: function () {

  },


  flattenDeep: function () {

  },


  flattenDepth: function () {

  },


  fromPairs: function () {

  },


  head: function (array) {
    var ary = array
    if (!ary) {
      return undefined
    } else {
      return ary[0]
    }
  },


  indexOf: function (array, value, fromIndex = 0) {
    for (var i = fromIndex; i < array.length; i++) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  },


  initial: function (array) {
    var res = []
    for (var i = 0; i < array.length - 1; i++) {
      res.push(array[i])
    }
    return res
  },


  join: function (array, separator = ',') {
    var res = '' + array[i]
    for (var i = 1; i < array.length; i++) {
      res = res + separator + array[i]
    }
    return res
  },
}
