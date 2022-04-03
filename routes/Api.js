const express = require('express')
const router = express.Router()

// const getApi = require('./getApi')
const articleList = require('./postRoutes/articleList')
const articleDetail = require('./postRoutes/articleDetail')

const adminLogin = require('./postRoutes/adminLogin')
const adminDashboard = require('./postRoutes/adminActions/adminDashboard')
const adminArticleList = require('./postRoutes/adminActions/adminArticleList')
const adminArticleDetail = require('./postRoutes/adminActions/adminArticleDetail')
const adminArticlePost = require('./postRoutes/adminActions/adminArticlePost')
const adminArticleEdit = require('./postRoutes/adminActions/adminArticleEdit')

router.post('/articleList',articleList)
router.post('/articleDetail',articleDetail)

router.post('/adminLogin',adminLogin)
router.post('/adminDashboard',adminDashboard)
router.post('/adminArticleList',adminArticleList)
router.post('/adminArticleDetail',adminArticleDetail)
router.post('/adminArticlePost',adminArticlePost)
router.post('/adminArticleEdit',adminArticleEdit)

module.exports = router
