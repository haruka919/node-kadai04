const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('./create.ejs')
})

module.exports = router
