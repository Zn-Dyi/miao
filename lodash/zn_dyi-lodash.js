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


  concat: function (array, [values]) {

  }
}
