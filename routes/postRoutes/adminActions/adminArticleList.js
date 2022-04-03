const express = require('express')
const router = express.Router()
const query = require('../../../utils/queryInterfaces')
const resBody = require('../../../utils/responseTemplate')
const consoleOutput = require("../../../utils/consoleOutput");

router.use((req,res) => {
  query({
    name: 'adminArticleList'
  }).then(resList => {
    consoleOutput("SQL",resList)
    res.send(resBody(true,"SUCC",resList))
  }).catch(err => {
    consoleOutput("SQL",err)
    res.send(resBody(false,"ESQL",null,null,err.message))
  })
})

module.exports = router
