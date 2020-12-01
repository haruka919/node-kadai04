const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')

// ユーザー登録画面
router.get('/', user.create)

// ユーザー登録の送信処理
router.post('/', user.store)

module.exports = router
