const express = require('express')
const router = express.Router()

router.post('/', function (req, res) {
  res.clearCookie('token')
  req.decoded = null
  res.redirect('/login')
})

module.exports = router
