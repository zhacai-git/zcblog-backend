const express = require('express')
const router = express.Router()
const query = require('../../utils/queryInterfaces')
const consoleOutput = require('../../utils/consoleOutput')

router.use((req, res) => {
  query({
    name: 'articleList',
    params: {
      current: (req.body.current - 1) * req.body.pageSize, // current修正
      target: req.body.pageSize
    }
  }).then(resList => {
    query({
      name: 'articleCount'
    }).then(resCount => {
      res.send({
        "success": true,
        "data": resList,
        "postCount": resCount[0].postNums
      })
    }).catch(err => {
      consoleOutput("SQL",err)
      res.status(500).send({
        "success": false,
        "message": "查询错误，请确认查询参数是否正确！"
      })
    })
  }).catch(err => {
    consoleOutput("SQL",err)
    res.status(500).send({
      "success": false,
      "message": "查询错误，请确认查询参数是否正确！"
    })
  })

})

module.exports = router;
