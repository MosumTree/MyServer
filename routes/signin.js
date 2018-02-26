const sha1 = require('sha1')
const express = require('express')
const router = express.Router()
// const UserModel = require('../models/users')
// const checkNotLogin = require('../middlewares/check').checkNotLogin

//GET /signin 登陆页
router.get('/', function (req, res, next) {
    res.render('signin')
})
module.exports = router