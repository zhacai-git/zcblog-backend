const db = require('./mysqlConn')
const SQLTemplates = require('../config/SQLTemplate') // SQL模板文件

const queryIndexIdentifier = name => { // 可以根据传入name匹配SQLTemplates中name对应的statement和其他内容
  return SQLTemplates.findIndex(item => {
    return item.name === name
  })
}

/**
 * @function 查询拼接器,使用Promise封装,注意调用规范
 * @description 注意在.then接收中不要用res，以免和express的response体变量冲突出现BUG
 * @param {Object} item 对象参数，包含name,params:参数对象,具体取决于SQLTemplate中定义内容
 * @return Promise 成功回调查询结果，异常回调SQL ERR
 * @example
 *queryHandler({
    name: 'articleList',
    params: {
      current: 1,
      pageSize: 3
    }
  }).then(res => {
     // SQL查询结果
  }).catch(err => {
    // SQL查询错误原因
  })
 *
 */
const queryHandler = item => {
  return new Promise((resolve,reject) => {
    let SQLObj = SQLTemplates[queryIndexIdentifier(item.name)]
    if (!SQLObj) reject("Template name not found!")
    if (SQLObj.needParams) {
      let paramsArgObj = item.params // 传入的params对象，待检测
      let paramsArg = Object.keys(paramsArgObj) // 获取传入Arg keys
      let paramsTemplate = Object.keys(SQLObj.params) // 检查模板params keys
      if (paramsTemplate.length !== paramsArg.length) {
        // console.log("[ECRITIC] SQL语句参数数量错误!")
        reject("SQL params mismatch!")
      }
      for (let i = 0; i < paramsTemplate.length; i++) {
        if (typeof paramsArgObj[paramsArg[i]] !== SQLObj.params[paramsTemplate[i]]) { // 根据给出的Template中的类型来进行类型检测
          // console.log("[ECRITIC] SQL语句参数类型检查不通过!")
          reject("SQL params type check failed!")
        }
      }
      // 到这里应该就是正确的参数了，不然就出大问题了，可以开始拼接执行了，采用node-mysql的查询参数占位符方法
      let paramsArr = []
      for (let i = 0; i < paramsTemplate.length; i++) {
        paramsArr.push(paramsArgObj[paramsArg[i]])
      }
      db.query(SQLObj.statement,paramsArr,(err,results) => {
        if (err) reject(err)
        resolve(results)
      })
    } else {
      db.query(SQLObj.statement,(err,results) => {
        if (err) reject(err)
        resolve(results)
      })
    }
  })
}

module.exports = queryHandler
