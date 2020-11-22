const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')

// ユーザー登録画面
router.get('/', user.create)

// 外部ファイル化したバリデーション読み込み
const RegistValidator = require('../validators/RegistValidator')

// ユーザー登録の送信処理
router.post('/', RegistValidator, user.store)

module.exports = router
