
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


  flatten: function (array) {
    // return array.reduc((res, item) => {
    //   return res.concat(item)
    // }, [])

    // reduce 版
    return array.reduce((res, item) => {
      if (Array.isArray(item)) {
        res.push(...item)
      } else {
        res.push(item)
      }
      return res
    }, [])

    // 常规版
    // var res = []
    // for (var i = 0; i < array.length; i++) {
    //   var item = array[i]
    //   if (Array.isArray(item)) {
    //     res.push(...item)
    //     // for (var j = 0; j < item.length; j++) {
    //     //   res.push(item[j])
    //     // }
    //   } else {
    //     res.push(item)
    //   }
    // }
    // return res
  },


  flattenDeep: function (array) {
    return array.reduce((res, item) => {
      if (Array.isArray(item)) {
        return res.concat(flattenDeep(item))
      }
      return res.concat(item)
    }, [])

    // 常规版
    // var res = []
    // for (var i = 0; i < array.length; i++) {
    //   var item = array[i]
    //   if (Array.isArray(item)) {
    //     item = flattenDeep(item )
    //     res.push(...item)
    //     // for (var j = 0; j < item.length; j++) {
    //     //   res.push(item[j])
    //     // }
    //   } else {
    //     res.push(item)
    //   }
    // }
    // return res
  },


  flattenDepth: function (array, depth = 1) {
    if (depth == 0) {
      return array.slice()
    }

    return array.reduce((res, item) => {
      if (Array.isArray(item)) {
        return res.concat(flattenDepth(item, depth - 1))
      }
      return res.concat(item)
    }, [])
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
    var res = '' + array[0]
    for (var i = 1; i < array.length; i++) {
      res += '' + separator + array[i]
    }
    return res
  },


  last: function (array) {
    return array[array.length - 1]
  },


  lastlndexOf: function (array, value, fromIndex = array.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  },


  reverse: function (array) {
    var i = 0
    var j = array.length - 1
    if (j > i) {
      var temp = array[i]
      array[i] = array[j]
      array[j] = temp
      i++
      j--
    }
    return array
  },


  uniq: function (array) {
    var res = []
    var map = {}
    for (var i = 0; i < array.length; i++) {
      if (array[i] in map) {
        map[array[i]]++
      } else {
        map[array[i]] = 1
        res.push(array[i])
      }
    }
    return res
  },


  uniqBy: function (array, iteratee = _.identity) {
    var res = []
    var map = {}
    for (var i = 0; i < array.length; i++) {
      if (array[i] in map) {
        map[array[i]]++
      } else {
        map[array[i]] = 1
        res.push(array[i])
      }
    }
    return res
  },


  // without: function (array, ...values) {
  //   var res = []
  //   for (var i = 0; i < array.length; i++) {
  //     if (values.indexOf((array[i])) == -1) {
  //       res.push(array[i])
  //     }
  //   }
  //   return res
  // },
  // without: function (array, values) {
  //   var res = []
  //   var temp = []
  //   temp.push(...arguments)
  //   for (var i = 0; i < array.length; i++) {
  //     if (array[i] in temp) {
  //       continue
  //     } else {
  //       res.push(array[i])
  //     }
  //   }
  //   return res
  // },
  without: function (array, values) {
    var obj = {}
    var res = []
    for (var j = 1; j < arguments.length; j++) {
      obj[arguments[j]] = 0
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i] in obj) { // 数组的值在对象中没找到对应的下标位置，就push到res数组中。
        continue
      } else {
        res.push(array[i])
      }
    }
    return res
  },


  zip: function (arrays) {
    var a = []
    var b = []
    a.push(...arguments)
    var min = a[0].length
    for (i in a) {
      if (a[i].length < min) {
        min = i.length
      }
    }
    for (var i = 0; i < min; i++) {
      var a1 = []
      for (var j = 0; j < a.length; j++) {
        a1.push(a[j][i])
      }
      b.push(a1)
    }
    return b
  },


  add: function (augend, addend) {
    return augend + addend
  },


  ceil: function (number, precision = 0) {

  },


  max: function (array) {
    if (array.length == 0) {
      return undefined
    }
    var max = 0
    for (var i = 0; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i]
      }
    }
    return max
  },


  maxBy: function (array, iteratee = _identity) {

  },


  sum: function (array) {
    return array.reduce((sum, item) => {
      return sum + item
    }, 0)

    //   var sum = 0
    //   for (var i = 0; i < array.length; i++) {
    //     sum += array[i]
    //   }
    //   return sum
  },


  sumBy: function (array, iteratee = _.identity) {

  },


  repeat: function (string = '', n = 1) {
    var res = ''
    if (n == 0) {
      return res
    }
    for (var i = 0; i < n; i++) {
      res += string
    }
    return res
  }
}
