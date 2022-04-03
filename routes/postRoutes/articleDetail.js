const express = require('express')
const router = express.Router()
const query = require('../../utils/queryInterfaces')
const resBody = require('../../utils/responseTemplate')
const {getMarkdown} = require("../../utils/mdFileHandler");
const consoleOutput = require("../../utils/consoleOutput");

router.use((req, res) => {
  query({
    name: 'articleDetail',
    params: {
      article_id: req.body.article_id
    }
  }).then(resDetail => {
    if (resDetail.length === 0) {
      res.send(resBody(false, "ENOMATCH"))
    } else {
      getMarkdown(resDetail[0].post_time, resDetail[0].author, resDetail[0].title).then(resD => {
        res.send(resBody(true, "SUCC", resDetail[0], {name: "detail",value: resD}))
      }).catch(err => {
        consoleOutput("FS",err)
        res.send(resBody(false, "EIOERR"))
      })
    }
  }).catch(err => {
    consoleOutput("SQL",err)
    res.send(resBody(false, "ESQL", null, null, err.message))
  })
})
module.exports = router
