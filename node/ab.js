process.stdin.on('data', data => {

  var number = Number(data.toString())

  if (number % 2 == 0) {
  console.log('even')
  } else {
  console.log('odd')
  }
  process.exit()


})

process.title = '88888'
