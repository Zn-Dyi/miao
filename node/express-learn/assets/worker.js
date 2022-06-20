

addEventListener('message', function (e) {
  e.data.a = 8
  console.log('workder', e.data)
  // var board = solveSudoku()
  // postMessage(board)
})

// 随机生成数独的一个解，返回格子
var solveSudoku = function(board) {
  var board = Array(9).fill(0).map(it => '.........'.split(''))

  var start = Date.now()
  while (Date.now() - start < 2000) {}

  try {
      bt()
  } catch(e) {
      return board
  }

  function bt(start = 0) {
      if (start == 81) {
          throw 'ok'
      }
      for (var i = start; i < 81; i++) {
          var r = Math.floor(i / 9)
          var c = i % 9

          if (board[r][c] == '.') {
              for (var x = 1; x <= 9; x++) {
                  var y = Math.floor(Math.random() * 9) + 1
                  if (canPlace(r, c, '' + y)) {
                      board[r][c] = '' + y
                      bt(i + 1)
                      board[r][c] = '.'
                  }
              }
              return
          }
      }
      throw 'ok'
  }

  function canPlace(i, j, x) {
      if (board[i].includes(x)) {
          return false
      }
      if (board.map(row => row[j]).includes(x)) {
          return false
      }
      var row = Math.floor(i / 3)
      var col = Math.floor(j / 3)
      var card = []
      for (var k = row * 3; k < row * 3 + 3; k++) {
          for (var l = col * 3; l < col * 3 + 3; l++) {
              card.push(board[k][l])
          }
      }
      if (card.includes(x)) {
          return false
      }
      return true
  }
};

// for (var i = 0; i < 40; i++) {
//   deadLoop(1000)
//   console.log('from worker')
// }


// function deadLoop(duration) {
//   var start = Date.now()
//   while (Date.now() - start < duration) {

//   }
// }
