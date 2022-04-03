const express = require('express')
const router = express.Router()
const query = require('../../../utils/queryInterfaces')
const resBody = require('../../../utils/responseTemplate')
const store = require('../../../utils/store')
const jwt = require('jsonwebtoken')
const standardTime = require('../../../utils/standardTime')
const {writeNew} = require("../../../utils/mdFileHandler");
const consoleOutput = require("../../../utils/consoleOutput");

router.use((req,res) => {
  let params = {
    author: usernameParse(req.headers.authorization),
    post_time: standardTime(),
    brief_intro: req.body.brief_intro,
    detail: req.body.detail,
    title: req.body.title,
    last_modified: standardTime(),
    hide_content: 0
  }
  writeNew(params.post_time,params.title,params.author,params.detail).then(resWrite => {
    query({
      name: 'adminArticlePost',
      params
    }).then(resInfo => {
      consoleOutput("SQL",resInfo)
      if (resInfo.affectedRows === 1) {
        res.send(resBody(true,"SUCC"))
      } else {
        res.send(resBody(false,"ESQL",null,null,"数据库不知道咋了，没有成功写入，很罕见的情况，再试一次"))
      }
    }).catch(err => {
      consoleOutput("SQL",err)
      res.send(resBody(false,"ESQL",null,null,err.message))
    })
  }).catch(err => {
    consoleOutput("FS",err)
    res.send(resBody(false,"EIOERR",null,null,"IO ERROR"))
  })
})

/**
 * 解析前端传递Token的内容
 * @param userToken {string} 前端传递的Token
 * @return {string} 用户名，解析错误则为“未知”
 */
const usernameParse = userToken=> {
  userToken = userToken.replace('Bearer ','') // 去掉express-jwt加的头
  return jwt.verify(userToken, store.state.PRIVATE_KEY,(err,data) => {
    if (err) return "未知"
    return data.payLoad.username
  })
}

module.exports = router
