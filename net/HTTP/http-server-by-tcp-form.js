var net = require('net') // 获取tcp模块
var fs = require('fs') // 文件系统模块

var server = net.createServer() // 创建tcp服务器

// 所有人的留言
var messages = loadMessages()

function loadMessages() {
  try {
    var str = fs.readFileSync('/messages.json')
    return JSON.parse(str)
  } catch (e) {
    return []
  }

}
function saveMessages() {
  var str = JSON.stringify(messages)
  fs.writeFileSync('./messages.json', str)
}

// 当服务器接收一个客户连接是，浏览器没发一个请求，这个函数都会出发一次
server.on('connection', (conn) => {

  // 连接上收到数据时
  conn.on('data', data => {
    var str = data.toString()
    var [header, body] = str.split('\r\n\r\n')
    var [head, ...headers] = header.split('\r\n')
    var [method, url] = head.split(' ')
    // 解构
    console.log(method, url, body)
    //         请求方法  URL  请求体

    if (url == '/liuyan' && method == 'POST') {
      var info = parseQueryString(body) // 解析出留言信息
      info.time = new Date().toString() // 给留言信息加上时间
      messages.push(info)
      saveMessages()

      conn.write('HTTP/1.1 301 Found\r\n')
      conn.write('Location: /\r\n')
      conn.write('\r\n')
      conn.end()
    }

    if (url == '/') {
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type: text/html\r\n')
      conn.write('\r\n')
      conn.write(`<meta charset="UTF-8">`)
      conn.write(`
        <h1>留言板 ${new Date()} </h1>
        <form method="GET" action="/liuyan">
          <fieldset>
            <legend>留言</legend>

            Name: <br><input type="text" name="name"/><br>
            Message: <br><textarea cols="50" rows="5" name="message"></textarea><br>
            <button>留言</button>

          </fieldset>
        </form>

      `)

      for (var i = messages.length - 1; i >= 0; i--) {
        var msg = messages[i]

        conn.write(`
          <div>
            <h3>${escape(msg.name)}</h3>
            <p>${escape(msg.message)}</p>
            @ ${msg.time}
          </div>
        `)
      }
      conn.end()
    }

    if (url == '/favicon.ico0') {
      var img = fs.readFileSync('./a.png')

      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type: image/png\r\n')
      conn.write('\r\n')

      conn.write(img)
      conn.end()
    }

  })

})

var port = 8000

// 让服务端开始监听
sever.listen(port, () => {
  // 监听成功后输出
  console.log('listening on port', port)
})

var querystring = require('querystring')
// name=zhangshan&message=hello
// {name:'zhangshan', message: 'hello', age:'28'}

function parseQueryString(str) {
  return querystring.parse(str)
  // var pairs = str.split('&')
  // var obj = {}
  // for (var pair of pairs) {
  //   var [key, val] = pair.split('=')
  //   obj[key] = decodeURIComponent(val)
  // }
  // return obj
}

function escape(s) {
  var ans = ""
  for (var i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "&":
        ans += "&amp;";
        break;
      case "<":
        ans += "&lt;";
        break;
      case ">":
        ans += "&gt;";
        break;
      case "\"":
        ans += "&quot:";
        break;
      case "\'":
        ans += "&apos;";
        break;
      default:
        ans += s[i];
    }
  }
  return ans
}
