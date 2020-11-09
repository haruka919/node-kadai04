const express = require('express')
const router = express.Router()

router.post('/', function (req, res) {
  // tokenとnameを削除したいがクリアできない
  res.clearCookie('token');
  res.clearCookie('name');
  res.redirect('/login');
})

module.exports = router