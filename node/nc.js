const net = require('net')

var domain = process.argv[2]
var port = Number(process.argv[3])

const conn = net.connect(port, domain)

process.stdin.pipe(conn).pipe(process.stdout)
