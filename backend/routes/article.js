const express = require('express')
const router = express.Router()
const article = require('../controllers/articleController')

// 記事一覧画面
router.get('/', article.index)

// 記事登録画面
router.get('/article/create', article.create)

// 記事登録処理
router.post('/article/store', article.store)

// 記事編集画面
router.get('/article/edit/:id', article.edit)

// 記事更新処理
router.post('/article/update/:id', article.update)

module.exports = router
