/**
 * @function 标准化返回体模板
 * @param success {boolean} true或false，代表操作结果正确与否，必选
 * @param resData {Array|Object} 返回的Data，可以为数组或数组对象或对象，可选
 * @param codeType {String} SUCC成功，ESQL错误SQL，EAUTH权限错误，ELOGIN登录错误，EUKNOWN未知错误，必选
 * @param additionalData {Array|Object} Data之外的附加数据，可选
 * @param message {string} 返回消息，可选
 * @return {Object} 返回体对象
 */
// 可以尝试用ES6的Rest参数替代后面的resData和additionalData，注意，Rest参数暂时没有方法写注释
const responseGenerator = (success,codeType,resData,additionalData,message) => {
  let code = codeSelector(codeType)
  let body = {
    success,
    code
  }
  if (resData) body['data'] = resData
  if (message) body['message'] = message
  if (additionalData){
    if (Array.isArray(additionalData)) { // 传入的是对象数组
      additionalData.forEach(item => {
        body[item.name] = item.value
      })
    } else { // 传入的是单对象
      body[additionalData.name] = additionalData.value
    }
  }
  return body
}

const codeSelector = type => {
  switch (type) {
    case 'SUCC':
      return 1000
    case "EAUTH":
      return 1001
    case "ELOGIN":
      return 1002
    case "ESQL":
      return 1003
    case "ENOMATCH":
      return 1004
    case "EJSONERR":
      return 1005
    case "EIOERR":
      return 1006
    case "EUKNOWN":
      return 9999
  }
}


module.exports = responseGenerator
