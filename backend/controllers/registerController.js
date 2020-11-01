const mysql = require('mysql')
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
  show (req, res) {
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
  create (req, res) {
    new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .save()
    .then(() => {
      res.redirect('/');
    });
  }
}