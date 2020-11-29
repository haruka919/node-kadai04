const db = require('../models/index.js')

module.exports = {
  // 記事一覧画面
  index(req, res) {
    db.Article.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          required: true,
        },
      ],
    }).then((article) => {
      const data = {
        articles: article,
      }
      res.render('./index.ejs', data)
    })
  },

  // 記事登録画面表示
  create(req, res) {
    res.render('./create.ejs')
  },

  // 記事登録の送信処理
  store(req, res, next) {
    const form = {
      userId: req.decoded.id,
      title: req.body.title,
      content: req.body.content,
    }
    db.sequelize
      .sync()
      .then(() => db.Article.create(form))
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => {
        next(err)
      })
  },

  // 記事編集画面表示
  edit(req, res) {
    db.Article.findByPk(req.params.id)
    .then(article => {
      console.log(article)
      const data = {
        article: article
      }
      res.render('./edit.ejs', data)
    })
  },

  // 記事更新処理
  update(req, res, next) {
    db.sequelize
      .sync()
      .then(() => db.Article.update({
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {id: req.params.id}
      }))
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => {
        next(err)
      })
  },
}
