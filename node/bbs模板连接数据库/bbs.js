const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const uuid = require('uuid').v4
const svgCaptcha = require('svg-captcha')
const md5 = require('md5')
const Database = require('better-sqlite3')
const formidable = require('formidable')
const { runInNewContext } = require('vm')

const db = new Database('./bbs.sqlite3')

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

app.use(express.urlencoded({ extended: true })) // 解析拓展url编码的请求体
app.use(cookieParser('qwer'))
app.use(express.static(__dirname + '/assets'))
app.use('/avatar', express.static(__dirname + '/uploads')) // 在/avatar头下寻找文件

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

const stmt = db.prepare('SELECT rowid as userId, name, email FROM users WHERE name = ?')
app.use(function (req, res, next) {
  if (req.signedCookies.loginName) {
    console.time('query login user')
    req.loginUser = stmt.get(req.signedCookies.loginName)
    console.timeEnd('query.login user')
  } else {
    req.loginUser = null
  }
  next()
})

app.get('/', (req, res, next) => {
  res.type('html')

  var posts = db.prepare(`
    SELECT posts.rowid AS postId, title, content, createdAt, userId, name
    FROM posts
    JOIN users
    ON posts.userId = users.rowid
    ORDER BY createdAt DESC
  `).all()

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
    var user = db.prepare('SELECT rowid as id, * FROM users WHERE name = ?').get(req.signedCookies.loginName)

    var post = {
      id: uuid(),
      title: postInfo.title,
      content: postInfo.content,
      timestamp: new Date().toISOString(),
      owner: req.signedCookies.loginName,
    }

    var info = db.prepare('INSERT INTO posts (title,content,createdAt,userId) VALUES ($title,$content,$createdAt,$userId)').run(post) // 创建post表

    res.redirect('/post/' + info.lastInsertRowid)
  } else {
    res.end('只有登录才能发布')
  }
})

app.get('/post/:id', (req, res, next) => {
  var postId = req.params.id

  var post = db.prepare(`
    SELECT posts.rowid AS postId, title, content, createdAt, userId, name
    FROM posts
    JOIN users
    ON posts.userId = users.rowid
    WHERE postsId = ?
  `).get(postId)

  if (post) {
    const comments = db.prepare(`
      SELECT comments.rowid AS commentId, content, createdAt, userId, name, postId
      FROM comments
      JOIN users
      ON userId = users.rowid
      WHERE postId = ?
    `)
    res.render('post.pug', {
      post: post,
      comments: comments,
      loginName: req.loginUser,
    })
  } else {
    res.render('404.pug')
  }
})

app.delete('/post/:id', (req, res, next) => {
  if (req.loginUser) {
    var post = db.prepare('SELECT * FROM posts WHERE rowid = ?').get(req.params.id)
    if (post) {
      if (post.userId == req.loginUser.userId) {
        db.prepare('SELECT FROM posts WHERE rowid = ?').run(req.params.id)
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

  var user = db.prepare('SELECT rowid AS userId, * FROM users WHERE name = ?').get(req.signedCookies.loginName)

  if (user) {
    var comment = {
      content: commentInfo.content,
      timestamp: new Date().toISOString(),
      userId: user.userId,
      postId: postId,
    }

    var insertInfo = db.prepare(`
      INSERT INTO comments
      VALUES ($content, $createdAt, $userId, $postId)
    `).run(comment)
    res.join({
      userId: user.userId,
      userName: user.name,
      commentId: insertInfo.lastInsertRowid
    })
  } else {
    res.json({
      error: 'please login'
    })
  }
  // fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2))
})
app.delete('./comment/:commentId', (req, res, next) => {
  if (req.loginUser) {
    var comment = db.prepare('SELECT * FROM comments WHERE rowid = ?').get(req.params.commentId)

    if (comment) {
      if (comment.userId == req.loginUser.userId) { // 评论是自己发的
        db.prepare('DELETE FROM comments WHERE rowid = ?').run(req.params.commentId)
        res.end('ok')
      } else { // 评论是发在自己的帖子下面
        var post = db.prepare('SELECT * FROM posts WHERE rowid = ?').get(comment.postId)
        if (post.userId == req.loginUser.userId) {
          db.prepare('DELETE FROM comments WHERE rowid = ?').run(req.params.commentId)
          res.end()
        } else {
          res.status(401).type('html').end('无权删除')
        }
      }
    } else {
      res.end('comment not found')
    }
  } else {
    res.end('not login')
  }
})

app.get('/user/:userId', (req, res, next) => {
  var userId = req.params.userId
  var user = db.prepare('SELECT rowid AS userId, * FROM users WHERE usersId = ?').get(userId)

  if (user) {

    var posts = db.prepare('SELECT * FROM posts JOIN users ON posts.userId = users.rowid WHERE userId = ?').all(userId)
    var comments = db.prepare('SELECT comments.content,comments.userId, comments.createdAt,postId,title,avatar FROM comments JOIN users ON comments.userId = users.rowid  JOIN posts ON comments.postId = posts.rowid WHERE comments.userId = ?').all(userId)

    res.render('user.pug', {
      user,
      posts,
      comments,
    })

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
  const form = formidable({
    multiples: true,
    uploadDir: './uploads',
    keepExtensions: true,
    maxFileSize: 2 * 1024 * 1024,
  });

  form.parse(req, (err, fields, files) => {
    var regInfo = fields
    console.log('注册信息', regInfo, files)

    if (regInfo.password !== regInfo.password1) {
      res.end('两次密码不同')
      return
    }

    var activiteId = uuid().slice(0, 8)

    var user = {
      name: regInfo.name,
      email: regInfo.email,
      password: md5(regInfo.password),
      avatar: files.avatar.newFilename,
      activiteId: activiteId,
    }

    try {
      db.prepare('INSERT INTO users (name,password,email) VALUES ($name,$password,$email)').run(user)
    } catch (e) {
      if (e.code == 'SQLITE_CONSTRAINT_UNIQUE') {
        res.type('html').end('用户名或电子邮箱冲突')
        return
      } else {
        throw e
      }
    }

    // 给用户发送激活连接
    // /account-activite/2198427394729384792348

    var activiteLink = `http://${req.get('host')}/account-activite/${activiteId}`

    // console.log(activiteLink)
    req.session.registingEmail = user.email

    res.type('html')
    res.type('html').end('注册成功，请至邮箱点击激活链接<a href="/resend" target="_blank">重新发送</a>' + activiteLink)
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))// null, 2 可以在序列化时有个缩进
  })
})

app.get('/resend', (req, res, next) => {
  var user = db.prepare('SELECT * FROM users WHERE email = ?').get(req.session.registingEmail)
  var activiteLink = `http://${req.get('host')}/account-activite/${user.activited}`

  console.log(activiteLink)

  res.type('html').end('发送ok，请检查邮箱。')
})

app.get('/account-activite/:activiteId', (req, res, next) => {
  var user = db.prepare('SELECT rowid, * FROM users WHERE activited = ?').get(req.params.activiteId)
  if (user) {
    db.prepare('UPDATE users SET activited = null WHERE rowid = ?').run(user.rowid)
    res.type('html').end('激活成功，去<a href="/login">登陆</a>')
  } else {
    res.type('html').end('您的账户已经激活成功，去<a href="/login">登陆</a>')
  }
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
  res.set('Cache-Control', 'no-store')

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

  req.session.captcha = null // 防止一个验证码用来登陆多次

  loginInfo.password = md5(loginInfo.password)

  var target = db.prepare('SELECT * FROM users WHERE name = $name AND password = $password').get(loginInfo)

  if (target) {
    if (target.activited) { // 非空说明未激活
      req.session.registingEmail = target.email
      res.type('html').end('您的账户未激活，请至邮箱点击激活链接<a href="/resend" target="_blank">重新发送</a>')
      return
    }
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
var forgetPasswordMap = {
  '3294foiwe023': { name: 'username', password: 'passsd', email: '' }
}

app.get('/forget-password', (req, res, next) => {
  res.render('forget-password.pug')
})
app.post('/forget-password', (req, res, next) => {
  var info = req.body
  var targetUser = db.prepare('SELECT * FROM users WHERE name = $name AND email = $email').get(info)
  if (targetUser) {
    var id = uuid()
    var link = `http://${req.get('host')}/forget-password${id}`

    forgetPasswordMap[id] = targetUser
    // sendEmail()

    // 发送后设置链接十分钟后过期
    setTimeout(() => {
      delete forgetPasswordMap[id]
    }, 60 * 1000 * 10)

    console.log(link)

    res.type('html').end('请到邮箱点击链接以修改密码')
  } else {
    res.type('html').end('没有这个用户')
  }
})

app.get('/forget-password/:id', (req, res, next) => {
  var user = forgetPasswordMap[req.params.id]
  if (user) {
    res.render('change-password.pug')
  } else {
    res.end('link has expired')
  }
})
app.post('/forget-password/:id', (req, res, next) => {
  var user = forgetPasswordMap[req.params.id]
  var info = req.body

  if (user) {
    db.prepare('UPDATE users SET password = ? WHERE name = ?').run(md5(info.password), user.name)
    delete forgetPasswordMap[req.params.id]
    res.end('ok go login')
  } else {
    res.end('link has expired')
  }
})

app.listen(port, () => {
  console.log('listening on', port)
})
