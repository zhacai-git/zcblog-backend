const express = require('express')
const router = express.Router()
const query = require('../../../utils/queryInterfaces')
const {overwriteExist} = require('../../../utils/mdFileHandler')
const resBody = require('../../../utils/responseTemplate')
const standardTime = require('../../../utils/standardTime')
const consoleOutput = require("../../../utils/consoleOutput");

router.use((req,res) => {
  overwriteExist(req.body.article_id,req.body.title,req.body.detail).then(resS => {
    query({
      name: 'adminEditArticle',
      params: {
        brief_intro: req.body.brief_intro,
        title: req.body.title,
        last_modified: standardTime(),
        hide_content: req.body.hide_content,
        article_id: req.body.article_id
      }
    }).then(resQ => {
      consoleOutput("SQL",resQ)
      if (resQ.affectedRows === 1) {
        res.send(resBody(true,"SUCC"))
      } else {
        resBody(false,"ESQL")
      }
    }).catch(err => {
      consoleOutput("SQL",err)
      resBody(false,"ESQL")
    })
  }).catch(err => {
    consoleOutput("FS",err)
    res.send(resBody(false,"EIOERR"))
  })

})

module.exports = router
