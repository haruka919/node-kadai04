const jwt = require('jsonwebtoken')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const db = require('../models/index.js')

module.exports = {
  // ユーザー登録画面表示
  create(req, res) {
    const data = {
      title: '会員登録',
      form: new db.User(),
      err: null,
    }
    res.render('./register.ejs', data)
  },

  // ユーザー登録の送信処理
  store(req, res, next) {
    const form = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
    }
    db.sequelize
      .sync()
      .then(() => db.User.create(form))
      .then((user) => {
        const payload = {
          id: user.id,
        }
        const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)

        // クッキーに(トークンと名前)を保存
        res.cookie('token', escape(token), {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })
        res.cookie('name', user.name, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })
        res.redirect('/')
      })
      .catch((err) => {
        console.log(err)
        const data = {
          title: '会員登録',
          form: form,
          err: err,
        }
        res.render('./register.ejs', data)
      })
  },

  // ログイン処理
  login(req, res, next) {
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user || !user.validPassword(req.body.password)) {
          throw new Error('Emailまたはパスワードが正しくありません')
        }
        const payload = {
          id: user.id,
        }
        const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)
        // クッキーに(トークンと名前)を保存
        res.cookie('token', escape(token), {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })
        res.cookie('name', user.name, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })
        // みんなの投稿ページにリダイレクト
        res.redirect('/')
      })
      .catch((err) => {
        next(err)
      })
  },
}
