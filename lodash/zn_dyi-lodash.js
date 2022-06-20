
var zn_dyi = (function () {
  // 把数组按size长度拆分
  function chunk(array, size) {
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
  }

  // 过滤出数组的假值，生成新数组返回真值
  function compact(array) {
    var res = []
    var ary = array
    for (var i = 0; i < array.length; i++) {
      if (ary[i]) {
        res.push(ary[i])
      }
    }
    return res
  }

  // 排除掉与value数组中相同的数值
  function difference(array, value) {
    var res = []
    var arr = []
    for (var key in arguments) {
      if (key == '0') {
        continue
      }
      arr.push(...arguments[key])
    }
    for (var item in array) {
      if (arr.includes(item)) {
        continue
      } else {
        res.push(item)
      }

    }
    return res
  }

  // 去除数组前面的n个元素
  function drop(array, n) {
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
  }

  // 去除数组后面的n个元素
  function dropRight(array, n) {
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
  }

  // 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。
  function fill(array, value, start = 0, end = array.length) {
    for (var i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }

  // 展平数组一次(减少一级嵌套深度)
  function flatten(array) {
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
  }

  // 展平数组成一维数组
  function flattenDeep(array) {
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
  }

  // 根据depth的值展平数组次数
  function flattenDepth(array, depth = 1) {
    if (depth == 0) {
      return array.slice()
    }

    return array.reduce((res, item) => {
      if (Array.isArray(item)) {
        return res.concat(flattenDepth(item, depth - 1))
      }
      return res.concat(item)
    }, [])
  }

  // 获取数组第一个元素
  function head(array) {
    var ary = array
    if (!ary) {
      return undefined
    } else {
      return ary[0]
    }
  }

  // 从fromIndex位置查找value在数组中的位置
  function indexOf(array, value, fromIndex = 0) {
    for (var i = fromIndex; i < array.length; i++) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  }

  // 去除数组中最后的一个元素
  function initial(array) {
    var res = []
    for (var i = 0; i < array.length - 1; i++) {
      res.push(array[i])
    }
    return res
  }

  // 求给定数组的交集
  function intersection(...array) {
    var result = []
    for (var i = 0; i < array[0].leghth; i++) {
      for (var j = 0; i < array.length; j++) {
        if (!(array[j].includes(array[0][i]))) {
          break
        }
      }
      if (j == array.length) {
        result.push(array[0][i])
      }
      return result
    }
  }


  function intersectionBy(...array) {
    var predicate = iteratee(array.pop())
    var ary1 = array[0]
    var ary2 = array[1]
    var res = []
    for (var i = 0; i < ary1.length; i++) {
      for (var j = 0; j < ary2.length; j++) {
        if (predicate(ary1[i]) === predicate(ary2[j])) {
          res.push(array[i])
          break
        }
      }
    }
    return res
  }


  function intersectionWith(array1, array2, comparor) {
    var result = []
    for (var i = 0; i < array1.length; i++) {
      for (var j = 0; j < array2.length; j++) {
        if (comparor(array1[i], array2[j])) {
          result.push(array1[i])
        }
      }
    }
    return result
  }

  // 将数组转为字符串用separator分隔
  function join(array, separator = ',') {
    var res = '' + array[0]
    for (var i = 1; i < array.length; i++) {
      res += '' + separator + array[i]
    }
    return res
  }

  // 获取数组最后一项
  function last(array) {
    return array[array.length - 1]
  }

  // 从后向前fromIndex位置查找value在数组中的位置
  function lastlndexOf(array, value, fromIndex = array.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  }

  // 移除数组中与给定值相同的元素
  function pull(array, ...values) {
    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < array.length; j++) {
        if (array[j] == values[i]) {
          array.splice(j, 1)
        }
      }
    }
    return array
  }


  // 反转数组
  function reverse(array) {
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
  }


  // 保留数组中第一次出现的值
  function uniq(array) {
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
  }



  function uniqBy(array, iteratee = _.identity) {
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
  }


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

  function without(array, values) {
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
  }


  function zip(arrays) {
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
  }


  function add(augend, addend) {
    return augend + addend
  }


  function max(array) {
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
  }


  function sum(array) {
    return array.reduce((sum, item) => {
      return sum + item
    }, 0)

    //   var sum = 0
    //   for (var i = 0; i < array.length; i++) {
    //     sum += array[i]
    //   }
    //   return sum
  }


  function repeat(string = '', n = 1) {
    var res = ''
    if (n == 0) {
      return res
    }
    for (var i = 0; i < n; i++) {
      res += string
    }
    return res
  }


  function sortedIndex(array, values) {
    for (var i = 0; i < array.length; i++) {
      if (values > array[i]) {
        return i + 1
      }
    }
  }


  //求并集
  function union(arrays) {
    var res = []
    for (var ary of arguments) {
      for (var i = 0; i < ary.length; i++) {
        if (res.indexOf(ary[i]) == -1) {
          res.push(ary[i])
        }
      }
    }
    return res
  }


  function unionBy(...array) {
    var predicate = array.pop()
    predicate = iteratee(predicate)
    var ary = []
    var res = []
    for (var idx of array) {
      for (var j = 0; j < idx.length; j++) {
        var init = idx[j]
        if (!ary.includes(predicate(idx[j]))) {
          ary.push(predicate(idx[j]))
          res.push(init)
        }
      }
    }
    return res
  }



  function toPath(path) {
    if (typeof path == 'string') {
      return path.split('[')
        .flatMap(it => it.split(']'))
        .flatMap(it => it.split('.'))
        .flatMap(it => it)
    }
    return path
  }


  // function get(object, path) {
  //   path = toPath(path)
  //   if (object == null) {
  //     return object
  //   }
  //   if (path.length == 0) {
  //     return object
  //   }
  //   return get(object[0], path.slice(1))
  // }
  function get(object, path) {
    var name = toPath(path)
    return name.reduce((object, name) => {
      return object ?? objcet[name]
    }, object)
  }


  function property(name) {
    return function (obj) {
      return get(obj, name)
    }
  }


  function matches(target) {
    return function (obj) {
      for (var key in target) {
        if (obj[key] !== target[key]) {
          return false
        }
      }
      return true
    }
  }


  function isMatch(obj, src) {
    for (var key in src) {
      if (src[key] && typeof src[key] === 'object') {
        if (!isMatch(obj[key], src[key])) {
          return false
        }
      } else {
        if (src[key] !== obj[key]) {
          return false
        }
      }
    }
    return true
  }


  function memoize(func, resolver = it => it) {
    var map = new memoize.Cache()
    function memoized(...args) {
      var key = resolver(...args)

      if (map.has(key)) {
        return map.get(key)
      }
      var result = func(...args)
      map.set(key, result)
      return result
    }

    memoized.cache = map

    return memoized
  }
  memoize.Cache = Map


  function xor(...arrays) {
    var res = []
    var temp = []
    for (var arrays of arguments) {
      for (var i = 0; i < arrays.length; i++) {
        if (!res.includes(arrays[i])) {
          res.push(arrays[i])
        } else {
          temp.push(arrays[i])
        }
      }
    }
    pull(res, ...temp)
    return res
  }


  function countBy(collection, predicate) {
    var predicate = iteratee(predicate)
    var map = {}
    for (var i = 0; i < collection.length; i++) {
      var p = predicate(collection[i])
      if (p in map) {
        map[p]++
      } else {
        map[p] = 1
      }
    }
    return map
  }


  // 都是真值返回真
  function every(collection, predicate) {
    var predicate = iteratee(predicate)
    var flag = false
    for (var i = 0; i < collection.length; i++) {
      if (predicate(collection[i])) {
        flag = true
      } else {
        return false
      }
    }
    return flag
  }


  function filter(collection, predicate) {
    var predicate = iteratee(predicate)
    var result = []
    for (var i = 0; i < collection.length; i++) {
      if (predicate(collection[i], i)) {
        result.push(collection[i])
      }
    }
    return result
  }


  function find(collection, predicate, fromIndex = 0) {
    var predicate = iteratee(predicate)
    var res = []
    for (var i = fromIndex; i < collection.length; i++) {
      if (predicate(collection[i])) {
        res.push(collection[i])
      }
    }
    return res
  }


  // function flatMap(collection, predicate) {
  //   var result = []
  //   var predicate = iteratee(predicate)
  //   for (var item of collection) {
  //     result.push(...predicate(item))
  //   }
  //   return result
  // }
  function flatMap(collection, predicate) {
    var predicate = iteratee(predicate)
    var result = []
    for (var i = 0; i < collection.length; i++) {
      var item = predicate(collection[i], i, collection)
      result.push(...item)
    }
    return result
  }


  function flatMapDeep(collection, predicate) {
    var result = []
    var predicate = iteratee(predicate)
    for (var i = 0; i < collection.length; i++) {
      var item = predicate(collection[i], i, collection)
      result.push(...flatMapDeep(item))
    }
    return result
  }

  function flatMapDepth(collection, predicate) {
    var result = []
    var predicate = iteratee(predicate)
    for (var i = 0; i < collection.length; i++) {
      var item = predicate(collection[i], i, collection)
      result.push(...flatMapDepth(item))
    }
    return result
  }


  function forEach(collection, predicate) {
    var predicate = iteratee(predicate)
    for (var key in collection) {
      predicate(collection[key], key, collection)
    }
    return collection
  }


  function groupBy(collection, predicate) {
    var obj = {}
    var predicate = iteratee(predicate)
    for (let item of collection) {
      let key = predicate(item)
      if (!(key in obj)) {
        obj[key] = [item]
      } else {
        obj[key].push(item)
      }
    }
    return obj
  }


  function keyBy(collection, predicate) {
    var obj = {}
    var predicate = iteratee(predicate)
    for (let item in collection) {
      let key = predicate(collection[item])
      obj[key] = collection[item]
    }
    return obj
  }


  function sample(collection) {
    return collection[Math.floor(Math.random() * collection.length)]
  }


  function shuffle(collection) {
    var result = []
    var count = 0
    while (count < collection.length) {
      var val = collection[Math.floor(Math.random() * collection.length)]
      if (result.includes(val)) {
        continue
      }
      result.push(val)
      count++
    }
    return result
  }


  function size(collection) {
    if (Array.isArray(collection) || typeof collection === 'string') {
      return collection.length
    } else if (typeof collection === 'object') {
      return Object.keys(collection).length
    }
  }


  function some(collection, predicate) {
    var predicate = iteratee(predicate)
    for (var key in collection) {
      if (predicate(collection[key], key, collection)) {
        return true
      }
    }
    return false
  }


  function sortBy(collection, predicate) {
    var pre = iteratee(predicate.pop())
    for (var i = 1; i < collection.length; i++) {
      var t = collection[i]
      for (var j = i - 1; j >= 0; j--) {
        if (pre(collection[j]) > pre(t)) {
          collection[j + 1] = collection[j]
        } else {2
          break
        }
      }
      collection[j + 1] = t
      if (predicate.length) {
        sortBy(collection, predicate)
      }
    }
    return collection
  }









  function iteratee(predicate) {
    if (typeof predicate == "function") {
      return predicate
    }
    if (typeof predicate == "string") {
      return function (obj) {
        return obj[predicate]
      }
    }
    if (Array.isArray(predicate)) {
      return (obj) => obj[predicate[0]] === predicate[1]
    }
    if (typeof predicate == "object") {
      return (obj) => {
        for (var item in predicate) {
          if (obj[item] == undefined || obj[item] !== predicate[item])
            return false
        }
        return true
      }
    }
  }


  return {

    chunk: chunk,
    compact: compact,
    difference: difference,
    drop: drop,
    dropRight: dropRight,
    fill: fill,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    head: head,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
    intersectionBy: intersectionBy,
    intersectionWith: intersectionWith,
    join: join,
    last: last,
    lastlndexOf: lastlndexOf,
    pull: pull,
    reverse: reverse,
    uniq: uniq,
    uniqBy: uniqBy,
    without: without,
    zip: zip,
    add: add,
    max: max,
    sum: sum,
    repeat: repeat,
    sortedIndex: sortedIndex,
    union: union,
    unionBy: unionBy,
    toPath: toPath,
    get: get,
    property: property,
    matches: matches,
    isMatch: isMatch,
    xor: xor,
    countBy: countBy,
    every: every,
    filter: filter,
    find: find,
    flatMap: flatMap,
    flatMapDeep: flatMapDeep,
    flatMapDepth: flatMapDepth,
    forEach: forEach,
    groupBy: groupBy,
    keyBy: keyBy,
    sample: sample,
    shuffle: shuffle,
    size: size,
    some: some,
    sortBy: sortBy,



  }
})()

