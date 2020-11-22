const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')

router.get('/', function (req, res) {
  res.render('./login.ejs')
})
// ユーザー登録の送信処理
router.post('/', user.login)

module.exports = router
