const resBody = require('./responseTemplate')
const store = require('./store')

function errorHandler(err, req, res, next) {
  // console.log(err, err.name);
  // token解析的错误
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(resBody(false,"EAUTH",null,null,"Token验证错误，请重新登录！"))
    store.commit('tokenFailStatus',true)
    next()
    return
  }
}

module.exports = errorHandler
