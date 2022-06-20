const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const uuid = require('uuid').v4

const port = 8080

const app = express()

const users = JSON.parse(fs.readFileSync('./users.json'))
const posts = JSON.parse(fs.readFileSync('./posts.json'))
const comments = JSON.parse(fs.readFileSync('./comments.json'))



app.use((req, res, next) => {
  console.log(req.match, req.url)
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('qwer'))

app.use((req, res, next) => {
  console.log(req.cookies, req.signedCookies)
  next()
})

app.get('/', (req, res, next) => {
  res.type('html')
  if (req.signedCookies.loginName) {
    res.write(`
      <div> <a href="/">首页</a></div>
      <div> welcome, ${req.signedCookies.loginName}</div>
      <div><a href="/add-post">Add Post</a></div>
      <div> <a href="/login">登录</a></div>
    `)
  } else {
    res.write(`
    <div><a href="/">首页</a></div>
    <div><a href="/register">注册</a></div>
    <div><a href="/login">登录</a></div>
  `)
  }

  res.write('<hr>')
  for (var post of posts) {
    res.write(`
      <div>
        <a href="/post/${post.id}">${post.title}</a>
      </div>
    `)
  }
  res.end()
})

app.get('/add-post', (req, res, next) => {
  req.type('html')
  req.end(`
    <h1>发帖</h1>
    <form action="/add-post" method="post">
      Title: <br>
      <input type="text" name="title"><br>
      Content: <br>
      <textarea name="content" cols="30" rows="8"></textarea><br>

      <button>发帖</button>
    </form>
  `)
})

app.post('/add-post', (req, res, next) => {
  if (req.signedCookies.loginName) {
    var postInfo = req.body

    var post = {
      id: uuid(),
      title: postInfo.title,
      content: postInfo.content,
      timestamp: new Date().toISOString(),
      owner: req.signedCookies.loginName,
    }

    posts.push(post)
    fs.writeFileSync('./posts.json', JSON.stringify(posts, null, 2))
    res.end('发帖成功')
  } else {
    res.end('只有登录才能发布')
  }
})

app.get('/post/:id', (req, res, next) => {
  var postId = req.params.id
  var post = posts.find(it = it.id == postId)
  res.type('html')
  if (post) {
    res.write(`
      <h1>${post.title}</h1>
      <p>${post.content}</p>
      <span>${post.timestamp}</span>
      <a href="/user/${post.owner}">@${post.owner}</a>
    `)

    res.write('<hr>')

    const thisComments = comments.filter(it => it.postId == postId)

    for (let comment of thisComments) {
      res.write(`
        <p>${comment.content} <a href="/user/${comment.owner}">@${comment.owner}</a></p>
      `)
    }

    res.write('<hr>')

    if (req.signedCookies.loginName) {
      res.write(`
        <p>评论试试</p>
        <form action="/comment/${req.params.id} method="post">
          <textarea name="content"></textarea>
          <button>提交</button>
        </form>
      `)
    } else {
      res.write('想评论？请<a href="/login">登录</a>')
    }
  } else {
    res.end('没有找到这个帖子')
  }
})

app.post('/comment/:postId', (req, res, next) => {
  var commentInfo = req.body
  var postId = req.params.postId

  if (req.signedCookies.loginName) {
    var comment = {
      id: uuid(),
      content: commentInfo.content,
      timestamp: new Date().toISOString(),
      owner: req.signedCookies.loginName,
      postId: postId,
    }
    comments.push(comment)
    redirect(`post/${postId}`)
    fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2))
  } else {
    res.end('请登录在查看')
  }
})

app.get('/user/:userName', (req, res, next) => {
  var userName = req.params.userName
  var user = user.find(it => it.name == userName)

  res.type('html')

  if (user) {
    res.write(`
      <img class="avatar" src="xxxxx">
      <h2>${userName}</h2>
      <hr>
      <h3>Ta发过的帖子</h3>
    `)

    var thisPost = posts.filter(it => it.owner == userName)

    for (var post of thisPosts) {
      res.write(`
        <div><a href="/post/${post.id}">${post.title}</a></div>
      `)
    }

    res.write('<h2>Ta回复的帖子</h2>')
    var thisComments = comments.filter(it => it.owner == userName)

    for (var comment of thisComments) {
      res.write(`
        <div>
          <a href="/post/${comment.postId}">帖子标题</a>
          <br>
          ${comment.content}
          <hr>
        </div>
      `)
    }

    res.end()
  } else {
    res.type('html')
    res.end('查无此人')
  }
})

app.get('/register', (req, res, next) => {
  res.type('html')
  res.end(`
    <h1>注册</h1>
    <form action="/register" method="post">
      <div>Name: <input type="text" name="name"></div>
      <div>Email: <input type="email" name="email"></div>
      <div>Password: <input type="password" name="password"></div>
      <div>Password: <input type="password" name="password1"></div>

      <button>提交</button>
    </form>
  `)
})
app.post('/register', (req, res, next) => {
  res.type('html')
  var regInfo = req.body

  if (regInfo.password !== regInfo.password1) {
    res.end('两次密码不同')
    return
  }

  if (users.some(it => it.name == regInfo.name)) {
    res.end('用户名已存在')
    return
  }

  if (users.some(it => it.email == regInfo.email)) {
    res.end('邮箱已存在')
    return
  }

  var user = {
    name: regInfo.name,
    email: regInfo.email,
    password: regInfo.password,
  }
  users.push(user)
  res.end('注册成功, go <a href="/login">登录</a>')
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))// null, 2 可以在序列化时有个缩进
})

app.use('/login', (req, res, next) => {
  res.type('html')
  res.end(`
    <h1>登录</h1>
    <form action="/login" method="post">
      <div>Name: <input type="text" name="name"></div>
      <div>Password: <input type="password" name="password"></div>

      <button>登录</button>
    </form>
  `)
})
app.post('/login', (req, res, next) => {
  var loginInfo = req.body
  var target = users.find(it => it.name == loginInfo.name && it.password == loginInfo.password)

  if (target) {
    res.end('登录成功')
  } else {
    res.end('用户名或密码错误')
  }
})

app.listen(port, () => {
  console.log('listening on', port)
})
