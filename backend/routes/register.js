const express = require('express')
const router = express.Router()
const register = require('../controllers/registerController')

router.get('/', register.show);

module.exports = router