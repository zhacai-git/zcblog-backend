const express = require('express')
const router = express.Router()
const query = require('../../../utils/queryInterfaces')
const resBody = require('../../../utils/responseTemplate')
const store = require('../../../utils/store')
const consoleOutput = require("../../../utils/consoleOutput");

router.use((req,res) => {
  query({
    name: 'adminViews'
  }).then(resCount => {
    consoleOutput("SQL",resCount)
    res.send(resBody(true,"SUCC",resCount[0]))
  }).catch(err => {
    consoleOutput("SQL",err)
    res.send(resBody(false,"ESQL"))
  })
})

module.exports = router
