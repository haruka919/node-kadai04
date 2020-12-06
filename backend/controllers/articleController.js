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
          include: [
            {
              model: db.Favorite,
            }
          ]
        },
        {
          model: db.Favorite,
        },
      ],
    }).then(async articles => {
      const myFavorites = await db.Favorite.findAll({
        attributes: ['articleId'],
        where: {
          userId: req.decoded.id
        }
      })
      let myFavoriteIds = []
      if (myFavorites) {
        myFavoriteIds = myFavorites.map(favorite => favorite.articleId)
      }
      const data = {
        articles,
        myFavoriteIds
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
      res.render('./edit.ejs', { article })
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

  // 記事削除処理
  delete(req, res, next) {
    db.Article.destroy({
      where: {id: req.params.id}
    })
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      next(err)
    })
  },

  // いいね処理
  async like(req, res, next) {
    const data = {
      articleId: req.body.articleId,
      userId: req.decoded.id
    }
    try {
      const favorite = await db.Favorite.findOne({
        where: data
      })
      // 既にお気に入りデータがあれば削除、なければ追加
      favorite ? await favorite.destroy() : await db.Favorite.create(data)

      // お気に入りの総数を返す
      const count = await db.Favorite.count({
        where: {
          articleId: req.body.articleId
        }
      })
      res.json(count)
    } catch (err) {
      next(err)
    }
  }
}
