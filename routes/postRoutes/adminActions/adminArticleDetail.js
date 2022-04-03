const express = require('express')
const router = express.Router()
const query = require('../../../utils/queryInterfaces')
const resBody = require('../../../utils/responseTemplate')
const consoleOutput = require('../../../utils/consoleOutput')
const {getMarkdown} = require('../../../utils/mdFileHandler')

router.use((req,res) => {
  query({
    name: 'adminArticleDetail',
    params: {
      article_id: req.body.article_id
    }
  }).then(resDetail => {
    consoleOutput("SQL",resDetail)
    if (resDetail.length === 0) {
      res.send(resBody(false,"ENOMATCH"))
    } else {
      getMarkdown(resDetail[0].post_time,resDetail[0].author,resDetail[0].title).then(resD => {
        res.send(resBody(true,"SUCC",resDetail[0],{name:"detail",value:resD},"从文件读取的数据"))
      }).catch(err => {
        query({
          name: 'adminArticleFromSql',
          params: {
            article_id: req.body.article_id
          }
        }).then(resSQL => {
          res.send(resBody(true,"SUCC",resSQL[0],resSQL[0].detail,"来自数据库的数据"))
        }).catch(err => {
          consoleOutput("SQL",err)
          res.send(resBody(false,"ESQL"))
        })
      })
    }
  }).catch(err => {
    consoleOutput("SQL",err)
    res.send(resBody(false,"ESQL",null,null,err.message))
  })
})

module.exports = router
