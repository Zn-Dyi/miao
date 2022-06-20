const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const uuid = require('uuid').v4
const svgCaptcha = require('svg-captcha')
const md5 = require('md5')

const port = 8080

const app = express()

app.locals.pretty = true // 让pug输出格式化过的html代码
app.set('views', __dirname + '/templates') // 设置模板文件夹为'/templates'，不设置默认用views文件夹


const users = JSON.parse(fs.readFileSync('./users.json'))
const posts = JSON.parse(fs.readFileSync('./posts.json'))
const comments = JSON.parse(fs.readFileSync('./comments.json'))



app.use((req, res, next) => {
  console.log(req.match, req.url)
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('qwer'))
app.use(express.static(__dirname + '/assets'))

// app.use((req, res, next) => {
//   console.log(req.cookies, req.signedCookies)
//   next()
// })


// 相当于服务器的cookie
var sessionObjects = {
}
app.use(function sessionMW(req, res, next) {
  if (!req.cookies.sessionId) {
    var sessionId = uuid()
    res.cookie('sessionId', sessionId)
    req.cookies.sessionId = sessionId
  }

  req.session = sessionObjects[req.cookies.sessionId] ?? (sessionObjects[req.cookies.sessionId] = {})

  next()
})


app.get('/', (req, res, next) => {
  res.type('html')
  res.render('index.pug', {
    posts: posts,
    loginName: req.signedCookies.loginName
  })
})

app.get('/add-post', (req, res, next) => {
  res.type('html')
  res.render('add-post.pug', {
    loginName: req.signedCookies.loginName
  })
})

app.post('/add-post', (req, res, next) => {
  res.type('html')
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
  var post = posts.find(it => it.id == postId)
  res.type('html')
  if (post) {
    const thisComments = comments.filter(it => it.postId == postId)
    res.render('post.pug', {
      post: post,
      comments: thisComments,
      loginName: req.signedCookies.loginName,
    })
  } else {
    res.render('404.pug')
  }
})

app.delete('/post/:id', (req, res, next) => {
  if (req.signedCookies.loginName) {
    var post = posts.find(it => it.id == req.params.id)
    if (post) {
      if (post.owner == req.signedCookies.loginName) {
        var idx = posts.findIndex(it => it.id == req.params.id)
        posts.splice(idx, 1)
        fs.writeFileSync('./posts.json', JSON.stringify(posts, null, 2))
        res.end('ok')
      }
    } else {
      res.end('post not exists')
    }
  } else {
    res.end('not login')
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
    res.redirect(`/post/${postId}`)
  } else {
    res.end('请登录在查看')
  }

  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2))
})
app.delete('./comment/:commentId', (req, res, next) => {
  if (req.signedCookies.loginName) {
    var comment = comments.find(it => it.id == req.params.commentId)
    if (comment) {
      if (comment.owner  == req.signedCookies.loginName) {

      }
    }
  }
})

app.get('/user/:userName', (req, res, next) => {
  var userName = req.params.userName
  var user = users.find(it => it.name == userName)

  res.type('html')

  if (user) {
    res.write(`
      <img class="avatar" src="xxxxx">
      <h2>${userName}</h2>
      <hr>
      <h3>Ta发过的帖子</h3>
    `)

    var thisPosts = posts.filter(it => it.owner == userName)

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
  res.render('register.pug')
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
    password: md5(regInfo.password),
  }
  users.push(user)
  res.end('注册成功, go <a href="/login">登录</a>')
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))// null, 2 可以在序列化时有个缩进
})

app.get('/login', (req, res, next) => {
  var returnUrl = req.get('referer') ?? '/'

  res.type('html')
  res.render('login.pug', {
    returnUrl: returnUrl,
    session: req.session,
  })

  req.session.刚刚登录失败的原因 = null
})

app.get('/captcha', (req, res, next) => {
  var captcha = svgCaptcha.create({
    color: true,
    noise: 13,
  })

  req.session.captcha = captcha.text

  res.type('svg').end(captcha.data)
  console.log('req.session', req.session)
})

app.post('/login', (req, res, next) => {
  var loginInfo = req.body
  var returnUrl = req.query.next ?? '/' // req.query可以读到url中的querystring
  console.log(3333333)
  if (req.session.loginFailCount >= 3 && req.body.captcha !== req.session.captcha) {
    console.log(2222222)
    req.session.刚刚登录失败的原因 = '验证码错误'
    res.redirect(returnUrl) // express有'back'方法可以直接返回上一级
    return
  }
  var target = users.find(it => it.name == loginInfo.name && it.password == loginInfo.password)

  if (target) {
    res.cookie('loginName', target.name, {
      maxAge: 86400000,
      signed: true,
    })
    req.session.loginFailCount = 0
    res.redirect('/')
  } else {
    console.log(44444444)
    req.session.loginFailCount = (req.session.loginFailCount ?? 0) + 1
    req.session.刚刚登录失败的原因 = '用户名或密码错误'
    res.redirect('/login')
  }
})
app.get('/logout', (req, res, next) => {
  var returnUrl = req.get('referer') ?? '/'
  res.clearCookie('loginName')
  res.redirect(returnUrl)
})


app.listen(port, () => {
  console.log('listening on', port)
})
