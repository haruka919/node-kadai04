const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const config = require('./../config.js')
const { validationResult } = require('express-validator/check')

require('dotenv').config()
const env = process.env

const knex = require('knex')({
  client: env.DB_CONNECTION,
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DATABASE,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    charset: 'utf8',
  },
})

const BookShelf = require('bookshelf')(knex)

// データベースにあるテーブルを扱うためのオブジェクトを作成
const User = BookShelf.Model.extend({
  hasTimestamps: true,
  tableName: 'users',
})

module.exports = {
  // ユーザー登録画面表示
  create(req, res) {
    const data = {
      title: '会員登録',
      form: {
        name: '',
        email: '',
      },
      content: '',
    }
    res.render('./register.ejs', data)
  },

  // ユーザー登録の送信処理
  store(req, res) {
    // バリデーションの結果にエラーがあるかのチェック
    const errors = validationResult(req)
    // バリデーション失敗
    if (!errors.isEmpty()) {
      let content = '<ul class="error">'
      const result_arr = errors.array() // エラー内容が配列に返る
      for (let n in result_arr) {
        content += '<li>' + result_arr[n].msg + '</li>'
      }
      content += '</ul>'
      const data = {
        title: '会員登録',
        content: content,
        form: req.body, // nameとemailは入力したものを返す
      }
      res.render('register', data)
    } else {
      new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
        .save()
        .then((user) => {
          const payload = {
            id: user.attributes.id,
          }

          // JWT発行
          const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)

          // クッキーに(トークンと名前を)保存
          res.cookie('token', escape(token), {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
          })
          res.cookie('name', user.attributes.name, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
          })

          res.redirect('/')
        })
        .catch(() => {
          res.redirect('/register')
        })
    }
  },

  // ログイン処理
  login(req, res) {
    User.query({ where: { email: req.body.email }, andWhere: { password: req.body.password } })
      .fetch({ require: false }) // falseに設定しておくと見つからない場合はnullが返ってくる
      .then((user) => {
        if (!user) res.redirect('/login')
        const payload = {
          id: user.attributes.id,
        }
        const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)

        // クッキーに(トークンと名前を)保存
        res.cookie('token', escape(token), {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })
        res.cookie('name', user.attributes.name, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })

        // みんなの投稿ページにリダイレクト
        res.redirect('/')
      })
      .catch(() => {
        res.redirect('/login')
      })
  },
}
