var zn_dyi = {
  chunk: function (array, size) {
    var len = array.length
    var res = []
    for (var i = 0; i < array.length; i++) {
      var temp = []
      for (var j = i; j < size; j++) {
        temp.push(array[j])
      }
      res.push(temp)
    }
    return res
  }
}
