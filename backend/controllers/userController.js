const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const config = require('./../config.js');
const { cookie } = require('express-validator');

const knex = require('knex')({
  client: 'mysql',       // 使用するデータベースを指定
  connection: {
    host: 'mysql',
    user: 'root',
    password: 'secret',
    database: 'express',
    charset: 'utf8',
    port: 3306
  },
});

const BookShelf = require('bookshelf')(knex);

// データベースにあるテーブルを扱うためのオブジェクトを作成
const User = BookShelf.Model.extend({
  hasTimestamps: true,
  tableName: 'users',
});

module.exports = {
  // ユーザー登録画面表示
  create (req, res) {
    const data = {
      title: '会員登録',
      form: {
        name: '',
        email: '',
      }
    }
    res.render('./register.ejs', data)
  },


  // ユーザー登録の送信処理
  store (req, res) {
    new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .save()
    .then((user) => {

      const payload = {
        id: user.attributes.id
      }

      // JWT発行
      const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);

      // クッキーに(トークンと名前を)保存
      res.cookie('token', escape(token), {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
      });
      res.cookie('name', user.attributes.name, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
      });

      res.redirect('/');
    });
  }
}