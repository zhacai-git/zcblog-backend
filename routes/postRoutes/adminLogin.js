const express = require('express')
const router = express.Router()
const query = require('../../utils/queryInterfaces')
const jwt = require('jsonwebtoken')
const store = require('../../utils/store')

router.use((req, res) => {
  if (verify(req.body.username,req.body.password)) {
    let payLoad = req.body
    const token = jwt.sign({payLoad},store.state.PRIVATE_KEY,{expiresIn: store.state.EXPIRES_TIME})
    res.send({
      "success": true,
      "message": '欢迎您,' + req.body.username,
      token:"Bearer " + token
    })
  } else {
    res.send({
      "success": false,
      "message": '用户名密码验证不通过，请重试！'
    })
  }
})


/**
 * 验证管理员用户名密码
 * @param username 用户名
 * @param password 密码
 * @return {boolean} true通过，false异常或错误
 */
const verify = (username, password) => {
  return query({
    name: 'adminVerify',
    params: {
      username,
      password
    }
  }).then(res => {
    if (res.length) return true
    else return false
  }).catch(err => {
    return false
  })
}


module.exports = router
