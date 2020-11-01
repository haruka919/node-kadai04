const express = require('express')
const router = express.Router()
const register = require('../controllers/registerController')

router.get('/', register.show);

// ユーザー登録の送信処理
router.post('/', register.create);

module.exports = router