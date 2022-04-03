const express = require('express')
const router = express.Router()

const articleList = require('./postRoutes/articleList')

router.post('/',articleList)

module.exports = router
