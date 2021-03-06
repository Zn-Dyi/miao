const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('process');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  var port = Math.random() > 0.5 ? 7000 : 8000
  http.createServer((req, res) => {
    console.log(process.pid)
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(port);

  require('./app.js')

  console.log(`Worker ${process.pid} started`);
}
