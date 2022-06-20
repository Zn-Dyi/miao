const fs = require('fs')




fs.readFile(  __dirname +  '/mod.html', (err, data) => {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
})

fs.writeFile('ccd.txt', 'FooBar', (err) => {

})
