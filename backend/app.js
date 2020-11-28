require('dotenv').config()
const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/config/config.json')[env]

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const registerRouter = require('./routes/register')
const createRouter = require('./routes/create')

// テンプレートエンジンの指定
app.set('view engine', 'ejs')

// リクエストヘッダに設定されたCookieを読み取るための設定
app.use(cookieParser())

// POSTデータを取得する時に必要
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// staticメソッドを利用し、指定ディレクトリ以下の静的ファイルを読み込む
app.use(express.static('public'))

const setUser = require('./routes/setUser')

// 認証
const auth = (req, res, next) => {
  // リクエストヘッダーからトークンの取得
  const key = 'token'
  let token = ''
  const cookie_data = req.headers.cookie != undefined ? req.headers.cookie : ''

  const data = cookie_data.split(';')
  for (let i in data) {
    if (data[i].trim().startsWith(key + '=')) {
      const result = data[i].trim().substring(key.length + 1)
      token = unescape(result)
    }
  }

  // トークンの検証
  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (!token || err) {
      // トークンが無い、または認証NGの場合はログインページにリダイレクト
      res.redirect('/login')
    } else {
      // 認証OKの場合
      req.decoded = decoded
      next()
    }
  })
}

// routeの設定
app.use('/login', setUser, loginRouter)
app.use('/logout', setUser, logoutRouter)
app.use('/register', setUser, registerRouter)
app.use('/create', setUser, auth, createRouter)
app.use('/', setUser, auth, indexRouter)

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err.message)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

module.exports = app
