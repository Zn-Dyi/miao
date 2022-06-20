var http = require("http"), fs = require("fs");

// httpd, nginx, tomcat, apache

var baseDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd()

var methods = Object.create(null);

http.createServer(function (request, response) {
  console.log(request.method, request.url)

  function respond(code, body, type) {
    if (!type) type = "text/plain";
    response.writeHead(code, { "Content-Type": type });
    if (body && body.pipe) 
      body.pipe(response);
    else
      response.end(body);
  }
  if (request.method in methods)
    methods[request.method](urlToPath(request.url),
      respond, request);
  else
    respond(405, "Method " + request.method +
      " not allowed.");
}).listen(8000, '127.0.0.1', () => {
  console.log('listening on port', 8000)
});

function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  return baseDir + '/' + decodeURIComponent(path);
}

methods.GET = function (path, respond) {
  fs.stat(path, function (error, stats) {
    if (error && error.code == "ENOENT")
      respond(404, "File not found");
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      fs.readdir(path, {withFileTypes: true},function (error, entries) {
        if (error)
          respond(500, error.toString());
        else
          respond(200, JSON.stringify(entries.map(entry => {
            return {
              name: entry.name,
              isFile: entry.isFile(),
            }
          })));
      });
    else
      respond(200, fs.createReadStream(path),
        require("mime").getType(path));
  });
};



methods.DELETE = function (path, respond) {
  fs.stat(path, function (error, stats) {
    if (error && error.code == "ENOENT")
      respond(204);
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      fs.rmdir(path, respondErrorOrNothing(respond));
    else
      fs.unlink(path, respondErrorOrNothing(respond));
  });
};

function respondErrorOrNothing(respond) {
  return function (error) {
    if (error)
      respond(500, error.toString());
    else
      respond(204);
  };
}

methods.PUT = function (path, respond, request) {
  var outStream = fs.createWriteStream(path);
  outStream.on("error", function (error) {
    respond(500, error.toString());
  });
  outStream.on("finish", function () {
    respond(204);
  });
  request.pipe(outStream);
};

methods.MKCOL = function (path, respond, request) {
  fs.stat(path, (err, stat) => {
    if (err) { // 路径不存在才会报错，正好是可以创建的
      fs.mkdir(path, (err) => {
        if (err) {
          respond(500, err.toString())
        } else {
          respond(204)
        }
      })
    } else {
      if (stat.isDirectory()) {
        respond(204)
      } else {
        respond(400, 'File exists!')
      }
    }
  })
}
